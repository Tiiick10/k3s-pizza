import { useSelector, useDispatch } from "react-redux"
import { addPizza, removePizza } from "../redux/cartslice"
import "./Cart.css"

export default function Cart() {
  const cart = useSelector((state) => state.cart.items)
  const total = useSelector((state) => state.cart.totalPrice)
  const dispatch = useDispatch()

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Mon panier</h2>
      <p className="total">Total: {total.toFixed(2)} € </p>

      {cart.length === 0 ? (
        <p className="cart-empty">Votre panier est vide.</p>
      ) : (
        cart.map((pizza) => (
          <div key={pizza.uniqueKey} className="cart-item">
            <div className="cart-item-details">
              <h3 className="pizza-name">{pizza.name}</h3>
              {pizza.ingredients && (
                <p className="pizza-ingredients">
                  Ingrédients: {pizza.ingredients.join(", ")}
                </p>
              )}
              <p className="pizza-price">
                {pizza.price.toFixed(2)} € x {pizza.quantity} ={" "}
                {(pizza.price * pizza.quantity).toFixed(2)} €
              </p>
            </div>

            {/* Boutons + et - */}
            <div className="cart-quantity-controls">
              <button
                onClick={() => dispatch(removePizza(pizza.uniqueKey))}
                className="quantity-btn"
              >
                ➖
              </button>
              <span className="quantity">{pizza.quantity}</span>
              <button
                onClick={() => dispatch(addPizza(pizza))}
                className="quantity-btn"
              >
                ➕
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
