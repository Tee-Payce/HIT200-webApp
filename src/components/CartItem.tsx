import React, { useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import QRCode from "react-qr-code";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const item = storeItems.find((i) => i.id === id);
  if (item === null) return null;
  const [url, setUrl] = React.useState("");

  return (
    <>
      <Stack
        direction="horizontal"
        gap={2}
        className="d-flex align-items-center"
      >
        <img
          src={item?.image}
          style={{ width: "125px", height: "75px", objectFit: "cover" }}
        />
        <div className="me-auto text-dark">
          <div>
            {item?.ticketInfo}{" "}
            {quantity > 1 && (
              <span className="text-muted " style={{ fontSize: ".65rem" }}>
                x{quantity}
              </span>
            )}
          </div>
          <div className="text-muted" style={{ fontSize: ".75rem" }}>
            {formatCurrency(item?.price || 0)}
          </div>
          <div>{formatCurrency((item?.price || 0) * quantity)}</div>
          {/* <Button variant='danger' onClick={handleShow} style={{marginRight:"3px"}}>Generate Ticket</Button> */}
          {/* put a button that acquires the selected tickets */}

          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => removeFromCart(item?.price || 0)}
          >
            &times;
          </Button>
        </div>
      </Stack>
    </>
  );
}
