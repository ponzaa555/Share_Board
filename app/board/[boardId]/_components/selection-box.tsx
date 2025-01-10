// Selection Box
/*
Explain
        แค่เราเห็นว่าเรา select component ตัวไหนอยู่
*/


"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { LayerType, Side, XYWH } from "@/types/canvas";
import { useSelf, useStorage } from "@liveblocks/react";
import { memo } from "react";


const HANDLE_WIDTH = 8;

interface SelectionBoxProps{
    onResizeHandlePointerDown:(coner:Side , initialBounds: XYWH) => void;

}

export const SelectionBox = memo(({onResizeHandlePointerDown}:SelectionBoxProps) => {
    const soleLayerId = useSelf((me) => 
        me.presence.selection.length === 1 ? me.presence.selection[0] : null

    )

    const isShowingHandles = useStorage((root) => 
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
    )

    const bound =  useSelectionBounds();
    if(!bound) return null

    return(
        <>
            <rect
                className=" fill-transparent stroke-blue-500 stroke-1 pointer-events-none "
                style={{
                    transform: `translate(${bound.x}px , ${bound.y}px)`,
                }}
                x={0}
                y={0}
                width={bound.width}
                height={bound.height}/>
                {isShowingHandles && (
                    <>
                        {/* อันนี้ cursor resize หนึ่ง conner ซ้ายบน */}
                        <rect
                            className=" fill-white stroke-blue-500 stroke-1"
                            x={0}
                            y={0}
                            style={{
                                cursor:"nwse-resize",
                                width: `${HANDLE_WIDTH}px`,
                                height: `${HANDLE_WIDTH}px`,
                                transform:`translate(${bound.x - HANDLE_WIDTH / 2}px , ${bound.y - HANDLE_WIDTH / 2}px)`
                            }}
                            onPointerDown={(e) => {
                                e.stopPropagation();
                                //TODO : Add resize handler
                                // args คือ size เพิ่มไปทางไหน กับ เพิ่มด้วยค่าเท่าไหร่
                                onResizeHandlePointerDown(Side.Top + Side.Left , bound)
                            }}
                        />
                        {/* cursor resize กลางบน */}
                        <rect
                            className=" fill-white stroke-blue-500 stroke-1"
                            x={0}
                            y={0}
                            style={{
                                cursor:"ns-resize",
                                width: `${HANDLE_WIDTH}px`,
                                height: `${HANDLE_WIDTH}px`,
                                transform:`translate(${bound.x +  bound.width /2 - HANDLE_WIDTH/2}px , 
                                ${bound.y - HANDLE_WIDTH/2}px)`
                            }}
                            onPointerDown={(e) => {
                                e.stopPropagation();
                                //TODO : Add resize handler
                                // args คือ size เพิ่มไปทางไหน กับ เพิ่มด้วยค่าเท่าไหร่
                                onResizeHandlePointerDown(Side.Top  , bound)
                            }}
                        />
                        <rect
                            className=" fill-white stroke-blue-500 stroke-1"
                            x={0}
                            y={0}
                            style={{
                                cursor:"nesw-resize", //หัวลูกศรตอน resize
                                width: `${HANDLE_WIDTH}px`,
                                height: `${HANDLE_WIDTH}px`,
                                transform:`translate(${bound.x - HANDLE_WIDTH/2 + bound.width}px ,
                                    ${bound.y - HANDLE_WIDTH/2}px)`
                            }}
                            onPointerDown={(e) => {
                                e.stopPropagation();
                                //TODO : Add resize handler
                                // args คือ size เพิ่มไปทางไหน กับ เพิ่มด้วยค่าเท่าไหร่
                                onResizeHandlePointerDown(Side.Top + Side.Right , bound)
                            }}
                        />
                        <rect
                            className=" fill-white stroke-blue-500 stroke-1"
                            x={0}
                            y={0}
                            style={{
                                cursor:"ew-resize", //หัวลูกศรตอน resize
                                width: `${HANDLE_WIDTH}px`,
                                height: `${HANDLE_WIDTH}px`,
                                transform:`translate(${bound.x - HANDLE_WIDTH/2 + bound.width}px ,
                                    ${bound.y - HANDLE_WIDTH/2 + bound.height/2}px)`
                            }}
                            onPointerDown={(e) => {
                                e.stopPropagation();
                                //TODO : Add resize handler
                                // args คือ size เพิ่มไปทางไหน กับ เพิ่มด้วยค่าเท่าไหร่
                                onResizeHandlePointerDown( Side.Right , bound)
                            }}
                        />
                        <rect
                            className=" fill-white stroke-blue-500 stroke-1"
                            x={0}
                            y={0}
                            style={{
                                cursor:"nwse-resize", //หัวลูกศรตอน resize
                                width: `${HANDLE_WIDTH}px`,
                                height: `${HANDLE_WIDTH}px`,
                                transform:`translate(${bound.x - HANDLE_WIDTH/2 + bound.width}px ,
                                    ${bound.y - HANDLE_WIDTH/2 + bound.height}px)`
                            }}
                            onPointerDown={(e) => {
                                e.stopPropagation();
                                //TODO : Add resize handler
                                onResizeHandlePointerDown( Side.Right + Side.Bottom , bound)
                            }}
                        />
                        <rect
                            className=" fill-white stroke-blue-500 stroke-1"
                            x={0}
                            y={0}
                            style={{
                                cursor:"ns-resize", //หัวลูกศรตอน resize
                                width: `${HANDLE_WIDTH}px`,
                                height: `${HANDLE_WIDTH}px`,
                                transform:`translate(${bound.x - HANDLE_WIDTH/2 + bound.width/2}px ,
                                    ${bound.y - HANDLE_WIDTH/2 + bound.height}px)`
                            }}
                            onPointerDown={(e) => {
                                e.stopPropagation();
                                //TODO : Add resize handler
                                onResizeHandlePointerDown( Side.Bottom , bound)
                            }}
                        />
                        <rect
                            className=" fill-white stroke-blue-500 stroke-1"
                            x={0}
                            y={0}
                            style={{
                                cursor:"nesw-resize", //หัวลูกศรตอน resize
                                width: `${HANDLE_WIDTH}px`,
                                height: `${HANDLE_WIDTH}px`,
                                transform:`translate(${bound.x - HANDLE_WIDTH/2 }px ,
                                    ${bound.y - HANDLE_WIDTH/2 + bound.height}px)`
                            }}
                            onPointerDown={(e) => {
                                e.stopPropagation();
                                //TODO : Add resize handler
                                onResizeHandlePointerDown( Side.Bottom + Side.Left , bound)
                            }}
                        />
                        <rect
                            className=" fill-white stroke-blue-500 stroke-1"
                            x={0}
                            y={0}
                            style={{
                                cursor:"ew-resize", //หัวลูกศรตอน resize
                                width: `${HANDLE_WIDTH}px`,
                                height: `${HANDLE_WIDTH}px`,
                                transform:`translate(${bound.x - HANDLE_WIDTH/2 }px ,
                                    ${bound.y - HANDLE_WIDTH/2 + bound.height/2}px)`
                            }}
                            onPointerDown={(e) => {
                                e.stopPropagation();
                                //TODO : Add resize handler
                                onResizeHandlePointerDown(  Side.Left , bound)
                            }}
                        />
                    </>
                )}
        </>
    )
})

SelectionBox.displayName = "SelectionBox";