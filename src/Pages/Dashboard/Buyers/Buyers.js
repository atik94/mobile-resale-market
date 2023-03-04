import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";

const Buyers = () => {
  const [deleteBuyers, setDeleteBuyers] = useState(null);
  const closeModal = () => {
    setDeleteBuyers(null);
  };

  const { data: buyers = [], refetch } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/buyers");
      const data = await res.json();
      return data;
    },
  });

  const handleDeleteBuyers = (buyer) => {
    console.log(buyer);
    fetch(`http://localhost:5000/users/${buyer._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Buyer ${buyer.name} deleted successfully`);
        }
      });
  };
  return (
    <div>
      <h2 className="text-5xl">All Buyers</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer, i) => (
              <tr key={buyer._id}>
                <th>{i + 1}</th>
                <td>{buyer.name}</td>
                <td>{buyer.email}</td>
                <td>
                  <label onClick={() => setDeleteBuyers(buyer)} htmlFor="confirmation-modal" className="btn btn-error">
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deleteBuyers && (
        <ConfirmationModal
          title={`Are you sure want to delete ?`}
          message={`If you delete ${deleteBuyers.name}. It can not be undone.`}
          closeModal={closeModal}
          successAction={handleDeleteBuyers}
          modalData={deleteBuyers}
          successButtonName="Delete"
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default Buyers;
