import BrushIcon from "../assets/img/brush.png";
import RectIcon from "../assets/img/rect.png";
import CircleIcon from "../assets/img/circle.png";
import EraserIcon from "../assets/img/eraser.png";
import LineIcon from "../assets/img/line.png";
import UndoIcon from "../assets/img/undo.png";
import RedoIcon from "../assets/img/redo.png";
import SaveIcon from "../assets/img/save.png";
import canvasState from "../store/canvasState";
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";
import toolState from "../store/toolState";

export const leftIconsBox: ToolbarItem[] = [
  {
    id: "brush",
    icon: BrushIcon,
    onClick: () => {
      toolState.setTool(new Brush(canvasState.canvas!));
    },
  },
  {
    id: "rect",
    icon: RectIcon,
    onClick: () => {
      toolState.setTool(new Rect(canvasState.canvas!));
    },
  },
  {
    id: "circle",
    icon: CircleIcon,
    onClick: () => {
      toolState.setTool(new Circle(canvasState.canvas!));
    },
  },
  {
    id: "eraser",
    icon: EraserIcon,
    onClick: () => {
      toolState.setTool(new Eraser(canvasState.canvas!));
    },
  },
  {
    id: "line",
    icon: LineIcon,
    onClick: () => {
      toolState.setTool(new Line(canvasState.canvas!));
    },
  },
];

export const rightIconsBox: ToolbarItem[] = [
  { id: "undo", icon: UndoIcon, onClick: () => {
    canvasState.undo();
  } },
  { id: "redo", icon: RedoIcon, onClick: () => {
    canvasState.redo();
  } },
  { id: "save", icon: SaveIcon },
];

export interface ToolbarItem {
  id: string;
  icon: string;
  onClick?: () => void;
}