
import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react"
import { ToolButton } from "./tool-button"
import { CanvasState , CanvasMode, LayorType} from "@/types/canvas";



interface ToolbarProps{
    canvasState : CanvasState;
    setCanvasState : (state:CanvasState) => void;
    undo: () => void;
    redo: () => void;
    canUndo : boolean;
    canRedo : boolean;
};

export const Toolbar = ( {canvasState,setCanvasState,undo,redo,canRedo,canUndo}:ToolbarProps) => {
    return (
        <div className=" absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
            <div className=" bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
                <ToolButton
                    label="Select"
                    icon={MousePointer2}
                    onClick={() => setCanvasState({mode:CanvasMode.None})}
                    isActive={
                        canvasState.mode === CanvasMode.None ||
                        canvasState.mode === CanvasMode.Translating ||
                        canvasState.mode === CanvasMode.SelectionNet ||
                        canvasState.mode === CanvasMode.Pressing ||
                        canvasState.mode === CanvasMode.Resizing 
                    } />
                <ToolButton
                    label="Text"
                    icon={Type}
                    onClick={() => setCanvasState(
                        {
                            mode:CanvasMode.Inserting,
                            layerType:LayorType.Text,

                        })}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayorType.Text
                    } />
                <ToolButton
                    label="Note"
                    icon={StickyNote}
                    onClick={() => setCanvasState(
                        {
                            mode:CanvasMode.Inserting,
                            layerType:LayorType.Note
                        }
                    )}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayorType.Note
                    } />
                <ToolButton
                    label="Rectangle"
                    icon={Square}
                    onClick={() => setCanvasState(
                        {
                            mode: CanvasMode.Inserting,
                            layerType:LayorType.Rectangle
                        }
                    )}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayorType.Rectangle
                    } />
                <ToolButton
                    label="Ellipse"
                    icon={Circle}
                    onClick={() =>setCanvasState(
                        {
                            mode: CanvasMode.Inserting,
                            layerType:LayorType.Ellipse
                        })
                    }
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayorType.Ellipse
                    } />
                <ToolButton
                    label="Pencil"
                    icon={Pencil}
                    onClick={() => setCanvasState({
                        mode : CanvasMode.Pencil
                    })}
                    isActive={
                        canvasState.mode === CanvasMode.Pencil
                    } />
            </div>
            {/* toolbar part-2 */}
            <div className=" bg-white flex flex-col items-center shadow-sm rounded-md">
                <ToolButton
                    label="Undo"
                    icon={Undo2}
                    onClick={undo}
                    isDisable={!canUndo} />
                <ToolButton
                    label="Redo"
                    icon={Redo2}
                    onClick={redo}
                    isDisable={!canRedo} />
            </div>
        </div>
    )
}

export const ToolbarSkeleton = () => {
    return (
        <div className=" absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 
        bg-white h-[360px] w-[52px] rounded-md shadow-md">
        </div>
    )
}