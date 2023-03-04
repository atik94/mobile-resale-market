import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const AddProducts = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { user } = useContext(AuthContext);
  const imageHostKey = process.env.REACT_APP_imgbb_key;

  const [categoriesName, setCategoriesName] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => setCategoriesName(data));
  }, []);

  const navigate = useNavigate();
  const handleAddProducts = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          console.log(imgData.data.url);
          const addProducts = {
            category_name: data.category_name,
            name: data.name,
            image: imgData.data.url,
            location: data.location,
            originalPrice: data.originalPrice,
            resalePrice: data.resalePrice,
            yearOfUse: data.yearOfUse,
            sellersName: data.sellersName,
            conditionType: data.conditionType,
            mobileNumber: data.mobileNumber,
            description: data.description,
          };
          fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(addProducts),
          })
            .then((res) => res.json())
            .then((result) => {
              toast.success("products added successfully");
              navigate("/dashboard/myProducts");
            });
        }
      });
  };

  return (
    <div className="w-96 p-7 mx-auto">
      <h2 className="text-5xl">Add a products</h2>
      <form onSubmit={handleSubmit(handleAddProducts)}>
        <div className="form-control w-full max-w-xs">
          <select className="select input-bordered w-full max-w-xs" {...register("category_name", { required: true })}>
            <option value="">Category Select...</option>
            {categoriesName.map((category) => (
              <option value={category.category_name} key={category._id}>
                {category.category_name}
              </option>
            ))}
          </select>

          {/* {errors.category_name && <p className="text-red-700">{errors.category_name?.message}</p>} */}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="file"
            placeholder="image url here"
            {...register("image", { required: true })}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            {...register("location", { required: true })}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Original price</span>
          </label>
          <input
            type="text"
            {...register("originalPrice", { required: true })}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Resale Price</span>
          </label>
          <input
            type="text"
            {...register("resalePrice", { required: true })}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">year of use</span>
          </label>
          <input
            type="text"
            {...register("yearOfUse", { required: true })}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Sellers Name</span>
          </label>
          <input
            type="text"
            readOnly
            defaultValue={user?.displayName}
            {...register("sellersName", { required: true })}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Mobile number</span>
          </label>
          <input
            type="text"
            {...register("mobileNumber", { required: true })}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            type="text"
            {...register("description", { required: true })}
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <select className="select input-bordered w-full max-w-xs" {...register("conditionType", { required: true })}>
          <option value="">Condition Type...</option>
          <option value="goog">good</option>
          <option value="fare">fare</option>
          <option value="excellent">excellent</option>
        </select>
        <input className="btn btn-accent w-full mt-4" value="Add Product" type="submit" />
      </form>
    </div>
  );
};

export default AddProducts;
