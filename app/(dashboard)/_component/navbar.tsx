"use client"

import { OrganizationSwitcher, UserButton , useOrganization} from "@clerk/nextjs";
import { SearchInput } from "./search.input";
import { InviteButton } from "./invite-button";

export const Navbar = () => {
    const {organization} = useOrganization();
    return (
        <div className="flex items-center gap-x-4 p-5">
            {/* lg:flex because we want to hide it on small screens and show it on large screens */}
            <div className=" hidden lg:flex lg:flex-1 ">
                {/* Todo add search */}
                <SearchInput />
            </div>
            <div className=" block lg:hidden flex-1">
                <OrganizationSwitcher
                    hidePersonal
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyItems: "center",
                                alignItems: "center",
                                width: "100%",
                                maxWidth:"376px"
                            },
                            organizationSwitcherTrigger: {
                                padding: "6px",
                                width: "100%",
                                borderRadius: "8px",
                                border: "1px solid #E5E7EB",
                                justifyContent: "space-between",
                                backgroundColor: "white"
                            },
                            organizationPreviewAvatarBox: "h-8 w-8", // Makes the avatar bigger
                            organizationPreviewAvatarImage: "h-8 w-8", // Makes the image bigger
                            organizationSwitcherTriggerIcon: "h-5 w-5" // Makes the dropdown icon bigger
                        }
                    }} />
            </div>
            {organization ? <InviteButton /> : null}
            <UserButton />
        </div>
    );
};