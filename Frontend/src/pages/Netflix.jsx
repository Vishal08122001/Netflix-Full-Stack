import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import bgImg from "../assets/home.jpg";
import movie_logo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider";

const Netflix = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const GenresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (GenresLoaded) {
      dispatch(fetchMovies({ type: "all" }));
    }
  }, [GenresLoaded, dispatch]);

  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
    };
    return () => {
      window.onscroll = null;
    };
  }, []);

  const filteredMovies = movies.filter(({ name }) => {
    return name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Container>
      <Navbar isScrolled={isScrolled} search={search} setSearch={setSearch} />
      <div className="hero">
        <img src={bgImg} alt="background" className="background-image" />
        <div className="container">
          <div className="logo">
            <img src={movie_logo} alt="movie-logo" />
          </div>
          <div className="buttons flex">
            <button
              className="flex j-center a-center"
              onClick={() => {
                navigate("/player");
              }}
            >
              <FaPlay /> Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={filteredMovies} />
    </Container>
  );
};

const Container = styled.div`
  background-color: black;

  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }

    .container {
      position: absolute;
      bottom: 5rem;

      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }

      .buttons {
        margin: 5rem;
        gap: 2rem;

        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.3s ease-in-out;

          &:hover {
            opacity: 0.8;
          }

          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;

            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .hero {
      .container {
        .logo {
          img {
            margin-left: 2rem;
          }
        }
        .buttons {
          margin: 3rem;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .hero {
      img {
        height: 60vh;
        width: 100vw;
      }
      .container {
        .logo {
          img {
            margin-left: 1rem;
          }
        }
        .buttons {
          margin: 2rem;
          flex-direction: column;
          button {
            width: 100%;
            padding-left: 1.5rem;
            padding-right: 1.9rem;
          }
          button:first-of-type {
            margin-bottom: 1rem;
          }
        }
      }
    }
  }
`;

export default Netflix;
