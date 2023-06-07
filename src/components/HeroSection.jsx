import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  gap: 2em;
  color: #ffffff;
`;

const Heading = styled.h2`
  font-size: 2.3em;
  font-weight: 800;
`;

const Description = styled.p`
  font-size: 1em;
`;

const Button = styled(Link)`
  font-size: 1.2em;
  font-weight: 600;
  padding: 1em;
  border-radius: 0.5em;
  border: none;
  background-color: #2dc46a;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background-color: #ffffff;
    color: #2dc46a;
  }
`;

const HeroSection = () => {
  return (
    <Container>
      <Heading>Create your impresive Resume with ResumeCraftr</Heading>
      <Description>
        Craft an extraordinary resume within a constrained timeframe, showcasing
        remarkable achievements and competencies.
      </Description>
      <Button to="/create-resume">Create Resume</Button>
    </Container>
  );
};

export default HeroSection;
