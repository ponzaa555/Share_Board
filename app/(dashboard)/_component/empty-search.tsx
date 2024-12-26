


import Image from "next/image";

export const EmptySearch = () => {
    return (
        <div className=" w-full h-full flex flex-col justify-center items-center">
            <Image 
            src= "/empty-search.jpeg" alt="Empty Search" width={300} height={300}
            className=" bg-transparent"/>
            <h2 className=" text-2xl font-bold mt-6">No results founds!</h2>
            <p className=" text-muted-foreground text-sm mt-2">Try searching for something else</p>
        </div>
    )
}