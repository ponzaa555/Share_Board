"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "@/components/confirm-modal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

// import just prop not import the component
interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
}

export const Actions = ({ children, side, sideOffset, id, title }: ActionsProps) => {
    const {onOpen} = useRenameModal()
    const { mutate, isLoading } = useApiMutation(api.board.remove);
    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`
        ).then(() => toast.success("Link copied"))
            .catch(() => toast.error("Failed to copy link"))
    }
    const onDelete = () => {
        mutate({ id })
            .then(() => toast.success("Board deleted"))
            .catch(() => toast.error("Failed to delete board"))
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side={side}
                sideOffset={sideOffset}
                // prevent redirect to board when click on dropdown menu
                onClick={(e) => e.stopPropagation()}
                className=" w-60">
                <DropdownMenuItem
                    className=" cursor-pointer p-3"
                    onClick={onCopyLink}>
                    <Link2 className=" h-4 w-4 mr-2" />
                    Copy board link
                </DropdownMenuItem>
                <DropdownMenuItem
                    className=" cursor-pointer p-3"
                    onClick={() => onOpen(id,title)}> 
                    <Pencil  className=" h-4 w-4 mr-2" />
                    Rename board
                </DropdownMenuItem>
                <ConfirmModal
                    onConfirm={onDelete}
                    heading="Delete boardฦ"
                    description="Are you sure you want to delete this board? This action cannot be undone."
                    disabled={isLoading}
                >
                    {/* if use DropdownMenuItem , it will trigger the confirm modal just a while and disappear */}
                    <Button
                        variant="ghost"
                        // if use DropdownMenuItem , it will trigger the confirm modal just a while and disappear
                        // so we use Button instead
                        className=" cursor-pointer p-3 text-sm w-full  justify-start font-normal">
                        <Trash2 className=" h-4 w-4 mr-2" />
                        Delete
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}