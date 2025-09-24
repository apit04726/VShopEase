import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";
// eslint-disable-next-line no-unused-vars
import { FaFacebook, FaInstagram, FaMobile, FaPhone, FaTwitter, FaYoutube } from "react-icons/fa";

// Add these animation keyframes at the top of your file
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const colorChange = keyframes`
  0% {
    color: #ffffff;
  }
  25% {
    color: #f0f0f0;
  }
  50% {
    color: #e0e0e0;
  }
  75% {
    color: #f0f0f0;
  }
  100% {
    color: #ffffff;
  }
`;

const Footer = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        alert("Oops! There was a problem submitting your form");
      }
    } catch (error) {
      toast.error("Oops! There was a problem submitting your form", { position: "top-center" });
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      toast.success("Form submitted successfully!", { position: "top-center" });
      const timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  return (
    <>
      <Wrapper>
        <ToastContainer />
        <section className="contact-short">
          <div className="grid grid-two-column">
            <div>
              <h3>Ready to get started?</h3>
              <h3>Talk to us today</h3>
            </div>

            <div>
              <Button id="footerBtnGEtStrt" className="btn hireme-btn">
                <NavLink to="/"> Get Started </NavLink>
              </Button>
            </div>
          </div>
        </section>

        {/* footer section */}
        <footer>
          <div className="container grid grid-four-column">
            <div className="footer-about">
              <h3>
                <AnimatedLogo className="footer-logo">
                  <span className="logo-part">V</span>
                  <span className="logo-part" >Shop</span>
                  <span className="logo-part">Ease</span>
                </AnimatedLogo>
              </h3>
              <p>Businesses, even those that recorded major profits, struggled at some point during the year. </p>
            </div>
            <div className="footer-subscribe">
              <h3>Subscribe to get important updates</h3>
              {isSubmitted ? (
                <p>Thank you for subscribing!</p>
              ) : (
                <form
                  action="https://formspree.io/f/xblrjbwv"
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  <input id="footerSubscri" type="email" name="email" placeholder="YOUR E-MAIL" required />

                  <input id="footerbtn" type="submit" value="subscribe" />
                </form>
              )}
            </div>
            <div className="footer-social">
              <h3>Follow Us</h3>

              <div className="footer-social--icons">
                <div id="FAFAtwitter">
                  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                    <FaTwitter className="icons" />
                  </a>
                </div>
                <div id="FAFAfacebook">
                  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="icons" />
                  </a>
                </div>

                <div id="socialmeaid">
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="icons" />
                  </a>
                </div>
                <div id="FAFAyoutibe">
                  <a
                    href="https://www.youtube.com/@DigitizeInfoSystem"
                    target="_blank" rel="noopener noreferrer">
                    <FaYoutube className="icons" />
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-contact">
              <h3>Call Us</h3>
              <a id="contactt" href="tel:+91 12345678988">+91 12345678988</a>
            </div>
          </div>
          <div className="footer-bottom--section">
            <hr />
            <div className="container grid grid-two-column ">
              <p>
                @{new Date().getFullYear()}-VShopEase. All Rights Reserved
              </p>
              <div>
                <p>PRIVACY POLICY</p>
                <p>TERMS & CONDITIONS</p>
              </div>
            </div>
          </div>
        </footer>
      </Wrapper>
    </>
  );
};

// Add this styled component for the animated logo
const AnimatedLogo = styled.div`
  display: inline-flex;
  align-items: center;
  
  .logo-part {
    display: inline-block;
    animation: ${fadeIn} 0.8s ease-out forwards, ${colorChange} 8s infinite;
    opacity: 0;
    gap:4px !important;
    
    
    &:nth-child(1) {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.white};
      animation-delay: 0.1s;
    }
    
    &:nth-child(2) {
      font-weight: normal;
      color: ${({ theme }) => theme.colors.hr};
      animation-delay: 0.3s;
    }
    
    &:nth-child(3) {
      font-weight: normal;
      color: ${({ theme }) => theme.colors.white};
      animation-delay: 0.5s;
    }
    
    &:hover {
      animation: none;
      color: ${({ theme }) => theme.colors.btn} !important;
      transition: color 0.3s ease;
    }
  }
`;

//  footer CSS (rest remains the same)
const Wrapper = styled.section`
  .iSIFGq {
    margin: 0;
  }
  .contact-short {
    max-width: 60vw;
    margin: auto;
    padding: 5rem 10rem;
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    transform: translateY(50%);

    .grid div:last-child {
      justify-self: end;
      align-self: center;
    }
  }
    .footer-logo{
    gap: 4px !important;
    }

  footer {
    padding: 14rem 0 9rem 0;
    background-color: ${({ theme }) => theme.colors.footer_bg};
    h3 {
      color: ${({ theme }) => theme.colors.hr};
      margin-bottom: 2.4rem;
    }
    p {
      color: ${({ theme }) => theme.colors.white};
    }
    .footer-social--icons {
      display: flex;
      gap: 2rem;

      div {
        padding: 1rem;
        border-radius: 50%;
        border: 2px solid ${({ theme }) => theme.colors.white};

        .icons {
          color: ${({ theme }) => theme.colors.white};
          font-size: 2.4rem;
          position: relative;
          cursor: pointer;
        }
      }
    }
  }

  .footer-bottom--section {
    padding-top: 9rem;

    hr {
      margin-bottom: 2rem;
      color: ${({ theme }) => theme.colors.hr};
      height: 0.1px;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .contact-short {
      max-width: 80vw;
      margin: 4.8rem auto;
      transform: translateY(0%);
      text-align: center;

      .grid div:last-child {
        justify-self: center;
      }
    }

    footer {
      padding: 9rem 0 9rem 0;
    }

    .footer-bottom--section {
      padding-top: 4.8rem;
    }
  }
`;

export default Footer;