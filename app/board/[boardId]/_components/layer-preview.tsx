"use client"

import { useStorage } from "@liveblocks/react";
import React from "react";
import { memo } from "react";
import { LayerType } from "@/types/canvas";
import { Rectangle } from "./rectangle";
import { Ellipse } from "./ellipse";
import { Text } from "./text";
import { Note } from "./note";

interface LayerPreviewProps {
    id:string;
    onLayerPointerDown : (e : React.PointerEvent , layerId : string) => void;
    selectionColor? : string 
};

export const LayerPreview = memo(({id , onLayerPointerDown, selectionColor}:LayerPreviewProps) =>{
    const layer = useStorage((root) => root.layers.get(id));

    if(!layer) return null;
    switch(layer.type){
        case LayerType.Note:
            return(
                <Note
                id={id}
                layer={layer}
                onLayerPointerDown={onLayerPointerDown}
                selectionColor={selectionColor}/>
            )
        case LayerType.Text:
            return(
                <Text
                id={id}
                layer={layer}
                onLayerPointerDown={onLayerPointerDown}
                selectionColor={selectionColor}/>
            )
        case LayerType.Ellipse:
            return(
                <Ellipse
                    id={id}
                    layer = {layer}
                    onLayerPointerDown = {onLayerPointerDown}
                    selectionColor = {selectionColor}/>
            )
        case LayerType.Rectangle :
            return (
                <Rectangle
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}/>
            )
        default:
            return null;
    }
})


LayerPreview.displayName = "LayerPreview"