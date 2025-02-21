import { Formatting } from "../Formatting.jsx";
import { useContext } from "react";
import { useActionState } from "react";
import Cartcontext from "../store/CardContext.jsx";
import Userprogress from "../store/Userprogress.jsx";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import Modal from "./Modal.jsx";
import Usehttp from "./Usehttp.jsx";
import Error from "./Error.jsx";

const config = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
export default function Checkout() {
  const cartctx = useContext(Cartcontext);
  const userctx = useContext(Userprogress);
  const total = cartctx.items.reduce((totalitem, item) => {
    return totalitem + item.price * item.quantity;
  }, 0);

  function handleclosecheckout() {
    userctx.hidecheckout();
  }
  function handlefinish() {
    userctx.hidecheckout();
    cartctx.clearcart();
    cleardata();
  }
  const { data, loading, error, Request, cleardata } = Usehttp(
    "http://localhost:3000/orders",
    config
  );
  // function handlesubmit(event) {

  //   event.preventDefault();
  //   const fd = new FormData(event.target);
  async function checkoutaction(prevState, fd) {
    const Customerdata = Object.fromEntries(fd.entries());
    if (!Customerdata.name || Customerdata.name.length < 3) {
      alert("Full Name must be at least 3 characters long.");
      return;
    }
    if (!Customerdata.email || !/\S+@\S+\.\S+/.test(Customerdata.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!Customerdata.street) {
      alert("Street is required.");
      return;
    }
    if (
      !Customerdata["postal-code"] ||
      !/^\d{6}$/.test(Customerdata["postal-code"])
    ) {
      alert("Postal Code must be exactly 6 digits.");
      return;
    }
    if (!Customerdata.city) {
      alert("City is required.");
      return;
    }
    console.log(Customerdata);
    // fetch("http://localhost:3000/orders", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     order: {
    //       items: cartctx.items,
    //       customer: Customerdata,
    //     },
    //   }),
    //});
    await Request(
      JSON.stringify({
        order: {
          items: cartctx.items,
          customer: Customerdata,
        },
      })
    );
  }
  const [formState, formAction, pending] = useActionState(checkoutaction, null);
  let actions = (
    <>
      <Button type="button" textonly onClick={handleclosecheckout}>
        Close
      </Button>
      <Button textonly type="submit">
        Submit Data
      </Button>
    </>
  );
  if (pending) {
    actions = <span>sending order data</span>;
  }
  if (data && !error) {
    return (
      <Modal open={userctx.status === "Checkout"} onClose={handleclosecheckout}>
        <h1>Success</h1>
        <p>Your order was succesfully submitted</p>
        <p>We will contact you within few minutes</p>
        <p className="modal-actions">
          <button onClick={handlefinish}>okay</button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal open={userctx.status === "Checkout"} onClose={handleclosecheckout}>
      {/* <form onSubmit={handlesubmit}> */}
      <form action={formAction}>
        <h2>Your Price</h2>
        <p>{Formatting.format(total)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="failed to submit order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
