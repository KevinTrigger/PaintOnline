import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas: HTMLCanvasElement | null = null;
  undoList: string[] = [];
  redoList: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  pushToUndo(data: string) {
    this.undoList.push(data);
  }

  pushToRedo(data: string) {
    this.redoList.push(data);
  }

  undo() {
    const ctx = this.canvas?.getContext('2d');
    if (!this.canvas || !ctx) return;
    
    if (this.undoList.length) {
      const dataUrl = this.undoList.pop();
      if (dataUrl) this.redoList.push(dataUrl);
      
      const img = new Image();
      img.src = dataUrl || '';
      
      img.onload = () => {
        ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
        ctx?.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height);
      }
    } else {
      ctx?.clearRect(0, 0, this.canvas?.width, this.canvas?.height);
    }
  }

  redo() {
    const ctx = this.canvas?.getContext('2d');
    if (!this.canvas || !ctx) return;
    
    if (this.redoList.length) {
      const dataUrl = this.redoList.pop();
      
      const img = new Image();
      img.src = dataUrl || '';
      img.onload = () => {
        ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
        ctx?.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height);
        this.undoList.push(this.canvas!.toDataURL());
      }
    }
  }
}

export default new CanvasState();