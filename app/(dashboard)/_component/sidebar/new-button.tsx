"use client"

import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Import VisuallyHidden
import { DialogTitle } from "@/components/ui/dialog"; // Import DialogTitle
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog"
import { Hint } from "@/components/hint";

export const NewButton = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <div className=" aspect-square">
                    <Hint
                        label="Create new organization "
                        side="right"
                        align="start"
                        sideOffset={18}>
                    <div className=" bg-white/25 h-full w-full rounded-md flex items-center justify-center cursor-pointer
                    hover:opacity-75 transition-all duration-300">
                        <Plus className=" text-white" />
                    </div>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent className=" p-0 bg-transparent border-none max-w-[500px]">
                <VisuallyHidden>
                    <DialogTitle>Organization Creation</DialogTitle>
                </VisuallyHidden>
                <CreateOrganization />
            </DialogContent>
        </Dialog>
    );
};