import React, { useEffect, useState } from "react";

const Sellers = () => {
  const [sellers, setSellers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/sellers")
      .then((res) => res.json())
      .then((data) => setSellers(data));
  }, []);

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
              <th>Delete</th>
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
                  <button className="btn btn-xs btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sellers;
