import { PaynowPayment } from "paynow-react";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { useTicketPurchased } from "../context/TicketPurchasedContext";
import { formatCurrency } from "../utilities/formatCurrency";

type ItemProps = {
  id: number;
  comboname: string;
  varient: string;
  price: number;
  image: string;
};

export function Item({ id, comboname, varient, price, image }: ItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const { increaseTicketQuantity } = useTicketPurchased();
  const quantity = getItemQuantity(id);

  // paynow modal
  const [isOpen, setIsOpen] = React.useState(true);

  // toggle modal state. Useful for mobile payments
  const onCloseHandler = (data: any) => {
    // Do something with the data and the close the modal
    console.log(data);
    setIsOpen(false);
  };
  return (
    <Card className="card  h-100">
      <Card.Img
        variant="top"
        src={image}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className=" d-flex flex-column  " style={{ fontSize: 15 }}>
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span>{varient}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          <>
            {" "}
            {quantity === 0 ? (
              <>
                <Button
                  onClick={() => increaseCartQuantity(id)}
                  variant="success"
                  size="sm"
                >
                  Add to cart
                </Button>
              </>
            ) : (
              <div
                className="d-flex align-items-center flex-column"
                style={{ gap: ".5rem" }}
              >
                <div className="d-flex w-100 align-items-center justify-content-between">
                  <div className="d-flex align-items-center justify-content-center">
                    <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                    <div>
                      <span className="fs-2 mx-2 ">{quantity}</span>
                    </div>
                    <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                  </div>
                  <Button
                    onClick={() => removeFromCart(id)}
                    variant="danger"
                    size="sm"
                  >
                    {/* delete icon */}
                    <svg
                      style={{
                        color: "white",
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                        fill="white"
                      ></path>{" "}
                      <path
                        fill-rule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        fill="white"
                      ></path>{" "}
                    </svg>
                  </Button>
                </div>
              </div>
            )}
          </>
        </div>
      </Card.Body>
    </Card>
  );
}
