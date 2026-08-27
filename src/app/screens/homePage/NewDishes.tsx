import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

/** REDUX & SELECTOR */
const newArrivalsRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newArrivals: newDishes,
}));

export default function NewArrivals() {
  const { newArrivals } = useSelector(newArrivalsRetriever);

  console.log("newArrivals:", newArrivals);

  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className={"main"}>
          {/* SECTION TITLE */}
          <Box className={"category-title"}>New Arrivals</Box>

          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {newArrivals.length !== 0 ? (
                newArrivals.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;

                  return (
                    <Card
                      key={product._id}
                      variant="outlined"
                      className={"card"}
                    >
                      <CardOverflow>
                        <div className="product-sale"></div>

                        <AspectRatio ratio="1">
                          <img src={imagePath} alt={product.productTitle} />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow variant="soft" className="product-detail">
                        <Stack className="info">
                          <Stack flexDirection={"row"}>
                            <Typography
                              className={"title"}
                              sx={{
                                display: "block",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                marginRight: "10px",
                              }}
                              noWrap
                            >
                              {product.productTitle}
                            </Typography>

                            <Divider width="2" height="24" bg="#d9d9d9" />

                            <Typography className={"price"}>
                              ${product.productPrice}
                            </Typography>
                          </Stack>

                          <Stack>
                            <Typography className={"views"}>
                              {product.productViews}
                              <VisibilityIcon
                                sx={{
                                  fontSize: 20,
                                  marginLeft: "5px",
                                }}
                              />
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">New arrivals are not available!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
