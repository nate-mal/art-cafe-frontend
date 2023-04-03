import * as React from "react";
import Checkout, {
  EmptyCartMessageComponent,
} from "../../src/components/CheckoutPage/Checkout/Checkout";
import Grid from "@mui/material/Grid";
import CartContext from "../../src/store/cart-context";
import { minOrder } from "../../lib/settings";
export default function CheckoutPage() {
  const ctxCart = React.useContext(CartContext);
  const [empty, setEmpty] = React.useState(false);
  const [order, setOrder] = React.useState({});

  const isMounted = React.useRef(false);

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //   } else {
  //     isMounted.current = true;
  //   }
  // }, []);

  return (
    <Grid
      container
      sx={{ minHeight: "80vh" }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        {(ctxCart.cartCost < minOrder &&
          Object.keys(order).length === 0 &&
          order.constructor === Object) ||
        (empty &&
          Object.keys(order).length === 0 &&
          order.constructor === Object) ? (
          <EmptyCartMessageComponent />
        ) : (
          <Checkout
            order={order}
            setOrder={setOrder}
            onError={() => setEmpty(true)}
          />
        )}
      </Grid>
    </Grid>
  );
}
