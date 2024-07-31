import { Product } from "./Product";

const products = [
  {
    id: 1,
    title: "Кокосовая матча",
    image: "images/photo-2.png",
    price: 390,
  },
  {
    id: 2,
    title: "Зеленый индонезийский чай",
    image: "images/photo-1.png",
    price: 340,
  },
  {
    id: 3,
    title: "Черный чай из Эфиопии",
    image: "images/photo.png",
    price: 380,
  },
  {
    id: 4,
    title: "Черный чай из Калифорнии",
    image: "images/photo-5.png",
    price: 360,
  },
  {
    id: 5,
    title: "Органическая веганская матча",
    image: "images/photo-4.png",
    price: 400,
  },
  {
    id: 6,
    title: "Чай черный Лакандона",
    image: "images/photo-3.png",
    price: 390,
  },
];

export const Products = () => (
  <section className="products">
    <div className="container">
      <h2 className="products__title">Чай</h2>
      <ul className="products__list">
        {products.map((item) => (
          <Product key={item.id} data={item} />
        ))}
      </ul>
    </div>
  </section>
);
