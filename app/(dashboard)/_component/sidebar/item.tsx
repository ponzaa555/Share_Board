"use client"


import {
    OrganizationList,
    useOrganization,
    useOrganizationList
} from "@clerk/nextjs"
import {cn} from "@/lib/utils"
import Image from "next/image";
import { Hint } from "@/components/hint";
interface ItemProps{
    id: string;
    name: string;
    imageUrl: string;
}

export const Item = ({
    id,
    name,
    imageUrl
}: ItemProps) =>{
    const {organization} = useOrganization();
    const {setActive} = useOrganizationList();
    const isActive = organization?.id === id;

    const handleClick = () =>{
        if(!setActive) return ;
        setActive({organization: id});
    };
    return(
        <div className=" aspect-square relative">
            <Hint
            label={name }
            side="right"
            align="start"
            sideOffset={18}>
            <Image
            src={imageUrl}
            onClick={handleClick}
            alt={name}
            fill
            className={cn(
                "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition-all duration-300",
                isActive && "opacity-100"
            )}/>
            </Hint>
        </div>
    )
}


