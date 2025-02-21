import { createContext, useReducer } from "react";
const CartContext = createContext({
  items: [],
  additem: (item) => {},
  removeitem: (id) => {},
  clearcart: () => {},
});
function CartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updateitems = [...state.items];
    const existingindex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    if (existingindex > -1) {
      const updateitem = {
        ...state.items[existingindex],
        quantity: state.items[existingindex].quantity + 1,
      };
      updateitems[existingindex] = updateitem;
    } else {
      updateitems.push({ ...action.item, quantity: 1 });
    }
    return { items: updateitems };
  }
  if (action.type === "REMOVE_ITEM") {
    const updateditems = [...state.items];
    const existingindex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingcart = state.items[existingindex];
    if (existingcart.quantity === 1) {
      updateditems.splice(existingindex, 1);
    } else {
      const updateditem = {
        ...existingcart,
        quantity: existingcart.quantity - 1,
      };
      updateditems[existingindex] = updateditem;
    }
    return {
      items: updateditems,
    };
  }
  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }
  return state;
}
export function CartContextprovider({ children }) {
  const [shoopingcart, setshoppingcart] = useReducer(CartReducer, {
    items: [],
  });

  function additem(item) {
    setshoppingcart({
      type: "ADD_ITEM",
      item: item,
    });
  }
  function removeitem(id) {
    setshoppingcart({
      type: "REMOVE_ITEM",
      id: id,
    });
  }
  function clearcart() {
    setshoppingcart({
      type: "CLEAR_CART",
    });
  }
  const cartcontext = {
    items: shoopingcart.items,
    additem,
    removeitem,
    clearcart,
  };
  console.log(cartcontext);
  return (
    <CartContext.Provider value={cartcontext}>{children}</CartContext.Provider>
  );
}
export default CartContext;
