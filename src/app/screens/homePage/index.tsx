import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import "../../../css/home.css";
import { ProductFormat } from "../../../lib/enums/product.enum";
import NewDishes from "./NewDishes";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const { setPopularDishes, setNewDishes, setTopUsers } =
    actionDispatch(useDispatch());

  // console.log(process.env.REACT_APP_API_URL);

  useEffect(() => {
    //Backend server data request => DATA
    // Slice: DATA to Store

    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productFormat: ProductFormat.HARDCOVER,
      })
      .then((data) => {
        console.log("data:", data);
        setPopularDishes(data.products);
      })
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        productFormat: ProductFormat.HARDCOVER,
      })
      .then((data) => {
        setNewDishes(data.products);
      })
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => {
        setTopUsers(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
