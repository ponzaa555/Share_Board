"use client"

import { api } from "@/convex/_generated/api"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { cn } from "@/lib/utils"
import { error } from "console"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast  } from "sonner"

interface NewBoardButtonProps {
    orgId: string,
    disabled?: boolean
}

export const NewBoardButton = ({orgId, disabled}: NewBoardButtonProps) => {
    const route = useRouter();
    const {mutate , isLoading} = useApiMutation(api.board.create)
    const handleOnClick = () => {
        mutate({
            orgId,
            title: "Untitled"
        }).then((id) => {
            toast.success(`Board created ${id}`)
            route.push(`/board/${id}`)
            // TODO: redirect to the new board
        }).catch((error) => {
            toast.error("Failed to create board") 
        })
    } 
    return(
        <button 
            disabled={isLoading || disabled} 
            onClick={handleOnClick}
            className = {cn(
                "col-span-1 aspect-[100/127] rounded-lg bg-blue-600 hover:bg-blue-800 ",
                "flex items-center justify-center py-6 flex-col",
                (disabled || isLoading) && " opacity-75 hover:bg-blue-600 hover:cursor-not-allowed "
            )}>
                <div/>
                <Plus className=" w-12 h-12 text-white start-1"/>
                <p className=" text-white text-sm font-light">New Board</p>
        </button>
    )
}