import {create} from "zustand"

const defaultValue = {id :"", title :""}

interface IRenameModal{
    isOpen : boolean;
    initialValues : typeof defaultValue;
    onOpen : (id:string, title:string) => void;
    onClose : () => void; 
}

export const useRenameModal = create<IRenameModal>((set) =>({
    isOpen : false,
    onOpen: (id,title) => {set({
        isOpen:true,
        initialValues : {id,title},
    }),
        console.log("dialog Open")
    },
    onClose: () => {set({
        isOpen:false,
        initialValues : defaultValue,
    }),
    console.log("close dialog");
}
    ,
    initialValues : defaultValue,
}));