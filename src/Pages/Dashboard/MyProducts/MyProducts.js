import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import useTitle from "../../../hooks/useTitle";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import Loading from "../../Shared/Loading/Loading";
const MyProducts = () => {
  useTitle("My-products");
  const [deleteProducts, setDeleteProducts] = useState(null);
  const closeModal = () => {
    setDeleteProducts(null);
  };
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:5000/products");
        const data = await res.json();
        return data;
      } catch (error) {}
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleDeleteProducts = (product) => {
    fetch(`http://localhost:5000/products/${product._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Product ${product.name} deleted successfully`);
        }
      });
  };
  return (
    <div>
      <h2 className="text-3xl">Manage Products</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>SL</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Condition</th>
              <th>SellersName</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={product._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={product.image} alt="" />
                    </div>
                  </div>
                </td>
                <td>{product.name}</td>
                <td>{product.category_name}</td>
                <td>{product.resalePrice}</td>
                <td>{product.conditionType}</td>
                <td>{product.sellersName}</td>
                <td>
                  <label
                    onClick={() => setDeleteProducts(product)}
                    htmlFor="confirmation-modal"
                    className="btn btn-error"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deleteProducts && (
        <ConfirmationModal
          title={`Are you sure want to delete ?`}
          message={`If you delete ${deleteProducts.name}. It can not be undone.`}
          closeModal={closeModal}
          successAction={handleDeleteProducts}
          modalData={deleteProducts}
          successButtonName="Delete"
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default MyProducts;
