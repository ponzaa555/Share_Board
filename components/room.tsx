"use client";

import { ReactNode } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense"

interface RoomProps {
    children: ReactNode;
    roomId: string;
    fallback:ReactNode;
}

export const Room = ({ children, roomId,fallback }: RoomProps) => {
    const publicApiKey =  process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY as string;
    console.log("publicApiKey",publicApiKey);  
    return (
        <LiveblocksProvider authEndpoint="/api/liveblocks-auth" >
            <RoomProvider id={roomId} initialPresence={{}}>
                <ClientSideSuspense fallback={fallback }>
                    {() => children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    )

}