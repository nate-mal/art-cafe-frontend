import React, {
  useReducer,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import Cart from "../components/Cart/Cart";
import axios from "axios";
const CartContext = React.createContext([
  {
    item: {
      id: "m2",
      name: "Schnitzel",
      description: "A german specialty!",
      price: 16.5,
    },
    amount: 1,
  },
]);

export const CartContextProvider = (props) => {
  const isMounted = useRef(false);
  const reducer = (state, action) => {
    if (action.type === "ADD") {
      console.log("action", action);
      let alreadyinCart = false;
      let updatedState;
      if (state.length > 0) {
        updatedState = state.map((cartItem) => {
          if (cartItem.item.id === action.value.item.id) {
            const updatedAmount = cartItem.amount + action.value.amount;
            alreadyinCart = true;

            if (!action.checkStock) {
              checkStock({
                item: cartItem.item,
                amount: updatedAmount,
                stock: cartItem.stock,
              });
            }
            return {
              item: cartItem.item,
              amount: updatedAmount,
              stock: action.value.stock,
            };
          } else return cartItem;
        });
      }
      if (alreadyinCart) return updatedState;
      else return [...state, action.value];
    } else if (action.type === "IN/DECREASE_AMOUNT") {
      const updatedState = state
        .map((cartItem, key, state) => {
          if (cartItem.item.id === action.value.id) {
            const updatedAmount = cartItem.amount + action.value.amount;
            if (updatedAmount > 0)
              return { item: cartItem.item, amount: updatedAmount };
            else return "removed";
          } else return cartItem;
        })
        .filter((cartItem) => {
          return cartItem !== "removed";
        });
      return updatedState;
    } else if (action.type === "REMOVE") {
      return state.filter((cartItem) => {
        return cartItem.item.id !== action.value.id;
      });
    } else if (action.type === "CLEAN") {
      return [];
    } else if (action.type === "FILL") {
      const cart =
        Array.isArray(action.value) && action.value.length > 0
          ? action.value
          : [];
      return cart;
    }
  };

  const [cartContent, dispatchCartContext] = useReducer(reducer, []);
  const [showCart, setShowCart] = useState(false);

  function showCartHandler() {
    setShowCart((prevState) => !prevState);
  }
  function openCartHandler() {
    setShowCart(true);
  }

  const getCartSize = useCallback(() => {
    const temp = cartContent;
    return temp.reduce((total, cartItem) => +total + cartItem.amount, 0);
  }, [cartContent]);
  const getCartCost = useCallback(() => {
    const temp = cartContent;
    if (cartContent) {
      return temp.reduce(
        (total, cartItem) => +total + cartItem.item.price * cartItem.amount,
        0
      );
    }
  }, [cartContent]);
  const [cartSize, setCartSize] = useState(getCartSize);
  const [cartCost, setCartCost] = useState(getCartCost);
  useEffect(() => {
    setCartSize(getCartSize());
  }, [setCartSize, getCartSize]);
  useEffect(() => {
    setCartCost(getCartCost());
  }, [setCartCost, getCartCost]);

  // useEffect(() => {
  // if (isMounted.current) {
  //   localStorage.setItem("cart", JSON.stringify(cartContent));
  // } else {
  //   isMounted.current = true;
  // }
  // // }, [cartSize]);

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("cart", JSON.stringify(cartContent));
    } else {
      isMounted.current = true;
      if (localStorage.getItem("cart")) {
        console.log("cartstorage", JSON.parse(localStorage.getItem("cart")));
        dispatchCartContext({
          type: "FILL",
          value: JSON.parse(localStorage.getItem("cart")),
        });
      }
    }
  }, [cartSize]);

  const updateCartHandler = (actionType, value) => {
    dispatchCartContext({ type: actionType, value: value });
  };

  async function checkStock(cartItem) {
    console.log("check");
    const response = await axios.get(
      `/api/stock?productId=${cartItem.item.id}&targetQty=${+cartItem.amount}`
    );

    console.log("response", response);

    const stock = await response.data;
    console.log("stock", stock);
    dispatchCartContext({
      type: "ADD",
      checkStock: true,
      value: { item: cartItem.item, amount: 0, stock },
    });
    return response.data;
  }

  const [updateMeals, setUpdateMeals] = useState(undefined);
  const [isLoading, setLoading] = useState(false);

  console.log(cartContent);
  return (
    <CartContext.Provider
      value={{
        cartContent: cartContent,
        updateCart: updateCartHandler,
        cartSize: cartSize,
        showCart: { function: showCartHandler, value: showCart },
        onShowCart: openCartHandler,
        cartCost,
        updateMeals,
        setUpdateMeals,
        isLoading,
        setLoading,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
