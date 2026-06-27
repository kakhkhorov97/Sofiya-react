import React from "react";
import "../css/app.css";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Route, Switch, Link,} from "react-router-dom";
import {  HomePage } from "./screens/homePage";
import { ProductsPage } from "./screens/productsPage";
import { OrdersPage } from "./screens/ordersPage";
import { UserPage } from "./screens/userPage";

function App() {
  return (
    <div>
        <ul>
          <li>
            <Link to="/">HomePage</Link>
          </li>
          <li>
            <Link to="/products">ProductsPage</Link>
          </li>
          <li>
            <Link to="/order">OrdersPage</Link>
          </li>
          <li>
            <Link to="/member-page">UserPage</Link>
          </li> 
        </ul>

        <Switch>
          <Route path="/products">
            <ProductsPage />
          </Route>
          <Route path="/order">
            <OrdersPage  />
          </Route>
          <Route path="/member-page">
            <UserPage  />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
  );
} 
export default App;





