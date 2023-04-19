import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import storeItems from "../data/items.json";
import QRCode from "react-qr-code";
import { Item } from "./Item";
import React from "react";
type ShoppingCartProps = {
  isOpen: boolean;
};
export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();

  return (
    <div>
      <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h1 className="text-dark"> Plates</h1>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <div className="ms-auto fw-bold fs-5 text-dark">
              Total{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = storeItems.find((i) => i.id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </div>
          </Stack>
          <Button className="w-100">
            <a
              href="https://www.paynow.co.zw/Payment/Link/?q=c2VhcmNoPXJ5YW50amVuYSU0MGdtYWlsLmNvbSZhbW91bnQ9MTIuMDAmcmVmZXJlbmNlPSZsPTA%3d"
              target="_blank"
            >
              <img src="https://www.paynow.co.zw/Content/Buttons/Medium_buttons/button_pay-now_medium.png" />
            </a>
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
