import { createContext, useState } from "react";
const Userprogress = createContext({
  status: "",
  showcart: () => {},
  hidecart: () => {},
  showcheckout: () => {},
  hidecheckout: () => {},
});
export function Userprogressstatus({ children }) {
  const [status, setstatus] = useState("");
  function showcart() {
    setstatus("Cart");
  }
  function hidecart() {
    setstatus("");
  }
  function showcheckout() {
    setstatus("Checkout");
  }
  function hidecheckout() {
    setstatus("");
  }

  const userprogress = {
    status: status,
    showcart,
    hidecart,
    showcheckout,
    hidecheckout,
  };
  return (
    <Userprogress.Provider value={userprogress}>
      {children}
    </Userprogress.Provider>
  );
}
export default Userprogress;
