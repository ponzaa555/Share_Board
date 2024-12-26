"use client"

// icon : Icon, ต้องเป็น capital ตัวแรกถึงจะได้

import { LucideIcon } from "lucide-react"

import { Hint } from "@/components/hint"
import { Button } from "@/components/ui/button"

interface ToolButtonProps{
    label:string;
    icon : LucideIcon;
    onClick : () => void;
    isActive? : boolean;
    isDisable? : boolean;
}

export const ToolButton = ({
    label,
    icon : Icon,
    onClick,
    isActive,
    isDisable
}:ToolButtonProps) =>{
    return(
        <Hint label={label} side="right" sideOffset={14}>
            <Button
                disabled = {isDisable}
                onClick={onClick}
                size="icon"
                variant={isActive ? "boardActive" : "board"}>
                <Icon />
            </Button>
        </Hint>
    )
}