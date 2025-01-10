"use client";

import { ReactNode } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense"
import { LiveMap , LiveObject ,LiveList } from "@liveblocks/client";
import { Layer } from "@/types/canvas";


interface RoomProps {
    children: ReactNode;
    roomId: string;
    fallback:ReactNode;
}

export const Room = ({ children, roomId,fallback }: RoomProps) => {
    const publicApiKey =  process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY as string;
    console.log("publicApiKey",publicApiKey);  
    return (
        <LiveblocksProvider authEndpoint="/api/liveblocks-auth" throttle={16} >
            <RoomProvider id={roomId} initialPresence={{
                cursor:null,
                selection:[]
            }} 
            initialStorage={{
                layers: new LiveMap<string , LiveObject<Layer>>(),
                layerIds: new LiveList([])
            }}>
                <ClientSideSuspense fallback={fallback }>
                    {() => children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    )

}