import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import video1 from "../assets/video1.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbDownFill, RiThumbUpFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import axios from "axios";
import { firebaseAuth } from "../utils/Firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const Card = React.memo(({ movieData, isLiked = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);
  const navigate = useNavigate();

  onAuthStateChanged(firebaseAuth, (currUser) => {
    if (currUser) setEmail(currUser.email);
    else navigate("/login");
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const addToList = async () => {
    try {
      await axios
        .post("https://agreeable-button-lion.cyclic.app/api/user/add", {
          email,
          data: movieData,
        })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const removefromList = (id) => {
    try {
      axios.delete(
        `https://agreeable-button-lion.cyclic.app/api/user/liked/${email}/delete/${id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="Movie"
      />

      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="Movie"
              onClick={() => navigate("/player")}
            />
            <video
              src={video1}
              autoPlay
              loop
              muted
              onClick={() => navigate("/player")}
            />
          </div>

          <div className="info-container flex column">
            <h3 className="name" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>

            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp
                  title="Play"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill title="Like" />
                <RiThumbDownFill title="Dislike" />
                {isLiked ? (
                  <BsCheck
                    title="Remove from list"
                    onClick={() => removefromList(movieData.id)}
                  />
                ) : (
                  <AiOutlinePlus title="Add to my list" onClick={addToList} />
                )}
              </div>

              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>

            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre) => {
                  return (
                    <li key={genre} style={{ paddingRight: "0.7rem" }}>
                      {genre}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
});

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 90;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;

    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }

      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }

    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }

    .icons {
      .controls {
        display: flex;
        gap: 1rem;
        svg {
          font-size: 2rem;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          &:hover {
            color: #b8b8b8;
          }
        }
      }

      .genres {
        ul {
          gap: 1rem;
          li {
            padding-right: 0.7rem;
            &:first-of-type {
              list-style-type: none;
            }
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;

    .hover {
      width: 100%;
      top: -14vh;
    }
  }

  @media (max-width: 480px) {
    .hover {
      top: -8vh;
    }
  }
`;

export default Card;
