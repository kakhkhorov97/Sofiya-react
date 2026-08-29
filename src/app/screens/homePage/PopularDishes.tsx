import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";

import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";

import VisibilityIcon from "@mui/icons-material/Visibility";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

/** REDUX & SELECTOR */
const popularBooksRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({
    popularBooks: popularDishes,
  }),
);

export default function PopularBooks() {
  const { popularBooks } = useSelector(popularBooksRetriever);

  const history = useHistory();

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

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
                    <Card
                      className="book-card"
                      onClick={() => chooseDishHandler(product._id)}
                    >
                      <div className="book-cover">
                        <img src={imagePath} alt={product.productTitle} />
                      </div>

                      <div className="book-info">
                        <Typography className="book-title">
                          {product.productTitle}
                        </Typography>

                        <Typography className="book-description">
                          {product.productDecs}
                        </Typography>

                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          className="book-bottom"
                        >
                          <Typography className="book-price">
                            ${product.productPrice}
                          </Typography>

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
