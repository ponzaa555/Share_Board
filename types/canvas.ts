// use for canvas component
export enum CanvasMode {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  Pencil,
}

export enum LayorType{
  Rectangle,
  Ellipse,
  Path,
  Text,
  Note
};

export type RectangleLayer = {
  type:LayorType.Rectangle;
  x:number;
  y:number;
  height:number;
  width:number;
  fill:Color;
  value?:string;
}

export type EllipseLayer = {
  type:LayorType.Ellipse;
  x:number;
  y:number;
  height:number;
  width:number;
  fill:Color;
  value?:string;
}
export type PathLayer = {
  type:LayorType.Path;
  x:number;
  y:number;
  height:number;
  width:number;
  fill:Color;
  point:number[][];
  value?:string;
}
export type TextLayer = {
  type:LayorType.Text;
  x:number;
  y:number;
  height:number;
  width:number;
  fill:Color;
  value?:string;
}

export type NoteLayer = {
  type:LayorType.Note;
  x:number;
  y:number;
  height:number;
  width:number;
  fill:Color;
  value?:string;
}

export type Color = {
  r:number;
  g:number;
  b:number;
};

export type Camera ={
  x : number;
  y : number;
};

export type Point = {
  x: number;
  y: number;
}

export type XYWH = {
  x: number;
  y: number;
  width:number;
  height:number;
}

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}
export type CanvasState =
  | {
      mode: CanvasMode.None;
    }
  | {
      mode: CanvasMode.Pressing;
      origin:Point;
    }
  | {
      mode: CanvasMode.Pencil;
    }
  | {
      mode: CanvasMode.Inserting;
      layerType: LayorType.Ellipse | LayorType.Note | LayorType.Path | LayorType.Rectangle | LayorType.Text

    }
  | {
      mode: CanvasMode.SelectionNet;
      origin: Point;
      current: Point;
    }
  | {
      mode: CanvasMode.Translating;
      current: Point;
    }
  | {
      mode: CanvasMode.Resizing;
      initialBounds:XYWH;
      coner:Side
    };
