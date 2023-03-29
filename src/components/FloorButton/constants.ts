import { arrivedStile, callStyle, watingStyle } from "./style-FloorBotton";

export type button = {
  text: string;
  style: React.CSSProperties;
};

export const buttons = {
  call: {
    text: "Call",
    style: callStyle,
  },
  wating: {
    text: "Wating",
    style: watingStyle,
  },
  arrived: {
    text: "Arrived",
    style: arrivedStile,
  },
};

export type floors = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
