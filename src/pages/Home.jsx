import React from "react";
import { styled } from "styled-components";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ResumesList from "../components/ResumesList";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  /* min-height: 100vh; */
  position: relative;
`;

const Tilt = styled.div`
  width: 100%;
  position: relative;
`;

const TiltBg_1 = styled.div`
  height: 70vh;
  background-color: #2667ff;
  transform: skewY(-10deg);
  z-index: 2;
`;

const TiltBg_2 = styled.div`
  height: 50vh;
  background-color: #2667ff;
  position: absolute;
  top: -20%;
  left: 0;
  right: 0;
  z-index: 1;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 10;
  top: 0;
  max-width: 70%;
  gap: 2em;
`;

const Home = () => {
  return (
    <Container>
      <Tilt>
        <TiltBg_1 />
        <TiltBg_2 />
      </Tilt>
      <Content>
        <HeroSection />
        <ResumesList />
      </Content>
    </Container>
  );
};

export default Home;
