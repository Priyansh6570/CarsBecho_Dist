import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders, deleteOrder } from "../../actions/orderAction";
import Car from "../Cars/Car";
import Modal from "react-modal";
import { useAlert } from "react-alert";
import NumberWithCommas from "../PriceSeperator";

const formatDateTime = (dateTimeString) => {
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };
  const dateTime = new Date(dateTimeString);
  return dateTime.toLocaleDateString("en-IN", options);
};


const Orders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { orders, loading, error } = useSelector((state) => state.allOrders);
  const { user } = useSelector((state) => state.user);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const openDeleteModal = (order) => {
    setDeleteModalOpen(true);
    setOrderToDelete(order);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setOrderToDelete(null);
  };

  const handleDeleteOrder = () => {
    dispatch(deleteOrder(orderToDelete._id));
    alert.success("Deleted Successfully, Refresh the page to see the changes");
    closeDeleteModal();
  };

  useEffect(() => {
    if (user) {
      dispatch(getAllOrders(user._id));
    }
  }, [dispatch, user]);

  return (
    <div>
      <div className="main w-[70vw] sm:w-full bg-[url('/Images/bg-car-side.jpg')] bg-cover mx-auto m-8 h-[200px] sm:h-[150px] rounded-2xl ">
        <h2 className="text-[30px] xs:top-[0.9rem] xs:text-black sm:top-[1.4rem] sm:left-[-20px] font-sans font-bold relative top-9 pt-8 justify-center flex">
          {orders.length > 0 ? "Orders" : "No Orders"}
        </h2>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {orders &&
            orders.map((order) => (
              <div
                key={order._id}
                className="mb-4 p-2 sm:px-0 sm:py-4 sm:overflow-hidden w-[80vw] sm:border-[2px] sm:border-[#cacaca] sm:w-[98%] mx-auto h-fit border rounded"
              >
                <h2 className="text-lg flex gap-8 justify-between font-bold bg-slate-100 px-4 py-2 rounded text-center mb-2">
                  <span> Order Date & Time:</span>{" "}
                  <span>{formatDateTime(order.createdAt)}</span>
                </h2>
                <div className=" flex flex-row-reverse sm:flex-col-reverse gap-[50px] sm:gap-0 justify-center align-middle">
                  <button
                    className="updateCar w-fit h-fit sm:w-[80%] sm:py-2 sm:self-center ml-auto sm:ml-0 bg-[#002f34] text-white rounded mt-8 font-semibold text-lg py-2 px-4 sm:text-base"
                    onClick={() => openDeleteModal(order)}
                  >
                    Delete Order
                  </button>

                  <div className="bg-slate-100 w-fit min-w-[400px] h-fit self-center rounded p-8">
                    <h3 className="font-bold bg-slate-200 rounded w-full text-center py-2 px-4 text-lg">
                      User Details:
                    </h3>
                    <div className="flex flex-col xs:px-2 gap-4">
                      <div className="flex gap-8 mt-4">
                        <span className="font-bold">Name:</span>
                        <span className="font-medium bg-slate-50 rounded w-fit text-center py-1 px-2 text-base">
                          {order.userOrder.name}
                        </span>
                      </div>
                      {order.offer && typeof order.offer === 'number' && order.offer !== 0 && (
  <div className="flex gap-8 mt-2">
    <span className="font-bold">Offer price:</span>
    <span className="font-medium bg-slate-50 rounded w-fit text-center py-1 px-2 text-base">
      {NumberWithCommas(order.offer)}
    </span>
  </div>
)}

                      <div className="flex gap-8 mt-2">
                        <span className="font-bold">Mobile:</span>
                        <span className="font-medium font-mono  bg-slate-50 rounded w-fit text-center py-1 px-2 text-base">
                          {order.userOrder.mobile}
                        </span>
                      </div>
                      <div className="flex gap-8 mt-2">
                        <span className="font-bold">Address:</span>
                        <span className="font-medium bg-slate-50 rounded w-fit text-center py-1 px-2 text-base">
                          {order.userOrder.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="py-10">
                    <Car car={order.carOrder} />
                  </div>
                </div>
              </div> 
            ))}
        </div>
      )}
      <Modal
        isOpen={deleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Confirmation Modal"
        className="modal absolute bg-white w-[500px] sm:w-[400px] h-fit p-8 justify-center flex flex-col rounded-lg shadow-lg overflow-hidden"
            overlayClassName="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <h2 className="font-bold bg-slate-200 rounded w-full text-center mb-8 py-2 px-4 text-lg">Confirm Deletion</h2>
        <p  className="modal-message text-base text-center mb-8">
          Do you want to delete this Contact Request by{" "}
         <strong>{orderToDelete && orderToDelete.userOrder.name}</strong> ? This action is
          irreversible. Make sure you contact{" "}
          <strong>{orderToDelete && orderToDelete.userOrder.name}</strong> before deleting this
          order.
        </p>
        <div className="modal-buttons self-center flex justify-end">
          <button onClick={closeDeleteModal} className="modal-button bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-4">Cancel</button>
          <button onClick={handleDeleteOrder} className="modal-button bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Delete Order</button>
        </div>
      </Modal>
    </div>
  );
};

export default Orders;
