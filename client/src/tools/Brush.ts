import Tool from "./Tool";

export default class Brush extends Tool {

  public mouseDown: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = (e) => this.mouseMoveHandler(e);
    this.canvas.onmousedown = (e) => this.mouseDownHandler(e);
    this.canvas.onmouseup = () => this.mouseUpHandler();
  }

  mouseUpHandler = () => {
    this.mouseDown = false;
  }

  mouseDownHandler(e: MouseEvent) {
    this.mouseDown = true;
    const {target} = e;

    if (target instanceof HTMLCanvasElement) {
      this.ctx.beginPath();
      this.ctx.moveTo(e.pageX - target.offsetLeft, e.pageY - target.offsetTop)
    }
  }

  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown && e.target instanceof HTMLCanvasElement) {
      const x = e.pageX - e.target.offsetLeft;
      const y = e.pageY - e.target.offsetTop;
      this.draw(x, y);
    }
  }

  draw(x: number, y: number) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
