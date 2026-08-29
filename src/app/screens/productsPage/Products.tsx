import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductFormat, ProductGenre } from "../../../lib/enums/product.enum";
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/serach";

//* REDUX SLICE AND SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;

  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productFormat: undefined,
    productGenre: undefined,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const [total, setTotal] = useState<number>(0);

  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      setProductSearch((prev) => ({
        ...prev,
        page: 1,
        search: "",
      }));
    }
  }, [searchText]);

  // FORMAT FILTER
  // Selecting a format clears the genre.
  const searchCollectionHandler = (format: ProductFormat) => {
    setProductSearch((prev) => ({
      ...prev,
      page: 1,
      productFormat: format,
      productGenre: undefined,
    }));
  };

  // GENRE FILTER
  // Selecting a genre clears the format.
  const searchGenreHandler = (genre: ProductGenre) => {
    setProductSearch((prev) => ({
      ...prev,
      page: 1,
      productGenre: genre,
      productFormat: undefined,
    }));
  };

  // SEARCH
  const searchProductHandler = () => {
    setProductSearch((prev) => ({
      ...prev,
      page: 1,
      search: searchText,
    }));
  };

  // PAGINATION
  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    setProductSearch((prev) => ({
      ...prev,
      page: value,
    }));
  };

  // PRODUCT DETAIL
  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar-big-box"}>
            <Stack className={"top-text"}>
              <p></p>

              <Stack className={"single-search-big-box"}>
                <input
                  type={"search"}
                  className={"single-search-input"}
                  name={"singleResearch"}
                  placeholder={"Type here"}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      searchProductHandler();
                    }
                  }}
                />

                <Button
                  className={"single-button-search"}
                  variant="contained"
                  endIcon={<SearchIcon />}
                  onClick={searchProductHandler}
                >
                  Search
                </Button>
              </Stack>
            </Stack>
          </Stack>

          <Stack className={"genre-filter-section"}>
            <Stack className={"genre-filter-box"}>
              {/* ALL BOOKS */}

              <Button
                variant={"contained"}
                color={
                  productSearch.productGenre === undefined &&
                  productSearch.productFormat === undefined
                    ? "primary"
                    : "secondary"
                }
                className={"genre"}
                onClick={() => {
                  setProductSearch((prev) => ({
                    ...prev,
                    page: 1,
                    productGenre: undefined,
                    productFormat: undefined,
                  }));
                }}
              >
                ALL BOOKS
              </Button>

              {Object.values(ProductGenre).map((genre) => (
                <Button
                  key={genre}
                  variant={"contained"}
                  color={
                    productSearch.productGenre === genre
                      ? "primary"
                      : "secondary"
                  }
                  className={"genre"}
                  onClick={() => searchGenreHandler(genre)}
                >
                  {genre.replace(/_/g, " ")}
                </Button>
              ))}
            </Stack>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <div className={"category-main"}>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productFormat === ProductFormat.AUDIOBOOK
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductFormat.AUDIOBOOK)
                  }
                >
                  AUDIOBOOK
                </Button>

                {/* EBOOK */}

                <Button
                  variant={"contained"}
                  color={
                    productSearch.productFormat === ProductFormat.EBOOK
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchCollectionHandler(ProductFormat.EBOOK)}
                >
                  EBOOK
                </Button>

                {/* HARDCOVER */}

                <Button
                  variant={"contained"}
                  color={
                    productSearch.productFormat === ProductFormat.HARDCOVER
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductFormat.HARDCOVER)
                  }
                >
                  HARDCOVER
                </Button>

                {/* PAPERBACK */}

                <Button
                  variant={"contained"}
                  color={
                    productSearch.productFormat === ProductFormat.PAPERBACK
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductFormat.PAPERBACK)
                  }
                >
                  PAPERBACK
                </Button>
              </div>
            </Stack>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;

                  return (
                    <Stack
                      key={product._id}
                      className={"product-card"}
                      onClick={() => chooseDishHandler(product._id)}
                    >
                      <Stack
                        className={"product-img"}
                        sx={{
                          backgroundImage: `url(${imagePath})`,
                        }}
                      >
                        <div className={"product-sale"}>{}</div>

                        <Button
                          className={"shop-btn"}
                          onClick={(e) => {
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productTitle,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });

                            e.stopPropagation();
                          }}
                        >
                          <img
                            src={"/icons/shopping-cart.svg"}
                            style={{
                              display: "flex",
                            }}
                          />
                        </Button>

                        {/* VIEWS */}

                        <Button className={"view-btn"} sx={{ right: "36px" }}>
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>

                      {/* PRODUCT INFORMATION */}

                      <Box className={"product-desc"}>
                        <span className={"product-title"}>
                          {product.productTitle}
                        </span>

                        <div className={"product-desc"}>
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )}
            </Stack>
          </Stack>

          {/* =========================
              PAGINATION
              ========================= */}

          <Stack className={"pagination-section"}>
            <Pagination
              count={Math.ceil(total / productSearch.limit)}
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      <div className={"recommended-books"}>
        <Container className={"recommended-container"}>
          <Box className={"category-title"}>You May Also Like</Box>

          <Stack className={"recommended-list"}>
            {products.slice(0, 4).map((product: Product) => {
              const imagePath = `${serverApi}/${product.productImages[0]}`;

              return (
                <Stack
                  key={product._id}
                  className={"recommended-card"}
                  onClick={() => chooseDishHandler(product._id)}
                >
                  <img
                    src={imagePath}
                    alt={product.productTitle}
                    className={"recommended-image"}
                  />

                  <Box className={"recommended-info"}>
                    <span className={"recommended-title"}>
                      {product.productTitle}
                    </span>

                    <span className={"recommended-price"}>
                      ${product.productPrice}
                    </span>
                  </Box>
                </Stack>
              );
            })}
          </Stack>
        </Container>
      </div>

      {/* =========================
          ADDRESS
          ========================= */}

      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"title"}>Our address</Box>

            <iframe
              src="https://www.google.com/maps?q=Andijan,Uzbekistan&output=embed"
              width="1320"
              height="500"
              style={{ border: 0, marginTop: "60px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
