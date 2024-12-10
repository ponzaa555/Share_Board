import Image from "next/image";

export const Loading = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <Image src="/logo.png" alt="Logo" width={100} height={100} 
            className="animate-pulse duration-700"/>
        </div>
    )
}  