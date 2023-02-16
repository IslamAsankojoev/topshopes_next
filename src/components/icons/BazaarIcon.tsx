/* eslint-disable @next/next/no-img-element */
import { SvgIcon } from "@mui/material";
import { FC } from "react";

export interface BazaarIconProps {}

const BazaarIcon: FC<BazaarIconProps> = () => {
  return (
    <SvgIcon htmlColor="primary" viewBox="0 0 24 24">
      <img src="/assets/images/icons/bag.svg" alt="" />
    </SvgIcon>
  );
};

export default BazaarIcon;
