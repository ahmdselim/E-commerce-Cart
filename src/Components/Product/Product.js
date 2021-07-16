import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";

const Product = (props) => {
  const firestore = useFirestore();
  const { id, name, image, price, description } = props;
  const [quantity, setQuantity] = useState(0);

  const handleChangeQuantity = (e) => {
    const { value } = e.target;
    if (value > 0) {
      setQuantity(value);
    } else {
      return;
    }
  };

  const handleOnClick = (id, name, price, image, description, quantity) => {
    firestore
      .collection("cart")
      .add({
        name,
        image,
        price: parseInt(price),
        description,
        quantity: parseInt(quantity),
        productID: id,
        total: parseInt(price) * parseInt(quantity),
      })
      .then((res) => setQuantity(0));
  };

  const renderProduct = () => (
    <div className="container">
      <h1>{name}</h1>
      <div className="row">
        <div className="col-6">
          <img src={image} alt="" />
        </div>
        <div className={"col-6"}>
          <h1>{name}</h1>
          <p>Price : {price} $ </p>
          <p>{description}</p>
          <br /> <br />
          <label style={{ marginRight: "10px" }} htmlFor="quantity">
            Quantity :
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={handleChangeQuantity}
          />
          <br /> <br />
          <p>Total :{quantity * price}</p>
          <button
            className="btn btn-primary"
            onClick={
              quantity > 0
                ? () =>
                    handleOnClick(id, name, price, image, description, quantity)
                : null
            }
            disabled={quantity > 0 ? false : true}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
  return <>{renderProduct()}</>;
};

export default Product;
