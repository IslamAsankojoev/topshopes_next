import { Box, BoxProps } from "@mui/material";
import { FC } from "react";

const FlexRowCenter: FC<BoxProps> = ({ children, ...props }) => (
  <Box display="flex" justifyContent="center" alignItems="center" {...props}>
    {children}
  </Box>
);

export default FlexRowCenter;
