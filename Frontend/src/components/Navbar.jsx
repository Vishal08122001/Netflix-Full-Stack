import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/Firebase-config";

const Navbar = ({ isScrolled, search, setSearch }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setinputHover] = useState(false);
  const navigate = useNavigate();
  const Links = [
    { name: "Home", link: "/" },
    { name: "TV", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "MyList", link: "/myList" },
  ];
  onAuthStateChanged(firebaseAuth, (currUser) => {
    if (!currUser) navigate("/login");
  });

  return (
    <Container>
      <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img
              src={logo}
              alt="logo"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          <ul className="links flex">
            {Links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onClick={() => {
                setShowSearch(true);
              }}
              onMouseEnter={() => {
                setinputHover(true);
              }}
              onMouseLeave={() => {
                setinputHover(false);
              }}
              // onBlur={() => {
              //   setShowSearch(false);
              //   setinputHover(false);
              // }}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <button
            onClick={() => {
              signOut(firebaseAuth);
            }}
          >
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
};

const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    z-index: 2;
    padding: 0 4rem;
    align-item: center;
    transition: 0.3s ease-in-out;

    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        padding: 0.2rem;
        justify-content: center;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }

  @media (max-width: 1024px) {
    nav {
      padding: 0 2rem;
    }
  }

  @media (max-width: 768px) {
    nav {
      padding: 0 1rem;

      .left {
        .brand {
          img {
            height: 3rem;
          }
        }
        .links {
          display: flex;
          font-size: 1rem;
          gap: 0.4rem;
          margin-left: -1rem;
          li {
            a {
              color: white;
              text-decoration: none;
            }
          }
        }
      }

      .right {
        gap: 0.5rem;
        button {
          svg {
            font-size: 1rem;
          }
        }
        .search {
          gap: 0.2rem;
          padding-left: 0.2rem;
          button {
            svg {
              font-size: 1rem;
            }
          }
          input {
            padding: 0.2rem;
          }
        }
      }
    }
  }

  @media (max-width: 480px) {
    nav {
      padding: 0.5rem;

      .left {
        .brand {
          img {
            height: 2.5rem;
          }
        }
      }

      .right {
        gap: 0.3rem;
        button {
          svg {
            font-size: 0.8rem;
          }
        }
        .search {
          gap: 0.1rem;
          padding-left: 0.1rem;
          button {
            svg {
              font-size: 0.8rem;
            }
          }
          input {
            padding: 0.1rem;
          }
        }
      }
    }
  }
`;

export default Navbar;
