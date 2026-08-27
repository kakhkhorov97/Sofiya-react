import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

/** REDUX & SELECTOR */
const popularBooksRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({
    popularBooks: popularDishes,
  }),
);

export default function PopularBooks() {
  const { popularBooks } = useSelector(popularBooksRetriever);

  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Popular Books</Box>

          <Stack className="cards-frame">
            {popularBooks.length !== 0 ? (
              popularBooks.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;

                return (
                  <CssVarsProvider key={product._id}>
                    <Card className="book-card">
                      {/* BOOK COVER */}
                      <div className="book-cover">
                        <img src={imagePath} alt={product.productTitle} />
                      </div>

                      {/* BOOK INFORMATION */}
                      <div className="book-info">
                        {/* TITLE */}
                        <Typography className="book-title">
                          {product.productTitle}
                        </Typography>

                        {/* DESCRIPTION */}
                        <Typography className="book-description">
                          {product.productDecs}
                        </Typography>

                        {/* BOTTOM INFORMATION */}
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          className="book-bottom"
                        >
                          {/* PRICE */}
                          <Typography className="book-price">
                            ${product.productPrice}
                          </Typography>

                          {/* VIEWS */}
                          <Typography className="book-views">
                            <VisibilityIcon
                              sx={{
                                fontSize: 18,
                                marginRight: "4px",
                              }}
                            />
                            {product.productViews}
                          </Typography>
                        </Stack>
                      </div>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data">Popular books are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
