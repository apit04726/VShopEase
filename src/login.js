import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Loginform = () => {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === formData.email && u.password === formData.password);
    if (user) {
      // Simulate token
      localStorage.setItem("token", "dummy-token");
      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event("userChanged"));
      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/"); // Redirect to home page
      }, 1500);
    } else {
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <Wrapper>
      <h2 className="common-heading">Login Now</h2>
      <FormContainer>
        <ContactForm>
          {message && <Message>{message}</Message>}
          <form onSubmit={handleSubmit} className="contact-inputs">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <SubmitButton type="submit">Login</SubmitButton>
          </form>
          <NoAccountStyled>
            Don't have an account?{' '}
            <a href="/register" className="register-link">Register now</a>
          </NoAccountStyled>
        </ContactForm>
      </FormContainer>
    </Wrapper>
  );
};

// Styled Components (remain the same as in your original code)
const Wrapper = styled.section`
  padding: 9rem 0 5rem 0;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.bg};
`;

const NoAccountStyled = styled.div`
  margin-top: 1.5rem;
  font-size: 1.2rem;
  color: #333;
  .register-link {
    color: #007bff;
    text-decoration: underline;
    font-weight: 500;
    margin-left: 0.3rem;
    transition: color 0.2s;
  }
  .register-link:hover {
    color: #0056b3;
  }
`;

const FormContainer = styled.div`
  margin: 6rem auto 0;
  max-width: 1200px;
  padding: 0 2rem;
`;

const ContactForm = styled.div`
  max-width: 50rem;
  margin: 0 auto;
  position: relative;
`;

const Message = styled.p`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.btn};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 5px;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1.6rem 2.4rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.bg};
  border: 1px solid rgba(98, 84, 243, 0.5);
  text-transform: uppercase;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 10px;
  font-size: 1.4rem;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.btn};
    box-shadow: 0 0 0 2px rgba(98, 84, 243, 0.2);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
  }
`;

const SubmitButton = styled.button`
  width: 14rem;
  padding: 1.2rem 2.4rem;
  background-color: ${({ theme }) => theme.colors.btn};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 10px;
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.btn};
    color: ${({ theme }) => theme.colors.btn};
    transform: scale(0.95);
  }

  &:active {
    transform: scale(0.9);
  }
`;

export default Loginform;