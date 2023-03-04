import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import BookingModal from "../../BookingModal/BookingModal";
import CategorySingleProduct from "./CategorySingleProduct";
const CategoryProducts = () => {
  const { category_name } = useLoaderData();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:5000/products?category_name=${category_name}`)
      .then((res) => res.json())
      .then((data) => setCategoryProducts(data));
  }, [category_name]);
  return (
    <section>
      <div className="grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {categoryProducts.map((singleProduct) => (
          <CategorySingleProduct
            key={singleProduct._id}
            singleProduct={singleProduct}
            setOrders={setOrders}
          ></CategorySingleProduct>
        ))}
      </div>
      {orders && <BookingModal orders={orders} setOrders={setOrders}></BookingModal>}
    </section>
  );
};

export default CategoryProducts;
