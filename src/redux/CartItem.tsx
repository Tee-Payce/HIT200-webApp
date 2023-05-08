import { useDispatch } from "react-redux";
import { cartSlice } from "./cartSlice";

interface CartItemProps {
  ticketInfo: string;
  quantity: number;
  user: string;
  price: number;
}

const CartItem = ({ ticketInfo, quantity, user, price }: CartItemProps) => {
  const dispatch = useDispatch();

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
    <div className="border border-gray-200 rounded-md p-4 m-2 flex flex-col justify-center items-center">
      <p>{ticketInfo}</p>
      <p>Quantity: {quantity}</p>
      <p>Price: ${price}</p>
      <button className="btn btn-primary me-2" onClick={handleIncrement}>
        +
      </button>
      <button className="btn btn-primary me-2" onClick={handleDecrement}>
        -
      </button>
    </div>
  );
};

export default CartItem;
