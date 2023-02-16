import { Box, BoxProps } from "@mui/material";
import { FC } from "react";

const FlexBetween: FC<BoxProps> = ({ children, ...props }) => (
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    {...props}
  >
    {children}
  </Box>
);

export default FlexBetween;
