import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import "./Cart.css";

const CartIcon = () => {
  useFirestoreConnect(["cart"]); // sync ecommerceCart collection from Firestore into redux
  const cart = useSelector((state) => state.firestore.ordered.cart);
  const totalQuantity =
    cart && cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <Link to="/cart">
      <div className="cart">
        <FontAwesomeIcon icon={faShoppingCart} />
        <span className="badge badge-danger">{totalQuantity}</span>
      </div>
    </Link>
  );
};

export default CartIcon;
