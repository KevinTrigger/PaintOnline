import { makeAutoObservable } from "mobx";
import Tool from "../tools/Tool";


class ToolState {
  tool: Tool | null = null;
  
  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: Tool) {
    this.tool = tool;
  }

  setFillColor(newColor: string) {
    if (this.tool) {
      this.tool.fillColor = newColor;
      this.tool.strokeColor = newColor;
    }
  }

  setStrokeColor(newColor: string) {
    if (this.tool) {
      this.tool.strokeColor = newColor;
    } 
  }

  setLineWidth(width: number) {
    if (this.tool) {
      this.tool.lineWidth = width;
    }
  }
}

export default new ToolState();