import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiLoginCircleLine } from "react-icons/ri";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { CgMenu, CgClose } from "react-icons/cg";
import { useCartContext } from "../context/cart_context";

const NavWrapper = styled.nav`
    .navbar-lists {
      display: flex;
      gap: 4.8rem;
      align-items: center;
      .navbar-link {
        &:link,
        &:visited {
          display: inline-block;
          text-decoration: none;
          font-size: 1.8rem;
          font-weight: 500;
          text-transform: uppercase;
          color: ${({ theme }) => theme.colors.black};
          transition: color 0.3s linear;
        }

        &:hover,
        &:active {
          color: ${({ theme }) => theme.colors.helper};
        } 
      }
    }
    .mobile-navbar-btn {
      display: none;
      background-color: transparent;
      cursor: pointer;
      border: none;
    }

    .mobile-nav-icon[name="close-outline"] {
      display: none;
    }

    .close-outline {
      display: none;
    }

    .cart-trolley--link {
      position: relative;

      .cart-trolley {
        position: relative;
        font-size: 3.2rem;
      }

      .cart-total--item {
        width: 2.4rem;
        height: 2.4rem;
        position: absolute;
        background-color: #000;
        color: #000;
        border-radius: 50%;
        display: grid;
        place-items: center;
        top: -20%;
        left: 70%;
        background-color: ${({ theme }) => theme.colors.helper};
      }
    }

    .user-login--name {
      text-transform: capitalize;
    }

    .user-logout,
    .user-login {
      font-size: 1.4rem;
      padding: 0.8rem 1.4rem;
    }

    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .mobile-navbar-btn {
        display: inline-block;
        z-index: 9999;
        border: ${({ theme }) => theme.colors.black};

        .mobile-nav-icon {
          font-size: 4.2rem;
          color: ${({ theme }) => theme.colors.black};
        }
      }

      .active .mobile-nav-icon {
        display: none;
        font-size: 4.2rem;
        position: absolute;
        top: 30%;
        right: 10%;
        color: ${({ theme }) => theme.colors.black};
        z-index: 9999;
      }

      .active .close-outline {
        display: inline-block;
      }

      .navbar-lists {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        visibility: hidden;
        opacity: 0;
        transform: translateX(100%);
        /* transform-origin: top; */
        transition: all 3s linear;
      }

      .active .navbar-lists {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
        z-index: 999;
        transform-origin: right;
        transition: all 3s linear;

        .navbar-link {
          font-size: 4.2rem;
        }
      }
      .cart-trolley--link {
        position: relative;

        .cart-trolley {
          position: relative;
          font-size: 5.2rem;
        }

        .cart-total--item {
          width: 4.2rem;
          height: 4.2rem;
          font-size: 2rem;
        }
      }

      .user-logout,
      .user-login {
        font-size: 2.2rem;
        padding: 0.8rem 1.4rem;
      }
    }
  `;

const Nav = () => {
  const [menuIcon, setMenuIcon] = useState();
  const { total_item } = useCartContext();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });

  // Listen for login/logout changes (optional, for multi-tab)
  React.useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      const u = localStorage.getItem("user");
      setUser(u ? JSON.parse(u) : null);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Listen for changes to token/user in localStorage (for same-tab updates)
  React.useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      const u = localStorage.getItem("user");
      setIsLoggedIn(!!token);
      setUser(u ? JSON.parse(u) : null);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <NavWrapper>
      <div className={menuIcon ? "navbar active" : "navbar"}>
        <ul className=" navbar-lists">
          <li>
            <NavLink to="/" className="navbar-link home-link" onClick={() => setMenuIcon(false)}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" className="navbar-link home-link" onClick={() => setMenuIcon(false)}>
              About
            </NavLink>
          </li>

          <li>
            <NavLink to="/Products" className="navbar-link home-link" onClick={() => setMenuIcon(false)}>
              Products
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" className="navbar-link home-link" onClick={() => setMenuIcon(false)}>
              contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className="navbar-link cart-trolley--link" onClick={() => setMenuIcon(false)}>
              <FiShoppingCart className="cart-trolley" onClick={() => setMenuIcon(false)}
              />
              <span className="cart-total--item">{total_item}</span>
            </NavLink>
          </li>
          {!isLoggedIn && (
            <>
              <li>
                <NavLink to="/login" className="navbar-link home-link" onClick={() => setMenuIcon(false)} >
                  <RiLoginCircleLine style={{marginRight: '0.7rem', fontSize: '2.4rem', verticalAlign: 'middle'}} />
                  Login
                </NavLink>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li className="user-profile">
                <span className="user-login--name">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#007bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M16 20v-2a4 4 0 0 0-8 0v2"/></svg>
                  {user?.name || user?.email || "User"}
                </span>
                <button className="user-logout" onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
        {/* button open now */}
        <div className=" mobile-navbar-btn ">
          <CgMenu name="menu-outline" className="mobile-nav-icon"
            onClick={() => setMenuIcon(true)} />
          <CgClose name="close-outline" className="mobile-nav-icon close-outline "
            onClick={() => setMenuIcon(false)}
          />

        </div>
      </div>
      <style>{`
        .navbar-link.home-link[href='/login'] {
          background: linear-gradient(90deg, ${({ theme }) => theme.colors.btn} 0%, ${({ theme }) => theme.colors.helper} 100%);
          color: ${({ theme }) => theme.colors.white} !important;
          border-radius: 2.5rem;
          padding: 0.7rem 2.4rem 0.7rem 2.1rem;
          font-weight: 700;
          font-size: 2rem;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 16px ${({ theme }) => theme.colors.btn}33, 0 0 0 0px ${({ theme }) => theme.colors.helper};
          border: none;
          position: relative;
          overflow: hidden;
          display: inline-block;
          transition: background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s;
          animation: loginPulse 1.5s infinite alternate, loginFadeIn 1.1s cubic-bezier(.68,-0.55,.27,1.55), loginBounce 2.5s infinite;
        }
        @keyframes loginBounce {
          0%, 100% { transform: scale(1); }
          10% { transform: scale(1.08); }
          20% { transform: scale(0.98); }
          30% { transform: scale(1.04); }
          40% { transform: scale(1); }
        }
        .navbar-link.home-link[href='/login']::before {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 60%;
          height: 100%;
          background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.47) 50%, transparent 100%);
          opacity: 0.7;
          pointer-events: none;
          border-radius: 2.5rem;
          animation: shimmer 2.2s infinite;
        }
        .navbar-link.home-link[href='/login']::after {
          content: "";
          position: absolute;
          top: -4px;
          left: -4px;
          width: calc(100% + 8px);
          height: calc(100% + 8px);
          border-radius: 3rem;
          pointer-events: none;
          border: 2px solid ${({ theme }) => theme.colors.helper};
          opacity: 0.5;
          box-shadow: 0 0 16px 4px ${({ theme }) => theme.colors.helper};
          animation: glowBorder 2.5s infinite alternate;
        }
        @keyframes glowBorder {
          0% { opacity: 0.2; box-shadow: 0 0 8px 2px ${({ theme }) => theme.colors.helper}; }
          100% { opacity: 0.5; box-shadow: 0 0 24px 8px ${({ theme }) => theme.colors.helper}; }
        }
        .navbar-link.home-link[href='/login']::before {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 60%;
          height: 100%;
          background: linear-gradient(120deg, transparent 0%, #fff7 50%, transparent 100%);
          opacity: 0.7;
          pointer-events: none;
          border-radius: 2.5rem;
          animation: shimmer 2.2s infinite;
        }
        @keyframes shimmer {
          0% { left: -75%; }
          60% { left: 120%; }
          100% { left: 120%; }
        }
        @keyframes loginFadeIn {
          0% { opacity: 0; transform: translateY(-18px) scale(0.95); }
          60% { opacity: 0.7; transform: translateY(8px) scale(1.03); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .navbar-link.home-link[href='/login']:hover {
          background: linear-gradient(90deg, ${({ theme }) => theme.colors.helper} 0%, ${({ theme }) => theme.colors.btn} 100%);
          color: ${({ theme }) => theme.colors.btn} !important;
          box-shadow: 0 8px 24px ${({ theme }) => theme.colors.helper}44;
          transform: scale(1.05);
        }
        @keyframes loginPulse {
          0% { box-shadow: 0 4px 16px ${({ theme }) => theme.colors.btn}33; }
          100% { box-shadow: 0 8px 32px ${({ theme }) => theme.colors.helper}44; }
        }
        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          background: #f8f9fa;
          border-radius: 2.5rem;
          padding: 0.3rem 1.2rem 0.3rem 0.8rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .user-login--name {
          display: flex;
          align-items: center;
          font-size: 1.6rem;
          font-weight: 600;
          color: #007bff;
          gap: 0.6rem;
          background: transparent;
          padding: 0.2rem 0.8rem;
          border-radius: 2rem;
        }
        .user-logout {
          font-size: 1.3rem;
          padding: 0.4rem 1.2rem;
          background: #fff;
          color: #007bff;
          border: 1px solid #007bff;
          border-radius: 2rem;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
          margin-left: 0.5rem;
          box-shadow: 0 1px 4px rgba(0,123,255,0.08);
        }
        .user-logout:hover {
          background: #007bff;
          color: #fff;
          box-shadow: 0 2px 8px rgba(0,123,255,0.12);
        }
      `}</style>
    </NavWrapper>

  );
};
export default Nav;

