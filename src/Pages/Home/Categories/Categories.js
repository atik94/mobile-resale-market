import React, { useEffect, useState } from "react";
import Category from "./Category";
const Categories = () => {
  const [categoriesOption, setCategoriesOption] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => setCategoriesOption(data));
  }, []);
  return (
    <div className="mt-16">
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {categoriesOption.map((category) => (
          <Category key={category._id} category={category}></Category>
        ))}
      </div>
    </div>
  );
};
export default Categories;
