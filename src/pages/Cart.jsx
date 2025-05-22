import { Link, useNavigate } from "react-router-dom";
import { CHECKOUT, HOME } from "../utils/const";
import { useCart } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    totalPrice,
    removeFromCart, 
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  function handleCheckout() {
    if (cartItems.length === 0) {
      alert("Корзина пуста. Добавьте товары перед оформлением заказа.");
      return;
    }
    navigate(CHECKOUT);
  }

  return (
    <>
      {cartItems.length === 0 ? (
        <section className="block">
          <div className="container">
            <Link to={HOME} className="back-btn">Назад</Link>
            <h1 className="title">Моя корзина</h1>
            <p className="alert-danger">
              Ваша корзина пуста, добавьте товары чтобы получить бонусы
            </p>
          </div>
        </section>
      ) : (
        <section className="block">
          <div className="container">
            <Link to={HOME} className="back-btn">Назад</Link>
            <h1 className="title">Моя корзина</h1>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Наименование продукта</th>
                  <th>Фото</th>
                  <th>Цена</th>
                  <th>Количество</th>
                  <th>Всего</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      <img
                        src={item.image}
                        className="cart-img"
                        alt={item.name}
                      />
                    </td>
                    <td>
                      {typeof item.price === "number"
                        ? item.price.toLocaleString()
                        : 0}{" "}
                      ₸
                    </td>
                    <td>
                      <div className="counter">
                        <button
                          className="circle"
                          onClick={() => decreaseQuantity(item.id)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="circle"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      Итого:{" "}
                      {typeof item.price === "number"
                        ? (item.price * item.quantity).toLocaleString()
                        : 0}{" "}
                      ₸
                    </td>
                    <td>
                      <button
                        onClick={() => removeFromCart(item.id)} 
                        className="delete-btn"
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="total-price">
              Итого:{" "}
              {typeof totalPrice === "number"
                ? totalPrice.toLocaleString()
                : 0}{" "}
              ₸
            </h3>
            <div className="cart-action">
              <button onClick={handleCheckout} className="cart-action__btn">
                Оформление заказа
              </button>
              <Link to={HOME} className="cart-action__btn">
                Продолжить покупку
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Cart;

