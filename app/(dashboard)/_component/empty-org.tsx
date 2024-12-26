import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CreateOrganization } from "@clerk/nextjs"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import{
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger   
}from "@/components/ui/dialog"


export const EmptyOrg = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image src="/element.png"
                alt="Empty Organization"
                width={400}
                height={400}/>
            <h2 className=" text-2xl font-bold mt-6">Welcome to Board</h2>
            <p className=" text-muted-foreground mt-2 text-sm">Create an Organization to get started</p>
            <div className=" mt-6">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg">    
                            Create Organization
                        </Button>
                    </DialogTrigger>
                    <DialogContent className=" p-0 bg-transparent border-none max-w-[480px]">
                        <VisuallyHidden>
                            <DialogTitle>Create an Organization</DialogTitle>
                        </VisuallyHidden>
                        <CreateOrganization/>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}