import React, { useState } from "react";
import styled from "styled-components";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import BackgroundImg from "../components/BackgroundImg";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/Firebase-config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
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
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character.",
      }));
      return;
    }

    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      const msg = error.code.split("/");
      setErrors((prev) => ({
        ...prev,
        password: msg[1],
      }));
    }
  };

  // Handling the changes in Input Fields
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
    <Container>
      <BackgroundImg />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
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
                    marginTop: "-1.5rem",
                    marginBottom: "-1.1rem",
                  }}
                >
                  {errors.email}
                </p>
              )}

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
                      marginTop: "-1.5rem",
                      marginBottom: "-1.1rem",
                      width: "15rem",
                    }}
                  >
                    {errors.password}
                  </p>
                )}
              </>

              <button onClick={handleLogin}>Log In</button>
            </div>
          </div>
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
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: fit-content;
        gap: 2rem;
        color: white;
        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
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
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
        }
      }
    }
  }
`;

export default Login;
