 "use client"

import { useHistory, useSelf , useCanRedo , useCanUndo } from "@liveblocks/react"
import { Info } from "./info"
import { Participant } from "./participant"
import { Toolbar } from "./toobar"
import { useState } from "react"
import { CanvasMode, CanvasState } from "@/types/canvas"
interface CanvasProps
{
    boardId:string
}
 export const Canvas = ({boardId}:CanvasProps) => {
   const [canvasState , setCanvasState] = useState<CanvasState>({
      mode:CanvasMode.None
   })
   const history = useHistory();
   const canUndo = useCanUndo();
   const canRedo = useCanRedo();
   const info = useSelf((me) => me.info);

    return(
       <main className=" h-full w-full bg-neutral-100 touch-none">
            <Info boardId={boardId}/>
            <Participant/>
            <Toolbar
               canvasState={canvasState}
               setCanvasState={setCanvasState }
               canRedo={canRedo}
               canUndo={canUndo}
               redo={history.redo}
               undo={history.undo}/>
       </main>
    )
 }