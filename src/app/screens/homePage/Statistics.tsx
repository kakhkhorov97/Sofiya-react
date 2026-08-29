import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import ExploreIcon from "@mui/icons-material/Explore";

export default function Statistics() {
  return (
    <div className="why-choose-section">
      <Container>
        <Stack className="why-choose-container">
          <Stack className="why-choose-list">
            <Box className="why-choose-card">
              <MenuBookIcon id="menu-book-icon" />

              <div className="why-choose-text">
                <h3>Curated Collection</h3>
                <p>Handpicked books for every kind of reader.</p>
              </div>
            </Box>

            <Divider height="64" width="2" bg="#E3C08D" />

            <Box className="why-choose-card">
              <ShoppingCartIcon id="shopping-cart-icon" />

              <div className="why-choose-text">
                <h3>Fast & Reliable</h3>
                <p>Enjoy quick and secure delivery to your door.</p>
              </div>
            </Box>

            <Divider height="64" width="2" bg="#E3C08D" />

            <Box className="why-choose-card">
              <HeadphonesIcon id="headphones-icon" />

              <div className="why-choose-text">
                <h3>Read Your Way</h3>
                <p>Choose from books, e-books, and audiobooks.</p>
              </div>
            </Box>

            <Divider height="64" width="2" bg="#E3C08D" />

            <Box className="why-choose-card">
              <ExploreIcon id="explore-icon" />

              <div className="why-choose-text">
                <h3>Discover More</h3>
                <p>Explore new genres and find your next great read.</p>
              </div>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
