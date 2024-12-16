import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";

const LayoutWrapper = styled.div`
  flex-grow: 1;
  padding: 48px 16px;
  display: flex;
  justify-content: center;
`;

const CanvasBoard = styled.canvas`
  background-color: #fff;
  border: 1px solid black;
`;

export const Canvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const brush = new Brush(canvasRef.current);

      canvasState.setCanvas(canvasRef.current);
      toolState.setTool(brush);
    }
  }, []);

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current!.toDataURL());
  };

  return (
    <LayoutWrapper>
      <CanvasBoard
        onMouseDown={mouseDownHandler}
        width={800}
        height={700}
        ref={canvasRef}
      />
    </LayoutWrapper>
  );
});
