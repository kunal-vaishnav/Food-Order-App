import logoimg from "../assets/logo.jpg";
import Button from "./Button.jsx";
import { useContext } from "react";
import CartContext from "../store/CardContext.jsx";
import Userprogress from "../store/Userprogress.jsx";
export default function Header() {
  const cartctx = useContext(CartContext);
  const userctx = useContext(Userprogress);
  const total = cartctx.items.reduce((totalitem, item) => {
    return totalitem + item.quantity;
  }, 0);
  function handleshowcart() {
    userctx.showcart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoimg} alt="foodimage" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textonly onClick={handleshowcart}>
          Cart({total})
        </Button>
      </nav>
    </header>
  );
}
