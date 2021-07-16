import React from "react";
import ProductItems from "../Components/Products/ProductItems";
const Products = () => {
  const renderProducts = () => {
    return (
      <div className="container">
        <h2 style={{ margin: "20px 0 20px 0" }}>Products</h2>
        <div className="row">
          <ProductItems />
        </div>
      </div>
    );
  };
  return <>{renderProducts()}</>;
};

export default Products;
