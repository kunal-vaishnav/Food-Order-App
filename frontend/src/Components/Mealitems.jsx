import { Formatting } from "../Formatting.jsx";
import Button from "./Button.jsx";
import { useContext } from "react";
import CartContext from "../store/CardContext.jsx";
import { API_END_POINT } from "../../constant.js";

export default function Mealitems({ foods }) {
  const cartctx = useContext(CartContext);
  function adding(food) {
    cartctx.additem(food);
  }
  // `http://localhost:3000/${food.image}`;

  return (
    <ul id="meals">
      {foods.map((food) => (
        <li className="meal-item" key={food.id}>
          <article>
            <img src={API_END_POINT+`${food.image}`} alt={food.name} />
            <div>
              <h2>{food.name}</h2>
              <p className="meal-item-price">{Formatting.format(food.price)}</p>
              <p className="meal-item-description">{food.description}</p>
            </div>
            <p className="meal-item-actions">
              <Button onClick={() => adding(food)}>Add to Cart</Button>
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}
