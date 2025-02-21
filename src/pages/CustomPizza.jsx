import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPizza } from "../redux/cartslice";
import { motion } from "framer-motion";
import './CustomPizza.css'

const ingredientsList = [
  { name: "Fromage", price: 1.5 },
  { name: "Champignons", price: 2 },
  { name: "Jambon", price: 2.5 },
  { name: "Tomates", price: 1 },
  { name: "Olives", price: 1.5 },
  { name: "Ananas 🍍", price: 2 },
];

export default function CustomPizza () {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [basePrice, setBasePrice] = useState(5);
  const dispatch = useDispatch();

  const toggleIngredient = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
      setBasePrice(basePrice - ingredient.price);
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
      setBasePrice(basePrice + ingredient.price);
    }
  };

  const handleAddToCart = () => {
    const newPizza = {
      id: Date.now(),
      name: "Pizza personnalisée",
      ingredients: selectedIngredients.map(i => i.name),
      price: basePrice,
      image: "https://source.unsplash.com/400x300/?pizza",
    };
    dispatch(addPizza(newPizza));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="custom-pizza-container"
    >
      <h2 className="custom-pizza-title">🍕 Compose ta pizza</h2>
      <p className="base-price">Base: $5</p>

      <div className="ingredients-list">
        {ingredientsList.map((ingredient) => (
          <label key={ingredient.name} className="ingredient-item">
            <span>{ingredient.name} (+${ingredient.price})</span>
            <input
              type="checkbox"
              checked={selectedIngredients.includes(ingredient)}
              onChange={() => toggleIngredient(ingredient)}
            />
          </label>
        ))}
      </div>

      <p className="total-price">Prix total: ${basePrice.toFixed(2)}</p>

      <button
        onClick={handleAddToCart}
        className="add-to-cart-btn"
      >
        Ajouter au panier 🛒
      </button>
    </motion.div>
  );
};

