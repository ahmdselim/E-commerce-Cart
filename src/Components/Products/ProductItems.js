import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductsItem = () => {
  useFirestoreConnect(["products"]); // sync ecommerceCart collection from Firestore into redux
  const products = useSelector((state) => state.firestore.ordered.products);

  const renderProducts = () =>
    products &&
    products.map((data, key) => (
      <div key={key} className="col-4">
        <Card style={{ width: "18rem", marginBottom: "15px" }}>
          <Card.Img variant="top" src={data.image} />
          <Card.Body>
            <Card.Title>{data.name}</Card.Title>
            <Card.Text>{data.price} $</Card.Text>
            <Link to={`/product/${data.id}`}>
              <Button variant="primary">Details</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    ));

  return <>{renderProducts()}</>;
};

export default ProductsItem;
