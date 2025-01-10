"use client"

import { memo } from "react"

import { useOthersConnectionIds } from "@liveblocks/react";
import { Cursor } from "./cursor";

const Cursors = () =>{
    const ids = useOthersConnectionIds()
    return(
        <>
            {
                ids.map((connectionIds) => {
                return(
                    <Cursor
                        key={connectionIds}
                        connectionId={connectionIds}
                    />
                )})
            }
        </>
    )
}

export const CursorsPresence = memo(() => {
    return(
        <>
            <Cursors/>
        </>
    );
}); 

CursorsPresence.displayName  = "CursorsPresence";