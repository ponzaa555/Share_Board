import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { error } from "console";
import { useRouter } from "next/navigation";
export const EmptyBoard = () => {
    const route = useRouter();
    const {mutate, isLoading} = useApiMutation(api.board.create)
    const {organization} = useOrganization()

    const handleCreate = async () => {
        if(!organization) return

        mutate({title: "Untitled", orgId: organization?.id})
        .then((id) => {
            toast.success("Board created successfully")
            route.push(`/board/${id}`)
            //ToDo: redirect to the board/{id}
        })
        .catch((error) => {
            toast.error("Failed to create board")
        })
    }
    return (
        <div className="  h-full flex flex-col justify-center items-center">
            <Image src= "/empty-board.jpeg" alt="Empty Board" width={300} height={300}/>
            <h2 className=" text-2xl font-bold mt-6">No boards at all</h2>
            <p className=" text-muted-foreground text-sm mt-2">Start creating your first board</p>
            <div className=" mt-6">
                <Button size="lg"className=" p-6" onClick={handleCreate} disabled={isLoading}>
                    Create Board
                </Button>
            </div>
        </div>
    )
}