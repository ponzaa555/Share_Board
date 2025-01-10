"use client"

import { useOthers, useSelf } from "@liveblocks/react"
import { UserAvatar } from "./user-avatar"
import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOW_USER = 2;

export const Participant = () => {
    const users = useOthers()
    const currentUser = useSelf()
    const hasMoreUser = users.length > MAX_SHOW_USER;
    
    return(
        <div className=" absolute top-2 right-2 bg-white rounded-md px-3 h-12 flex items-center shadow-md">
            <div className=" flex gap-x-2">
                {users.slice(0,MAX_SHOW_USER).map(({connectionId ,info}) => {
                    return(
                        <UserAvatar
                            key={connectionId}
                            src={info.picture}
                            name={info.name}
                            fallback={info?.name?.[0] || "T"}
                            borderColor={connectionIdToColor(connectionId)}
                        />
                    
                    )
                })
            }
            {/* Me */}
            { currentUser && (
                <UserAvatar
                    src={currentUser.info.picture}
                    name={`${currentUser.info?.name} (You)`}
                    fallback={currentUser.info?.name?.[0] }
                    borderColor={connectionIdToColor(currentUser.connectionId)}
                    />
            )}
            {/* More User */}
            {hasMoreUser && (
                <UserAvatar
                    name={`${users.length - MAX_SHOW_USER} more`}
                    fallback={`+${users.length - MAX_SHOW_USER}`}
                />
            )}
            </div>
        </div>
    )
} 
export const ParticipantSkeleton =() =>{
    return(
        <div className=" absolute top-2 right-2 bg-white rounded-md px-3 h-12 flex items-center shadow-md w-[100px]">
        </div>
    )
}