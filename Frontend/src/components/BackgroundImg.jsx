import React from "react";
import bgImg from "../assets/login.jpg";
import styled from "styled-components";

const BackgroundImg = () => {
  return (
    <div>
      <Container>
        <img src={bgImg} alt="background" />
      </Container>
    </div>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  img {
    height: 100vh;
    width: 100vw;
  }
`;

export default BackgroundImg;
