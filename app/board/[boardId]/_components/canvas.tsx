"use client"

import { useHistory, useSelf, useCanRedo, useCanUndo, useMutation, useStorage, useOthersMapped } from "@liveblocks/react"
import { Info } from "./info"
import { Participant } from "./participant"
import { Toolbar } from "./toobar"
import React, { use, useCallback, useMemo, useState } from "react"
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point, Side, XYWH } from "@/types/canvas"
import { CursorsPresence } from "./cusor-presence"
import { connectionIdToColor, findIntersectingLayersWithRectangle, pointerEventToCanvasPoint, resizeBounds } from "@/lib/utils"
import { nanoid } from "nanoid"
import { LiveObject } from "@liveblocks/client"
import { LayerPreview } from "./layer-preview"
import { SelectionBox } from "./selection-box"
import { X } from "lucide-react"
import { SelectionTools } from "./selection-tool"

interface CanvasProps {
   boardId: string
}

const MAX_LAYERS = 100;
export const Canvas = ({ boardId }: CanvasProps) => {

   const layerIds = useStorage((root) => root.layerIds);
   const [canvasState, setCanvasState] = useState<CanvasState>({
      mode: CanvasMode.None
   })
   const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
   const [lastUseColor, setLastUseColor] = useState<Color>({
      r: 255,
      g: 255,
      b: 255,
   })

   const unSelectLayer = useMutation((
      {self , setMyPresence}
   ) => {
      // select some thing
      if(self.presence.selection.length > 0){
         setMyPresence({selection:[]},{addToHistory : true});
      }
   },[])
   //RESIZE HANDLER
   const resizeSelectedLayer = useMutation((
      { storage, self },
      point: Point,
   ) => {
      if(canvasState.mode !== CanvasMode.Resizing) return null
      //Create Util resize bounds
      const bounds = resizeBounds(canvasState.initialBounds,canvasState.coner,point);
      const liveLayer = storage.get("layers");
      const layer = liveLayer.get(self.presence.selection[0]);

      if(layer){
         // Update side 
         layer.update(bounds)
      }
   }, [canvasState])

   //TRANSLATE LAYER
   const translateSelectedLayer =  useMutation((
      {storage , self},
      point:Point,
   ) =>{
      if(canvasState.mode !== CanvasMode.Translating) return;

      const offSet = {
         x: point.x - canvasState.current.x,
         y: point.y - canvasState.current.y,
      }

      const  liveLayer =  storage.get("layers");

      for(const id of self.presence.selection){
         const layer = liveLayer.get(id);

         if(layer){
            layer.update({
               x: layer.get("x") + offSet.x,
               y: layer.get("y") + offSet.y
            })
         }
      }

      setCanvasState({mode:CanvasMode.Translating , current : point})
   },[
      canvasState
   ])
   
   const startMultiSelection = useCallback((
      current:Point,
      origin: Point,
   ) => {
      // เป็นหารเช็คว่า ลากคลอย object ใช่ไหม 
      if(Math.abs(current.x - origin.x) +  Math.abs(current.y -  origin.y) > 5){ 
         console.log("ATTEMP TO SELECTION NET")
         setCanvasState({
            mode:CanvasMode.SelectionNet,
            origin,
            current,
         });
      }
   },[])

   const updateSelectionNet = useMutation((
      {storage , setMyPresence},
      current:Point,
      origin:Point,
   )  => {
      const layers = storage.get("layers").toImmutable();
      setCanvasState({
         mode:CanvasMode.SelectionNet,
         origin,
         current
      })
      //  create util what component in selectionNet area
      const ids = findIntersectingLayersWithRectangle(
         layerIds!,
         layers,
         origin,
         current
      )

      setMyPresence({selection:ids})
   },[
      layerIds
   ])
   //panning camera based on delta
   const onWhell = useCallback((e: React.WheelEvent) => {
      setCamera((camera) => ({
         x: camera.x - e.deltaX,
         y: camera.y - e.deltaY
      }))
   }, [])
   const history = useHistory();
   const canUndo = useCanUndo();
   const canRedo = useCanRedo();
   const insertLayer = useMutation((
      { storage, setMyPresence },
      layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note,
      position: Point,

   ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) return

      const liveLayersIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
         type: layerType,
         x: position.x,
         y: position.y,
         height: 100,
         width: 100,
         fill: lastUseColor
      })

      liveLayersIds.push(layerId)
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
   }, [lastUseColor])

   const info = useSelf((me) => me.info);

   const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      // Set Current cursor position
      const current = pointerEventToCanvasPoint(e, camera)

      if(canvasState.mode === CanvasMode.Pressing){
         startMultiSelection(current , canvasState.origin);
      }else if (canvasState.mode === CanvasMode.SelectionNet){
         updateSelectionNet(current , canvasState.origin);
      }
      else if (canvasState.mode === CanvasMode.Translating){
         translateSelectedLayer(current)
      }
      // Drag object
      else if (canvasState.mode === CanvasMode.Resizing) {
         resizeSelectedLayer(current)
      }

      setMyPresence({ cursor: current })
   }, [
      canvasState,
      resizeSelectedLayer,
      camera,
      translateSelectedLayer,
   ])

   const onPointerLeave = useMutation(({ setMyPresence }) => {
      setMyPresence({ cursor: null });
   }, []);


   const onPointerDown = useCallback((
      e: React.PointerEvent
   ) => {
      const point = pointerEventToCanvasPoint( e , camera)

      if(canvasState.mode ===  CanvasMode.Inserting) return;

      // TODO add Case for Drawing

      setCanvasState({origin: point , mode : CanvasMode.Pressing});
   }, [
      camera,
      canvasState.mode,
      setCanvasState
   ])


   const onPointerUp = useMutation((
      { },
      e
   ) => {
      const point = pointerEventToCanvasPoint(e, camera)


      // unselect layer
      if(canvasState.mode === CanvasMode.None ||canvasState.mode === CanvasMode.Pressing ){
         setCanvasState({
            mode:CanvasMode.None,
         })
         unSelectLayer();
         // Select current layer
      }else if (canvasState.mode === CanvasMode.Inserting) {
         insertLayer(canvasState.layerType, point);
      } else {
         setCanvasState({
            mode: CanvasMode.None
         })
      }

      history.resume();
   }, [
      camera,
      canvasState,
      history,
      insertLayer,
   ])

   // Select object in board
   const onLayerPointerDown = useMutation((
      { self, setMyPresence },
      e: React.PointerEvent,
      layerId: string,
   ) => {
      if (canvasState.mode === CanvasMode.Pencil ||
         canvasState.mode === CanvasMode.Inserting) {
         return;
      }

      history.pause();
      e.stopPropagation();

      const point = pointerEventToCanvasPoint(e, camera)

      if (!self.presence.selection.includes(layerId)) {
         // don't selected
         setMyPresence({ selection: [layerId] }, { addToHistory: true })
      }
      setCanvasState({ mode: CanvasMode.Translating, current: point })
   }, [
      setCanvasState,
      camera,
      history,
      canvasState.mode
   ])

   // tracking who select what 
   const selections = useOthersMapped((other) => other.presence.selection);

   const layerIdsToColorSelection = useMemo(() => {
      const layerIdsToColorSelection: Record<string, string> = {};

      for (const user of selections) {
         const [connectionId, selection] = user

         for (const layerId of selection) {
            layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId)
         }
      }
      return layerIdsToColorSelection;
   }, [selections])

   const onResizeHandlePointerDown = useCallback((
      coner: Side,
      initialBounds: XYWH,
   ) => {
      console.log({
         coner,
         initialBounds,
      })
      history.pause();
      setCanvasState({
         mode: CanvasMode.Resizing,
         initialBounds,
         coner,
      })
   }, [history]);

   return (
      <main className=" h-full w-full bg-neutral-100 touch-none">
         <Info boardId={boardId} />
         <Participant />
         <Toolbar
            canvasState={canvasState}
            setCanvasState={setCanvasState}
            canRedo={canRedo}
            canUndo={canUndo}
            redo={history.redo}
            undo={history.undo} />
         <SelectionTools
            camera={camera}
            setLastUsedColor = {setLastUseColor}/>
         <svg
            className="h-[100vh] w-[100vw]"
            onWheel={onWhell}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerDown={onPointerDown}
         >
            <g
               style={{
                  transform: `translate(${camera.x}px , ${camera.y}px)`
               }}>
               {layerIds?.map((layersId) =>
                  <LayerPreview
                     key={layersId}
                     id={layersId}
                     onLayerPointerDown={onLayerPointerDown}
                     selectionColor={layerIdsToColorSelection[layersId]} />
               )}
               <SelectionBox
                  onResizeHandlePointerDown={onResizeHandlePointerDown} 
                  />
               {canvasState.mode === CanvasMode.SelectionNet &&
                canvasState.current !== null 
               &&(
                  <rect
                     className=" fill-blue-500/5 stroke-blue-500 stroke-1"
                     x={Math.min(canvasState.origin.x , canvasState.current.x)}
                     y={Math.min(canvasState.origin.y , canvasState.current.y)}
                     width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                     height={Math.abs(canvasState.origin.y - canvasState.current.y)}
                  />
               )}
               <CursorsPresence />
            </g>
         </svg>
      </main>
   )
}