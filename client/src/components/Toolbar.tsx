import { ChangeEvent } from "react";
import styled from "styled-components";
import * as palette from "../styles/variables";
import toolState from "../store/toolState";
import { leftIconsBox, rightIconsBox } from "../const/ToolItems";

interface IconButtonProps {
  icon: string;
}

const IconButton = styled(palette.ToolbarButton)<IconButtonProps>`
  background-image: url(${(props) => props.icon});
  background-size: cover;
  background-repeat: no-repeat;
`;

const ToolbarWrap = styled(palette.PanelShadow)`
  z-index: 10;
  gap: 16px;
`;

const ColorPicker = styled.input.attrs({ type: "color" })`
  width: 60px;
  height: 35px;
  cursor: pointer;
  margin-left: 32px;
  border: 1px solid black;
`;

const IconsBox = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
`;

export const Toolbar = () => {
  const setToolColor = (e: ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    toolState.setFillColor(newColor);
    toolState.setStrokeColor(newColor);
  };

  return (
    <ToolbarWrap>
      <IconsBox>
        {leftIconsBox.map((tool) => (
          <IconButton key={tool.icon} icon={tool.icon} onClick={tool.onClick} />
        ))}
        <ColorPicker onChange={setToolColor} />
      </IconsBox>
      <IconsBox style={{ marginLeft: "auto" }}>
        {rightIconsBox.map((tool) => (
          <IconButton key={tool.icon} icon={tool.icon} onClick={tool.onClick} />
        ))}
      </IconsBox>
    </ToolbarWrap>
  );
};
