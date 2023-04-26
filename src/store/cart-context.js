import React, {
  useReducer,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { debounce } from "lodash";
import Cart from "../components/Cart/Cart";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";
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
            const updatedAmount =
              parseInt(cartItem.amount) + parseInt(action.value.amount);
            alreadyinCart = true;
            const stock = action.value.stock;
            return {
              item: cartItem.item,
              amount: +updatedAmount,
              stock,
              bad_stock: stock
                ? !["in-stock", "undefined-stock"].includes(stock.status)
                : true,
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
            if (updatedAmount > 0) {
              const stock = action.value.stock;
              return {
                item: cartItem.item,
                amount: updatedAmount,
                stock,
                bad_stock: stock
                  ? !["in-stock", "undefined-stock"].includes(stock.status)
                  : true,
              };
            } else return "removed";
          } else return cartItem;
        })
        .filter((cartItem) => {
          return cartItem !== "removed";
        });
      return updatedState;
    } else if (action.type === "UPDATE_PRICE/DISCOUNT") {
      const updatedState = state.map((cartItem, key, state) => {
        if (cartItem.item.id === action.value.id) {
          const price = action.value.price;
          const discount = action.value.discount;
          const stock = cartItem.stock;
          return {
            item: { ...cartItem.item, price, discount },
            amount: cartItem.amount,
            stock,
            bad_stock: stock
              ? !["in-stock", "undefined-stock"].includes(stock.status)
              : true,
          };
        } else return cartItem;
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
        (total, cartItem) =>
          +total +
          Math.round(
            cartItem.item.price -
              Math.ceil(cartItem.item.price * (cartItem.item.discount / 100))
          ) *
            cartItem.amount,
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
        const cart = JSON.parse(localStorage.getItem("cart"));
        console.log("cartstorage", cart);
        dispatchCartContext({
          type: "FILL",
          value: cart.map((cartItem) => ({ ...cartItem, stock: undefined })),
        });
        cart.map((cartItem) => {
          if (!cartItem.stock || new Date(cartItem.stock.expiry) < new Date()) {
            checkStock("ADD", {
              item: cartItem.item,
              amount: cartItem.amount,
            });
          } else {
            dispatchCartContext({
              type: "ADD",
              value: { ...cartItem, amount: 0 },
            });
          }
        });
      }
    }
  }, [cartContent]);

  const debouncedCheckStock = useDebounce(checkStock);

  // const updateCartHandler = (function () {
  //   let timeoutId;
  //   return (actionType, value) => {
  //     dispatchCartContext({ type: actionType, value: value });
  //     if (actionType === "ADD") {
  //       const cartItem = cartContent.find(
  //         (cartItem) => cartItem.item.id === value.item.id
  //       );
  //       const pre_amount = cartItem ? cartItem.amount : 0;
  //       const amount = pre_amount + value.amount;
  //       checkStock(actionType, {
  //         item: value.item,
  //         amount: amount,
  //       });
  //     } else if (actionType === "IN/DECREASE_AMOUNT") {
  //       const cartItem = cartContent.find(
  //         (cartItem) => cartItem.item.id === value.id
  //       );
  //       const pre_amount = cartItem ? cartItem.amount : 0;
  //       const amount = pre_amount + value.amount;
  //       if (amount > 0) {
  //         clearTimeout(timeoutId);
  //         timeoutId = setTimeout(() => {
  //           checkStock(actionType, {
  //             item: { id: value.id },
  //             amount: amount,
  //           });
  //         }, 3000);
  //       }
  //     }
  //   };
  // })();
  const updateCartHandler = (actionType, value) => {
    dispatchCartContext({ type: actionType, value: value });
    if (actionType === "ADD") {
      const cartItem = cartContent.find(
        (cartItem) => cartItem.item.id === value.item.id
      );
      const pre_amount = cartItem ? cartItem.amount : 0;
      const amount = parseInt(pre_amount) + parseInt(value.amount);
      debouncedCheckStock(actionType, {
        item: value.item,
        amount: amount,
      });
    } else if (actionType === "IN/DECREASE_AMOUNT") {
      const cartItem = cartContent.find(
        (cartItem) => cartItem.item.id === value.id
      );
      const pre_amount = cartItem ? cartItem.amount : 0;
      const amount = parseInt(pre_amount) + parseInt(value.amount);
      if (amount > 0) {
        debouncedCheckStock(actionType, {
          item: { id: value.id },
          amount: amount,
        });
      }
    }
  };

  async function checkStock(actionType, cartItem) {
    console.log("check");
    const response = await axios.get(
      `/api/stock?productId=${cartItem.item.id}&targetQty=${+cartItem.amount}`
    );

    console.log("response", response);

    const stock = await response.data;
    var expiry = new Date();
    // set expiry after 6 hours
    expiry.setTime(expiry.getTime() + 6 * 60 * 60 * 1000);
    stock.expiry = expiry;
    console.log("stock", stock);
    if (actionType === "ADD") {
      dispatchCartContext({
        type: actionType,
        value: { item: cartItem.item, amount: 0, stock },
      });
    } else {
      dispatchCartContext({
        type: actionType,
        value: { id: cartItem.item.id, amount: 0, stock },
      });
    }
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
