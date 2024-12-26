
import {  Loader } from "lucide-react";
import { Info, InfoSkeleton } from "./info";
import {  ParticipantSkeleton } from "./participant";
import { Toolbar, ToolbarSkeleton } from "./toobar";
export const Loading = () => {
    return(
        <main className="flex h-full w-full bg-neutral-100 touch-none justify-center items-center">
            <Loader className=" h-6 w-6 text-muted-foreground animate-spin"/>
            <InfoSkeleton/>
            <ParticipantSkeleton/>
            <ToolbarSkeleton/>
        </main>
    )
}