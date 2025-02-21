import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPizza } from "../redux/cartslice";
import { motion } from "framer-motion";
import './PizzaDetails.css'

export default function PizzaDetails () {

  const { id } = useParams();
  const pizza = useSelector(state =>
    state.pizza.list.find(p => p.id === Number(id))
  );
  const dispatch = useDispatch();

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
      <p className="pizza-price">Prix: ${pizza.price}</p>
      <button
        onClick={() => dispatch(addPizza(pizza))}
        className="add-to-cart-btn"
      >
        Ajouter au panier 🛒
      </button>
    </motion.div>
  );
};

