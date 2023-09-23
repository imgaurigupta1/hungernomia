import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { loadStripe } from "@stripe/stripe-js";

export default function Cart() {
  let data = useCart();
  // console .log(data);
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3 text-success">
          The Cart is Empty!
        </div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    const orderData = data.map((item) => ({
      id: item.id,
      name: item.name,
      qty: item.qty,
      size: item.size,
      price: item.price,
      img: item.img,
    }));
    let response = await fetch("http://localhost:5000/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: orderData,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    console.log("Order_Response: ", response);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  const makepayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51N94gySA5ZcPgQCJ9sbLoObyKE1kOettGlU1db8OWctrTPnPXQGMCB6MDrMQS0SSfjRWPn1yU7r9Aae6i0GGlVue001t1lsH7o"
    );

    const body = {
      products: data,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:5000/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  const composeFunctions = () => {
    handleCheckOut();
    makepayment();
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <table className="table table-hover ">
          <thead className=" text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td className="text-white">{food.name}</td>
                <td className="text-white">{food.qty}</td>
                <td className="text-white">{food.size}</td>
                <td className="text-white">{food.price}</td>
                <td className="text-white">
                  <button
                    type="button"
                    className="btn p-0 text-white"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2 text-white">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn bg-success mt-5 " onClick={composeFunctions}>
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
