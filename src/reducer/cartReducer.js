const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    const { id, color, amount, product } = action.payload;

    const existingProduct = state.cart.find(
      (curItem) => curItem.id === `${id}-${color}`
    );

    if (existingProduct) {
      const updatedCart = state.cart.map((curElem) =>
        curElem.id === `${id}-${color}`
          ? {
              ...curElem,
              amount: Math.min(curElem.amount + amount, curElem.max),
            }
          : curElem
      );
      return { ...state, cart: updatedCart };
    } else {
      const cartProduct = {
        id: `${id}-${color}`,
        name: product.name,
        color,
        amount,
        image: product.image[0].url,
        price: product.price,
        max: product.stock,
      };

      return { ...state, cart: [...state.cart, cartProduct] };
    }
  }

  if (action.type === "SET_INCREMENT") {
    const updatedCart = state.cart.map((curElem) =>
      curElem.id === action.payload
        ? {
            ...curElem,
            amount: Math.min(curElem.amount + 1, curElem.max),
          }
        : curElem
    );
    return { ...state, cart: updatedCart };
  }

  if (action.type === "SET_DECREMENT") {
    const updatedCart = state.cart.map((curElem) =>
      curElem.id === action.payload
        ? {
            ...curElem,
            amount: Math.max(curElem.amount - 1, 1),
          }
        : curElem
    );
    return { ...state, cart: updatedCart };
  }

  if (action.type === "REMOVE_ITEM") {
    const updatedCart = state.cart.filter(
      (curItem) => curItem.id !== action.payload
    );
    return { ...state, cart: updatedCart };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }

  if (action.type === "CART_ITEM_PRICE_TOTAL") {
    const { total_item, total_price } = state.cart.reduce(
      (accum, curElem) => {
        const { price, amount } = curElem;

        accum.total_item += amount;
        accum.total_price += price * amount;

        return accum;
      },
      { total_item: 0, total_price: 0 }
    );

    return { ...state, total_item, total_price };
  }

  return state;
};

export default cartReducer;
