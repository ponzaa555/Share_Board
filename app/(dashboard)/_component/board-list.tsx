"use client"

import { useSearchParams } from "next/navigation"
import { EmptySearch } from "./empty-search"
import { EmptyFavorite } from "./empty-favorite"
import { EmptyBoard } from "./empty-board"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { BoardCard } from "./board-card"
import { NewBoardButton } from "./new-board-button"
import React, { useEffect } from "react"


  
interface BoardListProps {
    orgId: string,
    query: {
        search?: string,
        favorites?: string
    }
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
    const {search  ,favorites } =  React.use(query);
    const Data = useQuery(api.boards.get, { 
        orgId , search:search , favorite: favorites }); //API call
    // if does't find data will return null
    // Convert to object if neede



    if (Data === undefined) {
        return (
            <div>
                <h2 className=" text-3xl">
                    {favorites ? "Favorite Boards" : "Team Boards"}
                </h2>
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5  
            2xl:grid-cols-6  gap-4 mt-8 pb-10">
                    <NewBoardButton disabled orgId={orgId}/>
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />  
                </div>
            </div>
        )
    }


    // mean user search for something not found 
    if (Data.length === 0 && search) {
        return (
            <EmptySearch />
        )
    }
    if (!Data.length && favorites) {
        return (
            <EmptyFavorite />
        )
    }
    // Data =[] true
    if (!Data.length) {
        return (
            <EmptyBoard />
        )
    }
    return (
        <div>
            <h2 className=" text-3xl">
                {favorites ? "Favorite Boards" : "Team Boards"}
            </h2>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5  
            2xl:grid-cols-6  gap-4 mt-8 pb-10">
                <NewBoardButton orgId={orgId} />
                {Data.map((board) => {
                    return (
                        <BoardCard
                            key={board._id}
                            id={board._id}
                            title={board.title}
                            imageUrl={board.imageUrl}
                            authorId={board.imageUrl}
                            authorName={board.authorName}
                            createAt={board._creationTime}
                            orgId={board.orgId}
                            isFavorite={board.isFavorite} />
                    )
                })}
            </div>
        </div>
    )

}

