import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


const COLORS = ["#f4a261", "#2a9d8f", "#e76f51", "#264653", "#e9c46a", "#d62828", "#023e8a", "#0077b6", "#0096c7", "#00b4d8"]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId : number) : string{
  return COLORS[connectionId % COLORS.length]
}