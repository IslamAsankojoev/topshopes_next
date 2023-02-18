import { Box, BoxProps, Divider, styled } from "@mui/material";
import BazaarImage from "src/components/BazaarImage";
import { H2, Paragraph, Span } from "src/components/Typography";
import Link from "next/link";
import { FC } from "react";

// custom styled components
const CardWrapper = styled(Box)(() => ({
  maxHeight: 240,
  overflow: "hidden",
  borderRadius: "10px",
  position: "relative",
  "& img": { transition: "0.3s" },
  ":hover": { img: { transform: "scale(1.1)" } },
}));

const CardContent = styled(Box, {
  shouldForwardProp: (props) => props !== "contentAlign",
})<{ contentAlign: "right" | "left" }>(({ contentAlign }) => ({
  top: 0,
  zIndex: 1,
  color: "#fff",
  height: "100%",
  display: "flex",
  position: "absolute",
  flexDirection: "column",
  justifyContent: "center",
  ...(contentAlign === "left"
    ? { left: 32 }
    : { right: 32, alignItems: "flex-end" }),
}));

const CardLink = styled(Span)(() => ({
  position: "relative",
  paddingBottom: "2px",
  textTransform: "uppercase",
  ":hover::after": { width: "100%" },
  ":after": {
    left: 0,
    bottom: 0,
    width: "0%",
    content: "''",
    height: "2px",
    transition: "0.3s",
    position: "absolute",
    backgroundColor: "white",
  },
}));

// ========================================================
type BannerCard1Props = {
  img: string;
  url: string;
  title: string;
  subTitle: string;
  contentPosition?: "left" | "right";
};
// ========================================================

const BannerCard1: FC<BannerCard1Props & BoxProps> = ({
  img,
  url,
  title,
  subTitle,
  contentPosition,
  ...props
}) => {
  return (
    <CardWrapper {...props}>
      <BazaarImage alt="category" height="100%" width="100%" src={img} />

      <CardContent contentAlign={contentPosition} className="content">
        <H2>{title}</H2>
        <Paragraph>{subTitle}</Paragraph>
        <Divider sx={{ borderWidth: 2, my: 1.5, width: 50 }} />

        <Link href={url}>
          <a>
            <CardLink>Shop Now</CardLink>
          </a>
        </Link>
      </CardContent>
    </CardWrapper>
  );
};

// set deafult props
BannerCard1.defaultProps = { contentPosition: "left" };

export default BannerCard1;
