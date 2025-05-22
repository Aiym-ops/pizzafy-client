import { useCart } from "../../context/CartContext";

function ProductItem({ product }) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart(product);
  }

  const totalPrice = product.price; 

  return (
    <div className="product-item">
      <img src={product.image} alt={product.name} className="product-item__img" />
      <h3 className="product-item__title">{product.name}</h3>
      <p className="product-item__description">{product.description}</p>
      <p className="product-item__description">{product.category}</p>
      <div className="product-item__action">
        <div>Итого: {typeof totalPrice === "number" ? totalPrice.toLocaleString() : 0} &#8376;</div>

        <button className="add-button" onClick={handleAddToCart}>
          В корзину
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
