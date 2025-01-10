"use client";

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
    onChange: (color: Color) => void;
};

export const ColorPicker = ({
    onChange,
}: ColorPickerProps) => {
    return (
        <div className=" flex flex-wrap gap-2 items-center  max-w-[164px] pl-2 mr-2 border-r border-neutral-200">
            <ColorButton color={{ r: 0, g: 0, b: 0, }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 249, b: 187, }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 200, b: 200 }} onClick={onChange} />
            <ColorButton color={{ r: 200, g: 255, b: 200 }} onClick={onChange} />
            <ColorButton color={{ r: 100, g: 250, b: 255 }} onClick={onChange} /> 
            <ColorButton color={{ r: 200, g: 20, b: 0 }} onClick={onChange} /> 
            <ColorButton color={{ r: 255, g: 255, b: 255 }} onClick={onChange} /> 
            <ColorButton color={{ r: 0, g: 255, b: 0 }} onClick={onChange} /> 
        </div>
    )
}

interface ColorButtonProps {
    onClick: (color: Color) => void;
    color: Color;
}

const ColorButton = ({
    onClick,
    color
}: ColorButtonProps) => {
    return (
        <button
            className=" w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
            onClick={() => onClick(color)}
        >
            <div
                className=" h-8 w-8 rounded-md border border-neutral-300"
                style={{
                    background: colorToCss(color)
                }}
            />
        </button>
    )
}