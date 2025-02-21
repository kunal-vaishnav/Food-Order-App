import { useContext } from "react";
import CartContext from "../store/CardContext";
import Modal from "./Modal.jsx";
import { Formatting } from "../Formatting.jsx";
import Button from "./Button.jsx";
import Userprogress from "../store/Userprogress.jsx";
import Cartitem from "./Cartitem.jsx";
import Checkout from "./Checkout.jsx";
export default function Cart() {
  const cartctx = useContext(CartContext);
  const userctx = useContext(Userprogress);
  const totalprice = cartctx.items.reduce((totalitem, item) => {
    return totalitem + item.quantity * item.price;
  }, 0);
  function handlehidecart() {
    userctx.hidecart();
  }
  function handlecheckout() {
    userctx.showcheckout();
  }
  return (
    <Modal
      className="cart"
      open={userctx.status === "Cart"}
      onClose={userctx.status === "Cart" ? handlehidecart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartctx.items.map((item) => (
          <Cartitem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onIncrease={() => cartctx.additem(item)}
            onDecrease={() => cartctx.removeitem(item.id)}
          />
        ))}
        <p className="cart-total">{Formatting.format(totalprice)}</p>
        <p className="modal-actions">
          <Button textonly onClick={handlehidecart}>
            Close
          </Button>
          {cartctx.items.length > 0 && (
            <Button onClick={handlecheckout}>Checkout Items</Button>
          )}
        </p>
      </ul>
    </Modal>
  );
}
