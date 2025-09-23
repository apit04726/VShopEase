import React, { createContext, useContext, useReducer, useEffect } from "react";
import cartReducer from "../reducer/cartReducer";

const CartContext = createContext();


const getUserEmail = () => {
  const user = localStorage.getItem("user");
  if (!user) return null;
  try {
    return JSON.parse(user).email;
  } catch {
    return null;
  }
};

const getLocalCartData = () => {
  const email = getUserEmail();
  if (!email) return [];
  const localCartData = localStorage.getItem(`cart_${email}`);
  return localCartData ? JSON.parse(localCartData) : [];
};

const initialState = {
  cart: getLocalCartData(),
  total_item: 0,
  total_price: 0,
  shipping_fee: 50000, // Example shipping fee
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, color, amount, product },
    });
  };

  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };

  const setIncrease = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };


  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    // Do NOT clear localStorage cart here; keep user cart persistent
  };


  useEffect(() => {
    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });
    const email = getUserEmail();
    if (email) {
      localStorage.setItem(`cart_${email}`, JSON.stringify(state.cart));
    }
  }, [state.cart]);

  // Listen for login/logout and update cart accordingly
  useEffect(() => {
    const handleUserChanged = () => {
      const email = getUserEmail();
      if (email) {
        const userCart = localStorage.getItem(`cart_${email}`);
        dispatch({ type: "LOAD_CART", payload: userCart ? JSON.parse(userCart) : [] });
      } else {
        dispatch({ type: "CLEAR_CART" });
      }
    };
    window.addEventListener("userChanged", handleUserChanged);
    return () => window.removeEventListener("userChanged", handleUserChanged);
  }, []);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        setDecrease,
        setIncrease,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
