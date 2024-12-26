import Image from "next/image";

export const EmptyFavorite = () => {
    return (
        <div className=" w-full h-full flex flex-col justify-center items-center">
            <Image src= "/empty-favorite.jpeg" alt="Empty Favorite" width={300} height={300}/>
            <h2 className=" text-2xl font-bold mt-6">No favorite boards</h2>
            <p className=" text-muted-foreground text-sm mt-2">Add favorite boards</p>
        </div>
    )
}