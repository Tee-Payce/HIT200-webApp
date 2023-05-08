import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items";

import React, { useState } from "react";

import axios from "axios";
import Sidebar from "./Sidebar";

type CartItemProps = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export function CartItem({ id, name, price, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const [tickets, setTickets] = useState([
    { ticketInfo: "", quantity: 0, user: "" },
  ]);

  const item = storeItems.find((i) => i.id === id);

  function handleRemove() {
    removeFromCart(id);
  }

  // log all data for this cart item
  console.log({ id, name, price, quantity, item });

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <h4 className="text-dark">{name}</h4>
        <p className="text-muted">{formatCurrency(price)}</p>
      </div>
      <div>
        <p className="text-dark">{quantity}</p>
      </div>
      <div>
        <Button variant="outline-danger" onClick={handleRemove}>
          <i className="bi bi-trash"></i>
        </Button>
      </div>
    </div>
  );
}

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/tickets", {
        tickets: [
          {
            ticketInfo: "Rice and Chicken",
            quantity: 2,
            user: "John Doe",
          },
          {
            ticketInfo: "Rice and Beef",
            quantity: 1,
            user: "Jane Smith",
          },
        ],
      });
      console.log(res.data);
      // Handle successful response
    } catch (error) {
      console.error(error);
      // Handle error response
    }
  };
  const { closeCart, cartItems } = useShoppingCart();

  // create an array to store selected meals
  const selectedItems = [];

  // loop through all cart items and store their data in the selectedItems array
  for (let i = 0; i < cartItems.length; i++) {
    const selectedItem = storeItems.find((item) => item.id === cartItems[i].id);
    selectedItems.push(selectedItem);
  }

  console.log(selectedItems, "selected"); // log all selected items

  return (
    <div>
      <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h1 className="text-dark"> Plates</h1>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Sidebar />
          {/* <Stack gap={3}>
            {cartItems.map((item) => {
              const meal = storeItems.find((i) => i.id === item.id);
              console.log(meal);
              return <CartItem key={item.id} {...item} />;
            })}
            <div className="ms-auto fw-bold fs-5 text-dark">
              Total{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = storeItems.find((i) => i.id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </div>
          </Stack> */}
          <div className="text-center"></div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
