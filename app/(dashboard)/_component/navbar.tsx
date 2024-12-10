"use client"

import { UserButton } from "@clerk/nextjs";

export const Navbar = () => {
    return (
        <div className="flex items-center gap-x-4 p-5 bg-green-500">
            {/* lg:flex because we want to hide it on small screens and show it on large screens */}
            <div className=" hidden lg:flex lg:flex-1  bg-yellow-400">
                {/* Todo add search */}
                Search
            </div>
            <UserButton/>
        </div>
    );
};