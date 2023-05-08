import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
  ticketInfo: string; // added ticketInfo property to CartItem
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number, ticketInfo: string) => number; // added ticketInfo parameter
  increaseCartQuantity: (id: number, ticketInfo: string) => void; // added ticketInfo parameter
  decreaseCartQuantity: (id: number, ticketInfo: string) => void; // added ticketInfo parameter
  removeFromCart: (id: number, ticketInfo: string) => void; // added ticketInfo parameter
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id: number, ticketInfo: string) {
    return (
      cartItems.find((item) => item.id === id && item.ticketInfo === ticketInfo)
        ?.quantity || 0
    );
  }

  function increaseCartQuantity(id: number, ticketInfo: string) {
    setCartItems((currItems) => {
      if (
        currItems.find(
          (item) => item.id === id && item.ticketInfo === ticketInfo
        ) == null
      ) {
        return [...currItems, { id, quantity: 1, ticketInfo }];
      } else {
        return currItems.map((item) => {
          if (item.id === id && item.ticketInfo === ticketInfo) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number, ticketInfo: string) {
    setCartItems((currItems) => {
      if (
        currItems.find(
          (item) => item.id === id && item.ticketInfo === ticketInfo
        )?.quantity === 1
      ) {
        return currItems.filter(
          (item) => item.id !== id || item.ticketInfo !== ticketInfo
        );
      } else {
        return currItems.map((item) => {
          if (item.id === id && item.ticketInfo === ticketInfo) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number, ticketInfo: string) {
    setCartItems((currItems) => {
      return currItems.filter(
        (item) => item.id !== id || item.ticketInfo !== ticketInfo
      );
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
