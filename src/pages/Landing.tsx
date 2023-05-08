import { Card, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { cartSlice } from "../redux/cartSlice";
import items from "../data/items";
import { useState } from "react";

const LandingPage = () => {
  const [addedToCart, setAddedToCart] = useState([]);

  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(
      cartSlice.actions.addItem({
        ticketInfo: item.name,
        quantity: 1,
        user: "current user", // replace with user information
        price: item.price,
      })
    );
    setAddedToCart((prev) => [...prev, item.id]);
    alert("Added to cart!");
  };
  // show plus and minus buttons once user clicks add to cart

  const handleIncrement = () => {
    dispatch(
      cartSlice.actions.updateQuantity({ ticketInfo, quantity: quantity + 1 })
    );
  };
  const handleDecrement = () => {
    dispatch(
      cartSlice.actions.updateQuantity({ ticketInfo, quantity: quantity - 1 })
    );
  };

  return (
    <div>
      <Row md={2} xs={1} lg={3} className="g-3">
        {items.map((item) => (
          <Col key={item.id}>
            <Card className="card  h-100">
              <Card.Img
                variant="top"
                src={item.image}
                height="200px"
                style={{ objectFit: "cover" }}
              />
              <h5 className="card-title mt-1">{item.name}</h5>

              <p>Price: ${item.price}</p>
              <div>
                <button
                  className="btn btn-primary me-2 mb-2 w-auto"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default LandingPage;
