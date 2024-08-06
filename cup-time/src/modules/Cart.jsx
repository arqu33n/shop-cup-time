import { useState } from "react";
import Modal from "react-modal";
import { API_URL } from "../const";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { CartItem } from "./CartItem";
import { SkeletonLoader } from "./SkeletonLoader";

Modal.setAppElement("#root");

export const Cart = () => {
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { cart, clearCart } = useCart();
  const { orderDetails, clearOrderDetails } = useOrder();

  const handleSumbit = async () => {
    const orderData = {
      ...orderDetails,
      items: cart.map((item) => ({ id: item.id, quantity: item.quantity })),
    };
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        throw new Error("Ошибка при отправке заказа");
      }
      const result = await response.json();
      setOrderStatus("success");
      setOrderId(result.order.id);
      clearCart();
      clearOrderDetails();
    } catch (error) {
      setOrderStatus("error");
      console.log(`Ошибка:${error}`);
    } finally {
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const totalPrice = cart
    ? cart.reduce((acc, item) => item.quantity * item.price + acc, 0)
    : 0;
  return (
    <section className="cart">
      <div className="container cart__container">
        <h2 className="cart__title">
          Корзина (
          {cart ? cart.reduce((acc, item) => item.quantity + acc, 0) : 0})
        </h2>
        <ul className="cart__items">
          {cart ? (
            cart.map((item) => <CartItem key={item.id} data={item} />)
          ) : (
            <SkeletonLoader />
          )}
        </ul>
        <div className="cart__summary">
          <h3 className="cart__summary-title">Итого:</h3>
          <p className="cart__total">{totalPrice}&nbsp;₽</p>
          <button className="cart__order-button" onClick={handleSumbit}>
            Заказать
          </button>
        </div>
      </div>
      <Modal
        className="modal-cart"
        overlayClassName="modal-cart__overlay"
        onRequestClose={closeModal}
        isOpen={modalIsOpen}
      >
        <h2 className="modal-cart__title">
          {orderStatus === "success"
            ? `Заказ успешно отправлен! Номер вашего заказа: ${orderId}`
            : `Произошла ошибка при отправке заказа`}
        </h2>
        <button className="modal-cart__button" onClick={closeModal}>
          Закрыть
        </button>
      </Modal>
    </section>
  );
};
