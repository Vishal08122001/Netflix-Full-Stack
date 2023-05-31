import React, { useRef, useState } from "react";
import Card from "./Card";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const CardSlider = React.memo(({ data, title }) => {
  const [slider, setSlider] = useState(0);
  const listRef = useRef(null);

  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && slider > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSlider(slider - 1);
    }
    if (direction === "right" && slider < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSlider(slider + 1);
    }
  };

  return (
    <Container className="flex column">
      <h1>{title}</h1>

      <div className="wrapper">
        <div className={`slider-action left flex a-center j-center`}>
          <AiOutlineLeft
            onClick={() => {
              handleDirection("left");
            }}
          />
        </div>
        <div className="flex slider" ref={listRef}>
          {data.map((movie, index) => {
            return (
              <div key={movie.id}>
                <Card movieData={movie} index={index} />
              </div>
            );
          })}
        </div>

        <div className={`slider-action right  flex a-center j-center`}>
          <AiOutlineRight
            onClick={() => {
              handleDirection("right");
            }}
          />
        </div>
      </div>
    </Container>
  );
});

const Container = styled.div`
  gap: 1rem;
  position: relative;
  padding: 2rem 0;
  h1 {
    margin: 50px;
  }
  .wrapper {
    .slider {
      width: max-content;
      gap: 1rem;
      transform: translateX(0px);
      transition: 0.3s ease-in-out;
      margin-left: 50px;
    }
    .slider-action {
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 0;
      bottom: 0;
      cursor: pointer;
      width: 50px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
      }
    }
    .none {
      display: none;
    }
    .left {
      margin-top:5rem;
      left: 0;
    }
    .right {
      right: 0;
      margin-top:5rem;;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem 0;

    h1 {
      margin: 20px;
    }

    .wrapper {
      .slider {
        margin-left: 20px;
      }

      .slider-action {
        width: 30px;
        svg {
          font-size: 1.5rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 1rem 0;

    h1 {
      margin: 20px;
    }

    .wrapper {
      .slider {
        margin-left: 20px;
      }

      .slider-action {
        width: 30px;
        svg {
          font-size: 1.5rem;
        }
      }
    }
  }
`;

export default CardSlider;
