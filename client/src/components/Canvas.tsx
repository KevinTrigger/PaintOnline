import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Modal, Input } from "antd";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import { useParams } from "react-router-dom";

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
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [username, setUsername] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { id } = useParams<string>();

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current!.toDataURL());
  };

  const onSendForm = () => {
    if (username.length) {
      canvasState.setUsername(username);
    }

    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  useEffect(() => {
    if (canvasRef.current) {
      canvasState.setCanvas(canvasRef.current);
    }
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket("ws://localhost:5000");
      canvasState.setSessionId(id!);
      canvasState.setSocket(socket);
      toolState.setTool(new Brush(canvasRef.current!, socket, id!));
      socket.onopen = () => {
        console.log("front: Соединение установлено");
        socket.send(
          JSON.stringify({
            id,
            username,
            method: "connection",
          })
        );
      };
      socket.onmessage = (e: MessageEvent) => {
        const msg = JSON.parse(e.data);
        switch (msg.method) {
          case "connection":
            console.log(msg.username, " подключился");
            break;

          case "draw":
            drawHandler(msg);
            break;
        }
      };
    }
  }, [canvasState.username]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current?.getContext("2d");
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y);
        break;
      case "finish":
        ctx?.beginPath();
        break;
    }
  };

  return (
    <LayoutWrapper>
      <CanvasBoard
        onMouseDown={mouseDownHandler}
        width={800}
        height={700}
        ref={canvasRef}
      />
      <Modal
        title="Представься, художник!"
        open={isModalOpen}
        onOk={onSendForm}
        onCancel={closeModal}
      >
        <Input type="text" value={username} onChange={onChangeUsername} />
      </Modal>
    </LayoutWrapper>
  );
});
