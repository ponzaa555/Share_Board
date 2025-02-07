import { Kalam } from "next/font/google";
import  ContentEditable,{ContentEditableEvent} from "react-contenteditable"

import { cn , colorToCss } from "@/lib/utils";
import { TextLayer } from "@/types/canvas";
import { useMutation } from "@liveblocks/react";
import React from "react";


const font = Kalam({
    subsets:["latin"],
    weight:["400"],
})

interface TextProsp {
    id: string;
    layer : TextLayer;
    onLayerPointerDown: (e:React.PointerEvent , id :string) => void;
    selectionColor?: string;
}

const calculateFontSize =  (width : number , height : number) =>{
    const  maxFontSize = 96;
    const scaleFactor = 0.5;
    const fontSizeBasedOnHeight = height * scaleFactor ;
    const fontSizeBasedOnWidth = width * scaleFactor;

    return Math.min(fontSizeBasedOnHeight , fontSizeBasedOnWidth , maxFontSize)
}


export const Text = ({
    id,
    layer,
    onLayerPointerDown,
    selectionColor
}:TextProsp) => {
    const {x , y , width , height , fill , value } = layer

    const updateValue = useMutation((
        {storage},
        newValue : string
    ) => {
        const liveLayer = storage.get("layers");
    
        liveLayer.get(id)?.set("value",newValue)
    },[])
    
    const handlerContentChange = (e:ContentEditableEvent) => {
        updateValue(e.target.value)
    }
    return(
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            onPointerDown={(e) => onLayerPointerDown(e,id)}
            style={{
                outline : selectionColor ? `1px solid ${selectionColor}` : "none"
            }}>
            <ContentEditable
                html={value || "Text"}
                onChange={handlerContentChange}
                className={cn(
                    "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
                    font.className
                )}
                style={{
                    fontSize: calculateFontSize(width , height),
                    color: fill ? colorToCss(fill) : "#000"
                }}/>
        </foreignObject>
    )
}