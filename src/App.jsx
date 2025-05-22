import "./assets/css/style.css";
import Header from "./components/Header";
import {Routes, Route,} from "react-router-dom";
import { CART, CHECKOUT, HOME } from "./utils/const";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./context/CartContext";
function App() {
  return (
    <>
      <CartProvider>
      <Header />
     <main>
       <Routes>
         <Route path={HOME} element={<Home />} />
         <Route path={CART} element={<Cart />} />
         <Route path={CHECKOUT} element={<Checkout />} />
      </Routes>
     </main>
      </CartProvider>
    
    </>
  );
}

export default App;
