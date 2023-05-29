import React, { useState } from "react";
import styled from "styled-components";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import BackgroundImg from "../components/BackgroundImg";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/Firebase-config";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleSignIn = async () => {
    const { email, password } = formdata;
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
      return;
    }

    // Validate password format (at least one uppercase, one lowercase, and one special character)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character",
      }));
      return;
    }

    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      const msg = error.code.split("/");
      setErrors((prev) => ({
        ...prev,
        password: msg[1],
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  onAuthStateChanged(firebaseAuth, (currUser) => {
    if (currUser) navigate("/");
  });

  return (
    <Container showPassword={showPassword}>
      <BackgroundImg />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited Movies, TV Shows and more</h1>
            <h4>Watch Anywhere. Cancel Anytime</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership
            </h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formdata.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p
                style={{
                  fontSize: "10px",
                  color: "red",
                }}
              >
                {errors.email}
              </p>
            )}

            {showPassword && (
              <>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formdata.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p
                    style={{
                      fontSize: "10px",
                      color: "red",
                      width: "fit-content",
                    }}
                  >
                    {errors.password}
                  </p>
                )}
              </>
            )}

            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
          </div>

          <button onClick={handleSignIn}>SignUp</button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 25rem;
        }
      }

      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }

        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          foont-weight: bolder;
          font-size: 1.05rem;
        }
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
      }
    }
  }

  @media only screen and (max-width: 600px) {
    /* Styles specific to mobile devices */
    .content {
      .body {
        .text {
          h1 {
            padding: 0 2rem;
          }
        }
        .form {
          width: 90%;
          grid-template-columns: 1fr;
          input {
            padding: 1rem;
          }
          button {
            padding: 0.5rem 0.8rem;
            font-size: 0.9rem;
          }
        }
        button {
          font-size: 0.9rem;
        }
      }
    }
  }
`;

export default SignUp;
