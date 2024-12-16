import Tool from "./Tool";

export default class Rect extends Tool {

  public mouseDown: boolean = false;
  public startX: number = 0;
  public startY: number = 0;
  public saved: string = '';

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
    this.startX = 0;
    this.startY = 0;
  }

  mouseDownHandler(e: MouseEvent) {
    this.mouseDown = true;
    const { target } = e;

    if (target instanceof HTMLCanvasElement) {
      this.ctx.beginPath();
      this.startX = e.pageX - target.offsetLeft;
      this.startY = e.pageY - target.offsetTop;
      this.saved = this.canvas.toDataURL();
    }
  }

  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown && e.target instanceof HTMLCanvasElement) {
      const currentX = e.clientX - e.target.offsetLeft;
      const currentY = e.clientY - e.target.offsetTop;
      const width = currentX - this.startX;
      const height = currentY - this.startY;

      this.draw(this.startX, this.startY, width, height);
    }
  }

  draw(x: number, y: number, width: number, height: number) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.rect(x, y, width, height);
      this.ctx.fill();
      this.ctx.stroke();
    }
  }
}
