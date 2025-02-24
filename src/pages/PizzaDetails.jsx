import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addPizza } from "../redux/cartslice"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import "./PizzaDetails.css"

export default function PizzaDetails() {
  const { id } = useParams()
  const pizza = useSelector((state) =>
    state.pizza.list.find((p) => p.id === Number(id))
  )
  const dispatch = useDispatch()

  const [quantity, setQuantity] = useState(1)
  const [selectedIngredients, setSelectedIngredients] = useState([...pizza.ingredients])
  const [removedIngredients, setRemovedIngredients] = useState([])

  const ingredientsList = [
    { name: "Fromage", price: 1.5 },
    { name: "Champignons", price: 2 },
    { name: "Jambon", price: 2.5 },
    { name: "Tomates", price: 1 },
    { name: "Olives", price: 1.5 },
    { name: "Ananas", price: 2000 },
  ]

  const calculatePrice = () => {
    const extraPrice = selectedIngredients.reduce((total, ingredient) => {
      const foundIngredient = ingredientsList.find((i) => i.name === ingredient)
      return total + (foundIngredient ? foundIngredient.price : 0)
    }, 0)
    return pizza.price + extraPrice
  }

  // Générer une clé unique pour différencier les variantes de pizza

  const uniquePizzaKey = () => {
    const sortedIngredients = [...selectedIngredients].sort()
    return `${pizza.name}-${sortedIngredients.join("-")}`
  }

  // Ajout au panier + Reset des ingrédients

  const handleAddToCart = () => {
    const pizzaWithQuantity = {
      ...pizza,
      quantity,
      ingredients: selectedIngredients,
      price: calculatePrice() * quantity,
      uniqueKey: uniquePizzaKey(),
    }

    dispatch(addPizza(pizzaWithQuantity))
    resetPizzaConfig() // Reset après ajout au panier
  }

  // Reset des ingrédients et de la quantité

  const resetPizzaConfig = () => {
    setQuantity(1)
    setSelectedIngredients([...pizza.ingredients])
    setRemovedIngredients([])
  }

  const toggleIngredient = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter((i) => i !== ingredient))
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient])
    }
  }

  const handleQuantityChange = (newQuantity) => {
    setQuantity(Math.max(1, newQuantity))
  }

  const removeBaseIngredient = (ingredient) => {
    setRemovedIngredients([...removedIngredients, ingredient])
    setSelectedIngredients(selectedIngredients.filter((i) => i !== ingredient))
  }

  useEffect(() => {
    calculatePrice()
  }, [selectedIngredients, quantity])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="pizza-details-container"
    >
      <motion.img
        src={pizza.image}
        alt={pizza.name}
        className="pizza-image"
        whileHover={{ scale: 1.1 }}
      />
      <h1 className="pizza-name">{pizza.name}</h1>

      <p className="pizza-price">Prix: {calculatePrice() * quantity} € </p>

      {/* Sélecteur de quantité */}

      <div className="quantity-selector">
        <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
      </div>

      <div className="ingredients-container">

        {/* Ingrédients supplémentaires */}
        
        <div className="ingredients-extra">
          <h3>Ingrédients supplémentaires :</h3>
          {ingredientsList.map((ingredient) => (
            <label key={ingredient.name} className="ingredient-item">
              <span>{ingredient.name} ( + {ingredient.price} € )</span>
              <input
                type="checkbox"
                checked={selectedIngredients.includes(ingredient.name)}
                onChange={() => toggleIngredient(ingredient.name)}
              />
            </label>
          ))}
        </div>

        {/* Ingrédients de base */}
        
        <div className="ingredients-base">
          <h3>Ingrédients de la pizza de base :</h3>
          {pizza.ingredients.map((baseIngredient) => (
            <div
              key={baseIngredient}
              className={`ingredient-item ${removedIngredients.includes(baseIngredient) ? "removed" : ""}`}
            >
              <span>{baseIngredient}</span>
              <button onClick={() => removeBaseIngredient(baseIngredient)}>Retirer</button>
            </div>
          ))}
        </div>

      </div>

      <button onClick={handleAddToCart} className="add-to-cart-btn">
        Ajouter au panier 🛒
      </button>
      
    </motion.div>
  )
}
