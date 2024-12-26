"use client"

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";

// setFonts
const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

export const OrgSidBar = () => {
    const searchParams = useSearchParams();
    const favorites  = searchParams.get("favorites")
    return (
        <div className=" hidden lg:flex flex-col space-y-6 w-[200px] pl-5 pt-5 
                  h-full">
            <Link href="/">
                <div className="flex items-center gap-x-2">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={60}
                        height={60} />
                    <span className={cn(
                        "font-semibold text-2xl",
                        font.className
                    )}>
                        LiveBoard
                    </span>
                </div>
            </Link>
            <OrganizationSwitcher
                hidePersonal
                appearance={{
                    elements: {
                        rootBox:{
                            display:"flex",
                            justifyItems:"center",
                            alignItems:"center",
                            width: "100%"
                        },
                        organizationSwitcherTrigger:{
                            padding:"6px",
                            width:"100%",
                            borderRadius:"8px",
                            border:"1px solid #E5E7EB",
                            justifyContent:"space-between",
                            backgroundColor:"white"
                        },
                        organizationPreviewAvatarBox: "h-8 w-8", // Makes the avatar bigger
                        organizationPreviewAvatarImage: "h-8 w-8", // Makes the image bigger
                        organizationSwitcherTriggerIcon: "h-5 w-5" // Makes the dropdown icon bigger
                    }
                }} />
                <div className=" space-y-1 w-fullx">
                    <Button
                        asChild
                        size="lg"
                        variant={favorites ? "ghost" : "default"}
                        className=" font-normal justify-start px-2 w-full">
                        <Link href="/">
                            <LayoutDashboard className=" h-4 w-4 mr-2"/>
                            Team boards
                        </Link>
                    </Button>
                    <Button
                        asChild
                        size="lg"
                        variant= {favorites ? "default" : "ghost"}
                        className=" font-normal justify-start px-2 w-full">
                        <Link href={{
                            pathname:"/",
                            query:{ favorites : true}
                        }}>
                            <Star  className=" h-4 w-4 mr-2"/>
                            Favorite boards
                        </Link>
                    </Button>
                </div>
        </div> 
    );
};