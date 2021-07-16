import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { useFirestore } from "react-redux-firebase";
import CartItem from "../Components/Cart/CartItem";
import { defaultApp } from "../index";

const Cart = () => {
  const firestore = useFirestore();
  useFirestoreConnect(["cart"]); // sync ecommerceCart collection from Firestore into redux
  const cart = useSelector((state) => state.firestore.ordered.cart);
  var cartRef = defaultApp.firestore().collection("cart");

  const addPayed = (
    cartID,
    productID,
    name,
    image,
    price,
    quantity,
    total,
    description
  ) => {
    firestore
      .collection("payed")
      .add({
        name: name.toLocaleString(),
        image: image.toLocaleString(),
        price: parseInt(price),
        description: description.toLocaleString(),
        quantity: parseInt(quantity),
        productID: productID.toLocaleString(),
        cartID: cartID.toLocaleString(),
        total: parseInt(total),
      })
      .then(() =>
        cartRef.onSnapshot((snapshot) => {
          snapshot.docs.forEach((doc) => {
            cartRef.doc(doc.id).delete();
          });
        })
      );
  };
  const totalPrice =
    cart && cart.reduce((total, item) => total + item.quantity * item.price, 0);
  const renderCart = () => (
    <div className="App">
      <div className="container">
        <h2 style={{ marginTop: "10px", marginBottom: "10px" }}>Cart</h2>
        <div className="row">
          {cart &&
            cart.map((data) => (
              <div className="col-4" key={data.id}>
                <CartItem
                  idCart={data.id}
                  name={data.name}
                  price={data.price}
                  image={data.image}
                  description={data.description}
                  quantity={data.quantity}
                />
              </div>
            ))}
        </div>
        <br />
        <h3>Total : {totalPrice}$</h3> <br />
        <button
          className="btn btn-primary btn-block"
          disabled={cart && cart.length > 0 ? false : true}
          onClick={() =>
            addPayed(
              cart && cart.map((item) => item.id.toLocaleString()),
              cart && cart.map((item) => item.productID),
              cart && cart.map((item) => item.name),
              cart && cart.map((item) => item.image),
              cart && cart.map((item) => item.price),
              cart && cart.map((item) => item.quantity),
              cart && cart.map((item) => item.total),
              cart && cart.map((item) => item.description)
            )
          }
        >
          Pay
        </button>
      </div>
    </div>
  );

  return <>{renderCart()}</>;
};

export default Cart;
