import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import './PizzaCard.css'

export default function PizzaCard ({ pizza }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="pizza-card"
    >
      <img src={pizza.image} alt={pizza.name} className="pizza-image"/>
      <h3 className="pizza-name">{pizza.name}</h3>
      <p className="pizza-price">${pizza.price}</p>
      <Link to={`/pizza/${pizza.id}`} className="pizza-link">
        Voir plus →
      </Link>
    </motion.div>
  );
};

