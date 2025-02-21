import { useState } from "react";
import { Link } from "react-router-dom";
import pizzasData from "../data/pizzas.json";
import "./Home.css";
import Footer from "../components/Footer/Footer";

export default function Home() {
  const [pizzas] = useState(pizzasData);

  return (
    <div className="home">
      <div className="create-pizza-btn">
        <Link to="/custom-pizza" className="create-pizza-link">
          🍕 Créer ma propre pizza
        </Link>
      </div>

      <div className="pizzas-section">
        <h2 className="section-title">Nos Délicieuses Pizzas 🍕</h2>

        <div className="pizza-cards">
          {pizzas.length === 0 ? (
            <p>Chargement des pizzas...</p>
          ) : (
            pizzas.map((pizza) => (
              <div key={pizza.id} className="pizza-card-container">
                <img
                  src={pizza.image}
                  alt={pizza.name}
                  className="pizza-image"
                />
                <div className="pizza-details">
                  <h3 className="pizza-name">{pizza.name}</h3>
                  <p className="pizza-price">${pizza.price}</p>
                  <Link to={`/pizza/${pizza.id}`} className="pizza-link">
                    Voir plus →
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
