"use client"


import {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { useRenameModal } from "@/store/use-rename-modal"
import { FormEvent, FormEventHandler, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"

export const RenameModal = () => {
    const { mutate, isLoading } = useApiMutation(api.board.update)
    const {
        isOpen,
        onClose,
        initialValues,
    } = useRenameModal()

    const [title, setTitle] = useState(initialValues.title)
    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        mutate({
            id: initialValues.id,
            title: title
        }).then(() => {
            toast.success("Board renamed")
            onClose()
        }).catch(() => {
            toast.error("Failed to rename board")
        })
    }

    useEffect(() => {
        setTitle(initialValues.title)
    }, [initialValues.title])

    useEffect(() => {
        console.log("Dialog isOpen state:", isOpen);
    }, [isOpen]);
    return (
        <Dialog open={isOpen} onOpenChange={(isOpen) => (!isOpen ? onClose() : null)}  >
            <DialogPortal>
                <DialogOverlay/>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Rename
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Enter title for this board
                    </DialogDescription>
                    <form onSubmit={onSubmit} className=" space-y-4">
                        <Input
                            disabled={isLoading}
                            required
                            maxLength={60}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter board title" />
                        <DialogFooter >
                            <DialogClose asChild>
                               
                                <Button type="button" variant="outline" >Cancel</Button>
                            </DialogClose>
                            <Button disabled={isLoading} type="submit">Save</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}
 {/* type="button" เพื่อไม่ให้ submit form */}