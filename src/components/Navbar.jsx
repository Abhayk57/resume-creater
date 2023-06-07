import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.header`
  height: 4em;
  padding: 1em;
  display: flex;
  align-items: center;
  width: 70%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

const Logo = styled(Link)`
  font-family: "Paytone One", sans-serif;
  color: #ffffff;
  letter-spacing: 1px;
  font-size: 1.8em;
  text-decoration: none;
`;

const Navbar = () => {
  return (
    <Container>
      <Logo to="/">ResumeCraftr</Logo>
    </Container>
  );
};

export default Navbar;
