import React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

import * as ImportedIcon from "./svgFiles";
import { iconStylesDictionary, StyledIconProps } from "./styles";

export type iconTypes = "elevator";

export interface IconProps {
  colorIcon?: string;
  component?: iconTypes;
  size?: StyledIconProps;
  disabled?: boolean;
}

const Icon: React.FC<SvgIconProps & Omit<IconProps, keyof SvgIconProps>> = ({
  colorIcon = "black",
  component,
  size = "sm",
  disabled = false,
  sx = [],
  ...props
}) => {
  const icon = ImportedIcon[component as keyof typeof ImportedIcon];
  return (
    <SvgIcon
      data-testid={`Icon-${component}`}
      component={icon}
      sx={[
        {
          ...iconStylesDictionary[size],
          ...{
            "&.MuiSvgIcon-root path": {
              fill: colorIcon,
            },
          },
        },
      ]}
      {...props}
      inheritViewBox
    />
  );
};

export default Icon;
