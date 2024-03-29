import { styled } from "@mui/material";
import BazaarCard from "src/components/BazaarCard";
import BazaarImage from "src/components/BazaarImage";
import { FlexBox } from "src/components/flex-box";
import { H2, Paragraph, Small } from "src/components/Typography";
import Link from "next/link";
import { FC } from "react";

// styled components
const ContentWrapper = styled(BazaarCard)(({ theme }) => ({
  height: "100%",
  borderRadius: "2px",
  boxShadow: theme.shadows[4],
}));

const StyledFlexBox = styled(FlexBox)(() => ({
  padding: "1rem",
  paddingTop: "3rem",
  alignItems: "center",
  flexDirection: "column",
}));

const StyledShopButton = styled(Small)(({ theme }) => ({
  fontWeight: 900,
  lineHeight: 1.6,
  borderBottom: `2px solid ${theme.palette.primary.main}`,
}));

// ==========================================================
type Props = { carouselData?: any };
// ==========================================================

const CarouselCard3: FC<Props> = ({ carouselData }) => {
  return (
    <ContentWrapper>
      <StyledFlexBox>
        <H2 mb="0.5rem" textAlign="center" lineHeight={1.2}>
          {carouselData.title}
        </H2>

        <Paragraph color="grey.600" textAlign="center" mb="1.5rem">
          Starting at ${carouselData.price} & save upto {carouselData.off}%
        </Paragraph>

        <Link href={`/product/${carouselData.id}`}>
          <a>
            <StyledShopButton>{carouselData.buttonText}</StyledShopButton>
          </a>
        </Link>
      </StyledFlexBox>

      <BazaarImage width="100%" src={carouselData.imgUrl} alt="shoes" />
    </ContentWrapper>
  );
};

export default CarouselCard3;
