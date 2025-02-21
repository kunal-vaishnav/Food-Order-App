import { Formatting } from "../Formatting.jsx";
export default function Cartitem({
  name,
  quantity,
  price,
  onDecrease,
  onIncrease,
}) {
  //<button onClick={onDecrease}>-</button>
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} X {Formatting.format(price)}
      </p>

      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
        <span>{quantity * price}</span>
      </p>
    </li>
  );
}
