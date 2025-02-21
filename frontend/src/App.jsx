import { useEffect } from "react";
import Header from "./Components/Header";
import Availablemeals from "./Components/Availablemeals";
import { CartContextprovider } from "./store/CardContext";
import { Userprogressstatus } from "./store/Userprogress";
import Checkout from "./Components/Checkout";
//import { Userprogressstatus } from "./store/Userprogress";
import Cart from "./Components/Cart";
function App() {
  // useEffect(() => {
  //   fetch("http://localhost:3000/meals")
  //     .then((res) => res.json())
  //     .then(console.log);
  // }, []);

  return (
    <Userprogressstatus>
      <CartContextprovider>
        <Header />
        <Availablemeals />
        <Cart />
        <Checkout />
      </CartContextprovider>
    </Userprogressstatus>
  );
}

export default App;
