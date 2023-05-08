import axios from "axios";
import { Key, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { cartSlice } from "./cartSlice";

const Sidebar = () => {
  const dispatch = useDispatch();

  const itemsInCart = useSelector((state: RootState) => state.cart.items);

  const handleClearCart = () => {
    dispatch(cartSlice.actions.clearCart());
  };
  console.log(itemsInCart, "itemsInCart");

  const [tickets, setTickets] = useState([
    { ticketInfo: "", quantity: 0, user: "" },
  ]);

  const showbutton = itemsInCart.length > 0;

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/tickets", {
        tickets: itemsInCart,
      });
      console.log(res.data);
      alert("Tickets have been added. Please proceed to pay.");
      // Handle successful response
    } catch (error) {
      console.error(error);
      // Handle error response
    }
  };

  return (
    <div>
      {itemsInCart.map((item: { ticketInfo: Key | null | undefined; price: number; quantity: number; user: string; }) => (
        <CartItem
          key={item.ticketInfo}
          ticketInfo={item.ticketInfo}
          price={item.price}
          quantity={item.quantity}
          user={item.user}
        />
      ))}
      {showbutton && (
        <div className="d-flex align-content-center ">
          <button className="btn me-2 mb-2 btn-primary" onClick={handleSubmit}>
            Proceed
          </button>
          <button
            className="btn btn-danger mb-2 me-2"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
          <h4>
            Total: $
            {itemsInCart.reduce(
              (acc: number, item: { price: number; quantity: number; }) => acc + item.price * item.quantity,
              0
            )}
          </h4>
        </div>
      )}
      {showbutton && (
        <Button className="w-100">
          <a
            href="https://www.paynow.co.zw/Payment/Link/?q=c2VhcmNoPXJ5YW50amVuYSU0MGdtYWlsLmNvbSZhbW91bnQ9MTIuMDAmcmVmZXJlbmNlPSZsPTA%3d"
            target="_blank"
          >
            <img src="https://www.paynow.co.zw/Content/Buttons/Medium_buttons/button_pay-now_medium.png" />
          </a>
        </Button>
      )}
    </div>
  );
};

export default Sidebar;
