import { useState } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import PropTypes from 'prop-types';
import CartAmountToggle from "./CartAmountToggle";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
import { useCartContext } from "../context/cart_context";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();
  const { id, colors, stock } = product;
  const [color, setColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const [showWarning, setShowWarning] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const setDecrease = () => {
    setAmount(prevAmount => Math.max(prevAmount - 1, 1));
  };

  const setIncrease = () => {
    setAmount(prevAmount => Math.min(prevAmount + 1, stock));
  };

  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  const handleAddToCart = (e) => {
    if (!isLoggedIn()) {
      e.preventDefault();
      setShowWarning(true);
      setTimeout(() => {
        setRedirect(true);
      }, 5000);
      return;
    }
    addToCart(id, color, amount, product);
  };

  if (redirect) {
    window.location.href = "/login";
    return null;
  }

  return (
    <Wrapper>
      <div className="colors">
        <p>
          Color:
          {colors.map((curColor, index) => (
            <button
              key={index}
              style={{ backgroundColor: curColor }}
              className={color === curColor ? "btnStyle active" : "btnStyle"}
              onClick={() => setColor(curColor)}
            >
              {color === curColor ? <FaCheck className="checkStyle" /> : null}
            </button>
          ))}
        </p>
      </div>

      {/* Add to cart */}
      <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />
      {showWarning && (
        <div style={{ color: 'red', marginBottom: '1rem', fontSize: '16px' }}>
          Please login to add items to cart. Redirecting to login in 5 seconds...
        </div>
      )}
      <NavLink to="/cart" onClick={handleAddToCart}>
        <Button className="btn" id="addToCart">ADD TO CART</Button>
      </NavLink>
    </Wrapper>
  );
};

AddToCart.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    stock: PropTypes.number.isRequired
  }).isRequired
};

const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;  
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;

export default AddToCart;
