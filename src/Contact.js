import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;
        position: relative;
                
        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input, textarea {
    max-width: 50rem;
    color: rgb(33, 37, 41);
    padding: 1.6rem 2.4rem;
    border: 1px solid rgba(98, 84, 243, 0.5);
    text-transform: uppercase;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 10px;
}
            #ContactBtn22 {
            width:140px;
            color:white
            }
            #ContactBtn22:hover {
            color:rgb(98, 84, 243)
                         }

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }

        .message {
          position: sticky;
          top: 0;
          background-color: ${({ theme }) => theme.colors.btn};
          color: ${({ theme }) => theme.colors.white};
          padding: 1rem;
          margin-bottom: 1rem;
          border-radius: 5px;
        }
      }
    }     
  `;

const Contact = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setMessage("Thank you for your message! We will get back to you soon.");
        form.reset();
      } else {
        setMessage("Oops! There was a problem with your submission. Please try again.");
      }
    } catch (error) {
      setMessage("Oops! There was a problem with your submission. Please try again.");
    }
  };

  return (
    <Wrapper>
      <h2 className="common-heading">Contact Us</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d146607.74167667222!2d70.73889546937232!3d22.273625026463687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac71cdf0f%3A0x76dd15cfbe93ad3b!2sRajkot%2C%20Gujarat!5e1!3m2!1sen!2sin!4v1695996913204!5m2!1sen!2sin"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>

      {/* <Weather /> */}

      <div className="container">
        <div className="contact-form">
          {message && <p className="message">{message}</p>}
          <form action="https://formspree.io/f/xblrjbwv" method="POST" className="contact-inputs" onSubmit={handleSubmit}>
            <input type="text" placeholder="username" name="username" required autoComplete="off" />
            <input type="email" placeholder="Email" name="Email" required autoComplete="off" />
            <textarea name="messages" placeholder="Enter Your Messages" cols="30" rows="10" required autoComplete="off"></textarea>
            <input id="ContactBtn22" type="submit" value="send" />
            {/* <Button className="btn" type="submit" style={{width:'138px'}}>Submit</Button> */}
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
