import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import PizzaDetails from "./pages/PizzaDetails"
import Navbar from "./components/NavBar/NavBar"
import Footer from "./components/Footer/Footer"
import CustomPizza from "./pages/CustomPizza"
import Cart from "./pages/Cart"

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pizza/:id" element={<PizzaDetails />} />
            <Route path="/custom-pizza" element={<CustomPizza />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
