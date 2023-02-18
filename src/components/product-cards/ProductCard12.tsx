import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Box } from "@mui/material";
import BazaarImage from "src/components/BazaarImage";
import BazaarRating from "src/components/BazaarRating";
import { FlexBetween, FlexBox } from "src/components/flex-box";
import HoverBox from "src/components/HoverBox";
import { H4 } from "src/components/Typography";
import Link from "next/link";
import { CSSProperties, FC } from "react";

// ===========================================================
type ProductCard3Props = {
  id: number;
  off?: number;
  price: number;
  title: string;
  imgUrl: string;
  rating: number;
  className?: string;
  hideReview?: boolean;
  style?: CSSProperties;
  hideFavoriteIcon?: boolean;
};
// ===========================================================

const ProductCard12: FC<ProductCard3Props> = ({
  id,
  title,
  price,
  imgUrl,
  rating,
  off = 20,
  hideReview,
  hideFavoriteIcon,
}) => {
  return (
    <Box>
      <Link href={`/product/${id}`}>
        <a>
          <HoverBox>
            <BazaarImage
              src={imgUrl}
              width="100%"
              height="auto"
              alt={title}
              mx="auto"
            />
          </HoverBox>
        </a>
      </Link>

      <FlexBetween>
        <Box mt="1rem">
          <H4 fontWeight="600" fontSize="14px" mb={0.5} title={title} ellipsis>
            {title}
          </H4>
          {!hideReview && <BazaarRating value={rating} color="warn" readOnly />}

          <FlexBox alignItems="center">
            <Box pr={1} fontWeight="600" color="primary.main">
              ${(price - (price * off) / 100).toFixed(2)}
            </Box>
            {!!off && (
              <Box color="grey.600" fontWeight="600">
                <del>{price?.toFixed(2)}</del>
              </Box>
            )}
          </FlexBox>
        </Box>

        {!hideFavoriteIcon && (
          <FavoriteBorder
            fontSize="small"
            color="secondary"
            sx={{ opacity: 0.5, m: "1rem" }}
          />
        )}
      </FlexBetween>
    </Box>
  );
};

export default ProductCard12;
