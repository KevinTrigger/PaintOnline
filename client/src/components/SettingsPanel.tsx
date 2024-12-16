import styled from "styled-components";
import * as palette from "../styles/variables";
import { ChangeEvent } from "react";
import toolState from "../store/toolState";

const Panel = styled(palette.PanelShadow)`
  gap: 48px;
`;

const CounterInput = palette.CounterInput;
const ColorInput = palette.ColorInput;

const LabelBox = styled.div`
  display: flex;
  gap: 8px;
`;

export const SettingsPanel = () => {
  const onChangeLineWidth = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    toolState.setLineWidth(newValue);
  };

  const onChangeStrokeColor = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    toolState.setStrokeColor(newValue);
  };

  return (
    <Panel>
      <LabelBox>
        <label htmlFor="line-width">Толщина линии:</label>
        <CounterInput onChange={onChangeLineWidth} id="line-width" />
      </LabelBox>
      <LabelBox>
        <label htmlFor="stroke-color">Цвет обводки:</label>
        <ColorInput
          id="stroke-color"
          type="color"
          onChange={onChangeStrokeColor}
        />
      </LabelBox>
    </Panel>
  );
};
