import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation, Navigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51SfcYw5B9xgiyPuiooiE3Dxvt6BqqLYKuaIJd9Rrt5Dsw7vnbMNmrQ2XJGJkjMsdkPfaTgw5fxcOeL402LWdvfl7004QQndAh5"
);

const Payment = () => {
  const location = useLocation();
  const { booking } = location.state || {};

  if (!booking) return <Navigate to="/dashboard/myBookings" replace />;

  const total = booking?.price || 0;
  const price = parseFloat(total.toFixed(2));

  return (
    <div className="w-full">
      <h2 className="text-3xl text-white font-bold mb-8">
        Secure <span className="text-brand-teal">Payment</span>
      </h2>

      <div className="glass-card p-10 rounded-2xl w-full max-w-3xl mx-auto border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <h3 className="text-xl text-gray-300">
            Service:{" "}
            <span className="font-bold text-white text-2xl">
              {booking.serviceName}
            </span>
          </h3>
          <div className="mt-4 p-4 bg-brand-teal/10 rounded-lg inline-block border border-brand-teal/30">
            <p className="text-gray-400 text-sm uppercase tracking-wide">
              Total Amount
            </p>
            <p className="text-4xl font-bold text-brand-teal mt-1">${price}</p>
          </div>
        </div>

        <div className="divider divider-neutral mb-8">Secure Checkout</div>

        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} price={price} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
