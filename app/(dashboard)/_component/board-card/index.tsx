"use client"

import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"
import Link from "next/link"
import {formatDistanceToNow} from "date-fns"
import Image from "next/image"
import { Overlay } from "./overlay"
import { useAuth } from "@clerk/nextjs"
import { Footer } from "./footer"
import { Skeleton } from "@/components/ui/skeleton"
import { MoreHorizontal } from "lucide-react"
import { Actions } from "@/components/action"
import { toast } from "sonner"
interface BoardCardProps {
    id: string
    title: string
    imageUrl: string
    authorId: string
    authorName: string
    createAt: number
    orgId: string
    isFavorite: boolean
}

export const BoardCard = ({id, title, imageUrl, authorId, authorName, createAt, orgId, isFavorite}: BoardCardProps) => {
    //Api part

    //Favoriteuser table
    const {mutate: onFavorite , isLoading : loadingFavorite} = useApiMutation(api.board.favorite);
    const {mutate: onUnFavorite , isLoading : loadingUnFavorite} = useApiMutation(api.board.unfavorite)

    


    // hadler Favorite
    const toggleFavorite = () =>{
        if(isFavorite){
            onUnFavorite({id})
                .catch(() => toast.error("Faield to unfavorite"))
        }else{
            onFavorite({id,orgId})
                .catch(() => toast.error("Faield to favorite"))
        }
    }

    const {userId} = useAuth();

    const authorLable  = userId === authorId ? "You" : authorName; 
    const createdAtLable = formatDistanceToNow(createAt, {addSuffix: true}); 
    return(
        <Link href={`/board/${id}`}>
            <div className=" group aspect-[100/127] border rounded-lg flex flex-col  justify-between overflow-hidden">
                <div className=" relative flex-1 bg-amber-50 ">
                    {/* Image */}
                    <Image src={imageUrl} alt={title}  fill className=" object-fit"/>
                    {/* ทำไมเป็นงี้ได้ ใน overlay มี group-hover:opacity-50 อยู่ ซึ่ง paretent มี group อยู่  
                        ทำให้ เมื่อ hover group จะทำให้ overlay มี opacity เป็น 50%*/}
                    <Overlay/>
                    <Actions id={id} title={title} side="right">
                        {/* this is childern sent to Actions component */}
                        <button className=" absolute top-1 right-1 opacity-0 group-hover:opacity-100 
                            transition-opacity duration-500 px-3 py-2 outline-none">
                            <MoreHorizontal className=" text-white opacity-75 w-4 h-4 hover:opacity-100  transition-opacity"/>
                        </button> 
                    </Actions>
                </div>
                <Footer
                    isFavorite = {isFavorite}
                    title = {title}
                    authorId = {authorId}
                    createAtLabel = {createdAtLable}
                    onClick = {toggleFavorite}
                    disabled = {loadingFavorite || loadingUnFavorite}
                    authorLable = {authorLable}/>
            </div>
        </Link>
    )
}
BoardCard.Skeleton = function BoardCardSkeleton() {
    return(
        <div className=" aspect-[100/127] rounded-lg  overflow-hidden">
             <Skeleton className=" h-full w-full"/>
        </div>
    )
}