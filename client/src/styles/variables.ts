import styled from "styled-components";

// colors
export const BACKGROUND_COLOR = '#F6F6F6';

// sizes
export const PANEL_HEIGHT = '60px';

// components

export const Layout = styled.main`
height: 100vh;
max-height: 100vh;
width: 100vw;
`;

export const BoxShadow = styled.div`
  box-shadow: 0 3px 5px gray;
`

export const PanelShadow = styled(BoxShadow)`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
  padding: 16px 32px;
  height: ${PANEL_HEIGHT};
`

export const ToolbarButton = styled.button`
  width: 25px;
  height: 25px;
  border: none;
  outline: none;
  cursor: pointer;
  background: none;
  background-repeat: no-repeat;
  opacity: 0.8;
  display: flex;

  &:hover {
    transform: scale(1.05);
    opacity: 1;
  }
`

export const CounterInput = styled.input.attrs({
  type: "number",
  min: 1,
  max: 50,
  defaultValue: 1,
})`
  border: 1px solid black;
  text-align: center;
`;

export const ColorInput = styled.input.attrs({
  type: "color",
  defaultValue: '#000000'
})`
  border: 1px solid black;
  text-align: center;
`;