import { Hint } from "@/components/hint";
import {
    Avatar, 
    AvatarImage, 
    AvatarFallback
} from "@/components/ui/avatar"

interface UserAvatarProps {
    src? : string;
    name? : string;
    fallback? : string;
    borderColor? :string
}

export const UserAvatar = ( {src,name,fallback,borderColor}:UserAvatarProps) =>
{
    return(
        <Hint label={name || "Teamate"} side="bottom" sideOffset={18}>
            <Avatar
                className=" h-8 w-8 border-2"
                // ใช้ style เพราะ tailwind ทำตอน compiler ดังนั้น props ที่ส่งมาจะไม่นับแล้ว
                style={{borderColor:borderColor}}>
                    <AvatarImage src={src}/>
                    <AvatarFallback className=" text-sm font-semibold">
                        {fallback}
                    </AvatarFallback>
            </Avatar>
        </Hint>
    )
}