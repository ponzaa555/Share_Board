import { Camera, Color, Layer, Point, Side, XYWH } from "@/types/canvas"
import { clsx, type ClassValue } from "clsx"
import { X } from "lucide-react"
import React from "react"
import { twMerge } from "tailwind-merge"


const COLORS = ["#f4a261", "#2a9d8f", "#e76f51", "#264653", "#e9c46a", "#d62828", "#023e8a", "#0077b6", "#0096c7", "#00b4d8"]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId : number) : string{
  return COLORS[connectionId % COLORS.length]
}

export function pointerEventToCanvasPoint(e:React.PointerEvent , camera:Camera) {
  return{
    x : Math.round(e.clientX)- camera.x, 
    y : Math.round(e.clientY) - camera.y
  }
}

// color to css map rgb to css(Hex code) 
export function colorToCss (color : Color){
  return `#${color.r.toString(16).padStart(2,"0")}${color.g.toString(16).padStart(2,"0")}${color.b.toString(16).padStart(2,"0")}`
}

export function resizeBounds(bound:XYWH , coner:Side , point:Point) : XYWH
{
  const result = {
    x : bound.x,
    y: bound.y,
    width: bound.width,
    height: bound.height,
  }

  if((coner & Side.Left) === Side.Left){
    result.x = Math.min(point.x , bound.x + bound.width);
    result.width = Math.abs(bound.x + bound.width - point.x);
  }

  if((coner & Side.Right) === Side.Right){
    result.x = Math.min(point.x , bound.x);
    result.width = Math.abs(point.x - bound.x)
  }

  if((coner & Side.Top) === Side.Top){
    result.y = Math.min(point.y , bound.y + bound.height)
    result.height = Math.abs(bound.y + bound.height - point.y);
  }
  if((coner & Side.Bottom) === Side.Bottom){
    result.y = Math.min(point.y , bound.y)
    result.height = Math.abs(point.y-bound.y);
  }

  return result
}

export function  findIntersectingLayersWithRectangle(
  layerIds: readonly string[],
  layers: ReadonlyMap<string , Layer >,
  a:Point,
  b:Point,
){
  const react = {
    x:Math.min(a.x , b.x),
    y:Math.min(a.y , b.y),
    width: Math.abs(a.x - b.x),
    height : Math.abs(a.y - b.y)
  }

  const ids = [];

  for(const layerId of layerIds){

    const layer = layers.get(layerId);

    if(layer == null){
      continue;
    }

    const {x , y , height , width} = layer;
    
    if(
      react.x + react.width >  x && 
      react.x < x + width  && 
      react.y + react.height > y &&
      react.y < y + height
    ){
      ids.push(layerId);
    }
  }
  return ids
}

export function getContrastingTextColor(color : Color){
  const luminance = 0.299 * color.r +0.587 * color.g + 0.114 * color.b;
  return luminance > 182 ? "black" : "white";
}