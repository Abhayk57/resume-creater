import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Resume from "./Resume";
import axios from "axios";
import { mobile } from "../responsive";

const Container = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.2);
  border-radius: 0.3em;
  padding: 3em;
  display: flex;
  flex-direction: column;
  gap: 2em;
  ${mobile({ padding: "0.8em" })}
`;

const Title = styled.h2`
  color: #494949;
`;

const Resumes = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em;
  ${mobile({ width: "100%" })}
`;

const ResumesList = () => {
  const [resumeList, setResumelist] = useState([]);

  useEffect(() => {
    let isSubscribe = true;

    const getData = async () => {
      try {
        const res = await axios.get("/api");

        setResumelist(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    if (isSubscribe) {
      getData();
    }

    return () => {
      isSubscribe = false;
    };
  }, []);

  return (
    <Container>
      <Title>User-Created Resume Gallery:</Title>
      <Resumes>
        {resumeList?.length > 0 &&
          resumeList?.map((item, id) => <Resume {...item} />)}
      </Resumes>
    </Container>
  );
};

export default ResumesList;
