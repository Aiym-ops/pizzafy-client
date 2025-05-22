import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; 
import { CART, HOME } from "../utils/const";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { clearCart, totalPrice, cartItems } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Алматы",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name || !formData.phone || !formData.address || !formData.city) {
      alert("Заполните все обязательные поля");
      return;
    }

    if (cartItems.length === 0) {
      alert("Ваша корзина пуста. Нельзя оформить пустой заказ");
      navigate(HOME);
      return;
    }

    setIsSubmitting(true);

    const orderTimestamp = new Date().toISOString();
    const orderData = {
      customer: formData,
      items: cartItems,
      totalPrice: totalPrice,
      orderTimestamp: orderTimestamp,
    };

    try {
      const res = await axios.post('https://595eefa259a34869.mokky.dev/orders', orderData);
      alert(`Ваш заказ принят! Сумма: ${totalPrice.toLocaleString()} тенге, Номер заказа: ${res.data.id}`);
      clearCart();
      navigate(HOME);
    } catch (error) {
      console.error("Ошибка при оформлении заказа:", error);
      alert("Что-то пошло не так");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="block">
      <div className="container">
        <Link to={CART} className="back-btn">Назад</Link>
        <h1 className="title">Оформление заказа</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="name" className="label">Ваше имя</label>
            <input
              value={formData.name}
              onChange={handleInputChange}
              disabled={isSubmitting}
              type="text"
              name="name"
              placeholder="Введите имя"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="phone" className="label">Номер телефона</label>
            <input
              value={formData.phone}
              onChange={handleInputChange}
              disabled={isSubmitting}
              pattern="\+7\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}"
              type="text"
              name="phone"
              placeholder="Введите номер телефона: +7 XXX XXX XX XX"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="address" className="label">Адрес</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              disabled={isSubmitting}
              placeholder="Введите адрес, дом, квартиру, домофон"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="city" className="label">Город</label>
            <select
              name="city"
              id="city"
              value={formData.city}
              onChange={handleInputChange}
              disabled={isSubmitting}
            >
              <option value="Алматы">Алматы</option>
              <option value="Астана">Астана</option>
              <option value="Шымкент">Шымкент</option>
            </select>
          </div>
          <button className="send-btn" disabled={isSubmitting}>
            {isSubmitting ? "Заказ оформляется..." : "Оформить заказ"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Checkout;

