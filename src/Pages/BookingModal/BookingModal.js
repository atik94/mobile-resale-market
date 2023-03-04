import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider";

const BookingModal = ({ orders, setOrders }) => {
  const { name, resalePrice } = orders;
  const { user } = useContext(AuthContext);
  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const userName = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const location = form.location.value;
    const booking = {
      orders: name,
      buyer: userName,
      email,
      phone,
      location,
      resalePrice,
    };

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setOrders(null);
          toast.success("Booking confirmed successfully");
        }
      });
  };
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="py-4">Resale-price: {resalePrice}TK</p>
          <form onSubmit={handleBooking} className="grid grid-cols-1 gap-3 mt-3">
            <input
              name="name"
              type="text"
              defaultValue={user?.displayName}
              disabled
              placeholder="your name"
              className="input w-full input-bordered"
            />
            <input
              name="email"
              type="email"
              defaultValue={user?.email}
              disabled
              placeholder="your email"
              className="input w-full input-bordered"
            />
            <input name="phone" type="text" placeholder="your phone" className="input w-full input-bordered" />
            <input name="location" type="text" placeholder="your location" className="input w-full input-bordered" />
            <br />
            <input type="submit" value="Submit" className="btn btn-accent w-full input-bordered" />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
