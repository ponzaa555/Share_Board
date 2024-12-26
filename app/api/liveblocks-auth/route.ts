import { api } from "@/convex/_generated/api";
import { auth , currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { NextRequest, NextResponse } from "next/server";



const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY as string
})

export async function POST(request:NextRequest) {
    console.log("============== app/api/liveblock-auth ==========")

    const authorization = await auth()
    const user = await currentUser()
    
    if( !authorization || !user){
        return new NextResponse("Unauthorize",{status:403})
    }

    const {room} =await request.json()
    //GET Boards
    const board = await convex.query(api.board.get , {id : room})


    if(board?.orgId !== authorization.orgId){
        return new  NextResponse("Unauthorize",{status:403})
    }

    const  userInfo = {
        name : user.firstName || "Anonymous",
        picture : user.imageUrl,
    };

    const session = liveblocks.prepareSession(
        user.id,
        {userInfo : userInfo}
    )

    if(room){
        session.allow(room ,session.FULL_ACCESS);
    }

    const sessionAuthor = await session.authorize()

    const {status , body} = sessionAuthor

    return new NextResponse(body , {status:status})


} 