import { useSelector, useDispatch } from 'react-redux';
import { removePizza } from '../redux/cartslice';
import './Cart.css'

export default function Cart () {
    const cart = useSelector(state => state.cart.items);
    const total = useSelector(state => state.cart.totalPrice);
    const dispatch = useDispatch();

    return (
        <div className="cart-container">
            <h2 className="cart-title">🛒 Mon panier</h2>

            {cart.length === 0 ? (
                <p className="cart-empty">Votre panier est vide.</p>
            ) : (
                cart.map((pizza) => (
                    <div key={pizza.id} className="cart-item">
                        <div className="cart-item-details">
                            <h3 className="pizza-name">{pizza.name}</h3>
                            {pizza.ingredients && <p className="pizza-ingredients">Ingrédients: {pizza.ingredients.join(", ")}</p>}
                            <p className="pizza-price">${pizza.price.toFixed(2)}</p>
                        </div>
                        <button
                            onClick={() => dispatch(removePizza(pizza.id))}
                            className="remove-btn"
                        >
                            ❌ Retirer
                        </button>
                    </div>
                ))
            )}

            <p className="cart-total">Total: ${total.toFixed(2)}</p>
        </div>
    );
};

