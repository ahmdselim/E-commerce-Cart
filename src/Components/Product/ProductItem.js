import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import Product from "./Product";

const ProductItem = () => {
  useFirestoreConnect(["products"]); // sync ecommerceCart collection from Firestore into redux
  const products = useSelector((state) => state.firestore.ordered.products);
  const { id } = useParams();

  const productSelected =
    products && products
      ? products.filter((product) => product.id === id)
      : null;

  const renderProduct = () => {
    return (
      <>
        {productSelected.map((product) =>
          product.id === id ? (
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              description={product.description}
            />
          ) : null
        )}
      </>
    );
  };

  if (!products) {
    return (
      <>
        <p>loading ....</p>
      </>
    );
  } else {
    return <>{renderProduct()}</>;
  }
};

export default ProductItem;
