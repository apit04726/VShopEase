import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";

const HeroSection = ({ myData }) => {
  const { name } = myData;

  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-two-column">
          <div className="hero-section-data">
            <img
              src=""
              alt=""
              className="img-style"
            />
            <p className="intro-data">Welcome to  </p>
            <h1> {name} </h1>
            <p>
              There are so many opportunities on the horizon, from mobile exclusives to
              geo-located offers to better filtering and search. We’ve only scratched
              the surface of what’s possible with personalization.this is our store website.
            </p>
            <NavLink to={`/Products`}>
              <Button id="ShopBtn">
                <i className="fas fa-shopping-bag">Shop Now </i></Button>
              {/* <Button id="ShopBtn">show now</Button> */}
            </NavLink>
          </div>
          {/* our homepage image  */}

          <div className="hero-section-image">
            <figure>
              <img
                src="images/hero.jpg"
                alt=""
                className="img-style"
              />
            </figure>

            {/* <figure>
              <img
                src="images/newhome.jpg"
                alt="hero-section-photo"
                className="img-style"
              />
            </figure> */}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  padding: 12rem 0;

  img {
    min-width: 10rem;
    height: 10rem;
  }

  .hero-section-data {
    p {
      margin: 2rem 0;
    }

    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }

    h1{
      box-shadow: inset 0 0 0 0 #54b3d6;
      color: #54b3d6;
      padding: 0 .25rem;
      margin: 0 -.25rem;
      transition: color .3s ease-in-out, box-shadow .3s ease-in-out;
    }
    h1:hover {
      color: #fff;
      box-shadow: inset 200px 0 0 0 #54b3d6;;
    }
    
    /* Presentational styles */
    h1{
      color: rgb(18 20 20);
      font-family: 'Poppins', sans-serif;
      font-size: 26px;
      font-weight: 700;
      line-height: 1.5;
      text-decoration: none;
    }
    
    body {
      display: grid;
      height: 100vh;
      place-items: center;
    }
    
    .intro-data {
      margin-bottom: 0;
      color: green;
    }
  }

  .hero-section-image {
    width: 80%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    
  }
    figure {
    position: relative;

    &::after {
      content: "";
      width: 59%;
      height: 98%;        
      background-color: rgba(81, 56, 238, 0.4);
      position: absolute;
      left: 50%;
      top: -4rem;
      z-index: -1;
    }
  }
  .img-style {
    width: 100%;
    height: auto;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 10rem;
    }

    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
      background-color: rgba(81, 56, 238, 0.4);
    }
  }
`;

export default HeroSection;

