
import React from 'react';
import { useCartContext } from "./context/cart_context";
import FormatPrice from "./Helpers/FormatPrice";
import { Button } from "./styles/Button";
import styled from "styled-components";

const Checkout = () => {
    const { cart, total_price, shipping_fee } = useCartContext();

    // Calculate total
    const orderTotal = total_price + shipping_fee;


    // Razorpay payment handler
    const handlePayment = async () => {
        const res = await loadRazorpayScript();
        if (!res || !window.Razorpay) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        // IMPORTANT: Replace with your Razorpay TEST key from https://dashboard.razorpay.com/app/keys
        const razorpayKey = "YOUR_RAZORPAY_KEY_ID";
        if (!razorpayKey || razorpayKey === "YOUR_RAZORPAY_KEY_ID") {
            alert("Please set your Razorpay key in Checkout.js");
            return;
        }

        const options = {
            key: razorpayKey,
            amount: orderTotal * 100, // Amount in paise
            currency: "INR",
            name: "VShopEase",
            description: "Order Payment",
            handler: function (response) {
                alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
                // You can add order success logic here
            },
            prefill: {
                name: "",
                email: "",
                contact: "",
            },
            theme: {
                color: "#3399cc",
            },
            modal: {
                ondismiss: function () {
                    alert("Oops! Something went wrong. Payment Failed");
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Load Razorpay script
    function loadRazorpayScript() {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    return (
        <CheckoutWrapper>
            <div className="checkout-card">
                <h2 className="checkout-title">Checkout</h2>
                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id} className="order-item">
                                <span className="item-name">{item.name}</span>
                                <span className="item-mult"> x {item.amount} </span>
                                <span className="item-price">= <FormatPrice price={item.price * item.amount} /></span>
                            </li>
                        ))}
                    </ul>
                    <div className="summary-row">
                        <span>Subtotal:</span>
                        <span className="summary-value"><FormatPrice price={total_price} /></span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping Fee:</span>
                        <span className="summary-value"><FormatPrice price={shipping_fee} /></span>
                    </div>
                    <div className="summary-row total-row">
                        <span>Total:</span>
                        <span className="summary-value total-value"><FormatPrice price={orderTotal} /></span>
                    </div>
                </div>
                <Button className="razorpay-btn" onClick={handlePayment}>Pay with Razorpay</Button>
            </div>
        </CheckoutWrapper>
    );
};


const CheckoutWrapper = styled.section`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.bg};
  padding: 2rem 0;

  .checkout-card {
    background: #fff;
    border-radius: 1.2rem;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08), 0 1.5px 4px rgba(0,0,0,0.04);
    padding: 2.5rem 2.5rem 2rem 2.5rem;
    max-width: 420px;
    width: 100%;
    margin: 2rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .checkout-title {
    font-size: 35px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.btn};
    margin-bottom: 1.2rem;
    text-align: center;
    letter-spacing: 1px;
  }

  .order-summary {
    background: #f6f8fa;
    border-radius: 0.8rem;
    padding: 1.5rem 1.2rem 1.2rem 1.2rem;
    margin-bottom: 2.2rem;
    box-shadow: 0 1px 2px rgba(0,0,0,0.03);
  }

  .order-summary h3 {
    font-size: 19px;
    font-weight: 600;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.heading};
    text-align: left;
  }

  .order-summary ul {
    list-style: none;
    padding: 0;
    margin: 0 0 1.2rem 0;
  }

  .order-item {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    margin-bottom: 0.5rem;
    color: #222;
  }
  .item-name {
    font-weight: 500;
    flex: 1;
  }
  .item-mult {
    color: #888;
    margin: 0 0.3rem;
  }
  .item-price {
    font-weight: 400;
    color: #444;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    margin-bottom: 0.5rem;
    color: #222;
  }
  .summary-value {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.btn};
  }
  .total-row {
    font-size: 16px;
    font-weight: 700;
    margin-top: 1rem;
    border-top: 1px solid #eaeaea;
    padding-top: 0.7rem;
  }
  .total-value {
    color: #0a1435;
  }

  .razorpay-btn {
    margin-top: 1.5rem;
    font-size: 15px;
    font-weight: 600;
    border-radius: 0.5rem;
    background: ${({ theme }) => theme.colors.btn} !important;
    color: #fff !important;
    box-shadow: 0 2px 8px rgba(98,84,243,0.08);
    transition: background 0.2s;
    letter-spacing: 1px;
    padding: 1.1rem 0;
  }
  .razorpay-btn:hover {
    background: #0a1435 !important;
    color: #fff !important;
  }

  @media (max-width: 600px) {
    .checkout-card {
      padding: 1.2rem 0.5rem 1.2rem 0.5rem;
      max-width: 98vw;
    }
    .order-summary {
      padding: 1rem 0.5rem 1rem 0.5rem;
    }
    .checkout-title {
      font-size: 2rem;
    }
  }
`;

export default Checkout;
