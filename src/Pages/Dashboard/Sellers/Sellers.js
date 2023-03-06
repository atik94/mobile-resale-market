import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useTitle from "../../../hooks/useTitle";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";

const Sellers = () => {
  useTitle("AllSeller");
  const [sellers, setSellers] = useState([]);
  const [deleteSellers, setDeleteSellers] = useState(null);
  const [deleteSellerLoading, setDeleteSellerLoading] = useState(false);
  const closeModal = () => {
    setDeleteSellers(null);
  };
  useEffect(() => {
    fetch("http://localhost:5000/sellers", {
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setSellers(data));
  }, [deleteSellerLoading]);

  const handleStatusUpdate = (id) => {
    fetch(`http://localhost:5000/sellers/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "Approved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          const remaining = sellers.filter((odr) => odr._id !== id);
          const approving = sellers.find((odr) => odr._id === id);
          approving.status = "Verified";

          const userVerify = [approving, ...remaining];
          return setSellers(userVerify);
        }
      });
  };

  const handleDeleteSellers = (seller) => {
    fetch(`http://localhost:5000/users/${seller._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(`Buyer ${seller.name} deleted successfully`);
          setDeleteSellerLoading(!deleteSellerLoading);
        }
      });
  };
  return (
    <div>
      <h2 className="text-5xl">All Sellers</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Verify</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, i) => (
              <tr key={seller._id}>
                <th>{i + 1}</th>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td>
                  <button onClick={() => handleStatusUpdate(seller._id)} className="btn btn-xs btn-primary">
                    {seller.status ? seller.status : "Unverified"}
                  </button>
                </td>
                <td>
                  <label
                    onClick={() => setDeleteSellers(seller)}
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
      {deleteSellers && (
        <ConfirmationModal
          title={`Are you sure want to delete ?`}
          message={`If you delete ${deleteSellers.name}. It can not be undone.`}
          closeModal={closeModal}
          successAction={handleDeleteSellers}
          modalData={deleteSellers}
          successButtonName="Delete"
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default Sellers;
