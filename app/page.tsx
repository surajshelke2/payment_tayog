"use client";
import Script from "next/script";
import { useState } from "react";

export default function Home() {
  const [amount, setAmount] = useState<number>(0);

  const createOrder = async () => {
    try {
      // Create order on the backend
      const res = await fetch("/api/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to smallest currency unit
          currency: "INR",
          receipt: "receipt#1",
          notes: {},
          userId: "Ucm41hfzew0000izfshnlago2i", // Replace with dynamic user ID
          mentorId: "cm41hjyh10007izfsftsw1zjn", // Replace with dynamic mentor ID
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create order");
      }

      const order = await res.json();
      console.log("Order created successfully:", order);

      // Prepare Razorpay payment options
      const paymentData = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        name: "Tayog",
        description: "Test Transaction",
        callback_url: "http://localhost:3000/payment-success", // Adjust URL
        prefill: {
          name: "Suraj", // Replace dynamically
          email: "sueaj.email@example.com", // Replace dynamically
          contact: "9999999999", // Replace dynamically
        },
        theme: {
          color: "#F37254",
        },
        handler: async function (response: any) {
          // Handle payment verification
          try {
            const verifyRes = await fetch("/api/verifyOrder", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            if (!verifyRes.ok) {
              throw new Error("Payment verification failed");
            }

            const data = await verifyRes.json();
            console.log("Verification response:", data);

            if (data.isOk) {
              alert("Payment successful");
            } else {
              alert("Payment failed");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            alert("Payment verification error. Please try again.");
          }
        },
      };

      // Open Razorpay Checkout
      const payment = new (window as any).Razorpay(paymentData);
      payment.open();
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error creating order. Please try again.");
    }
  };
  return (
    <div className="flex w-screen h-screen items-center justify-center flex-col gap-4">
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <input
        type="number"
        placeholder="Enter amount"
        className="px-4 py-2 rounded-md text-black"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md"
        onClick={createOrder}
      >
        Create Order
      </button>
    </div>
  );
}