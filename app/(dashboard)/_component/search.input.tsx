"use client"

import qs from "query-string"
import { Search } from "lucide-react"
import {  useDebounceValue } from "usehooks-ts"
import { useRouter } from "next/navigation"
import {
    ChangeEvent,
    useEffect,
    useState 
}from "react"
import { Input } from "@/components/ui/input"

export const SearchInput = () =>{
    const route = useRouter(); 
    const [value , setValue ] = useState("");
    const [debounceValue] = useDebounceValue(value,500);

    const handleChange = (e : ChangeEvent<HTMLInputElement>) =>{
        setValue(e.target.value);
    }
    useEffect(() =>{
        // generate url
        const url = qs.stringifyUrl({
            url:"/",
            query:{
                search :debounceValue
            }
        },{skipEmptyString:true , skipNull : true});
        route.push(url);
    },[debounceValue , route])
    return(
        <div className=" w-full relative ">
            <Search
                className=" absolute top-1/2 left-3 transform -translate-y-1/2 
                 text-muted-foreground h-4 w-4"/>
            <Input
                className=" w-full max-w-[510px] pl-9"
                placeholder="SearchBoard"
                onChange={handleChange}
                value={value}
                />
                
        </div>
    )
}