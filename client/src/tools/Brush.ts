import Tool from "./Tool";

export default class Brush extends Tool {

  public mouseDown: boolean = false;

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
    super(canvas, socket, id);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = (e) => this.mouseMoveHandler(e);
    this.canvas.onmousedown = (e) => this.mouseDownHandler(e);
    this.canvas.onmouseup = () => this.mouseUpHandler();
  }

  mouseUpHandler = () => {
    this.mouseDown = false;

    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.id,
      figure: {
        type: 'finish',
      }
    }))
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
      // this.draw(x, y);
      this.socket.send(JSON.stringify({
        method: 'draw',
        id: this.id,
        figure: {
          type: 'brush',
          x,
          y
        }
      }))
    }
  }

  static draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
