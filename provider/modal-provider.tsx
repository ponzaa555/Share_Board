
"use client"
{/*
    เป็นการ reuse code ถ้ามีmodal ตัวอื่นก็จะทำให้ในไฟล์นี้ไม่ต้องเขียน pattern เดิมซ้ำๆ
*/}

 import { useEffect , useState } from "react"

 import { RenameModal } from "@/components/modals/rename-modal"


 export const ModalProvider = () => {
    const [isMounted,setIsMounted] = useState(false);

    // client side so useEffect will run on client side
    useEffect(() => {
        setIsMounted(true)
    },[])
    
    if(!isMounted) return <div> is Mounted</div>;
    return(
       <>
        <RenameModal />
       </>
    )
 }