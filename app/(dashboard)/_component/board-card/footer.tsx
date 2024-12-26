import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

interface FooterProps {
    isFavorite: boolean,
    title: string,
    authorId: string,
    createAtLabel: string,
    onClick: () => void,
    disabled: boolean,
    authorLable: string
}

export const Footer = ({isFavorite, title, authorId, createAtLabel, onClick, disabled, authorLable}: FooterProps) => {
    const handleClick = (
        event : React.MouseEvent<HTMLButtonElement,MouseEvent>
    ) =>{
        event.stopPropagation();
        event.preventDefault();
        
        onClick();
    };
    return(
        <div className=" relative bg-white p-3">
            {/* w-max-[calc(100%-20px) 20 px is favorite icon */}
            <p className=" text-[13px] truncate w-max-[calc(100%-20px)]"> {title}</p>
            <p className=" opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
                {authorLable} , {createAtLabel}
            </p>
            <button
                disabled={disabled}
                onClick={handleClick}
                className= {cn(
                    "opacity-0  group-hover:opacity-100 absolute transition top-3 right-3 text-muted-foreground hover:text-blue-600",
                    disabled && " cursor-not-allowed opacity-75"
                    
                )}>
                <Star className={cn(
                    "w-4 h-4",
                    isFavorite && "text-blue-600 fill-blue-600"
                )}/>
            </button>
        </div>
    )
}