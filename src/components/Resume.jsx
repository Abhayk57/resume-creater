import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { tablet } from "../responsive";

const Tilt = styled.div`
  width: 100%;
  height: 50%;
  background-color: #2dc46a;
  position: absolute;
  left: 0;
  bottom: -60%;
  transform: skewY(-10deg);
  transition: all 0.5s linear;
  cursor: pointer;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  width: 100%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

const ResumeBox = styled.div`
  width: 32%;
  height: 25em;
  border-radius: 0.3em;
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.2);
  padding: 2em;
  position: relative;
  overflow: hidden;
  gap: 1em;
  ${tablet({ width: "100%" })}

  &:hover ${Tilt} {
    bottom: -10%;
  }
`;

const Image = styled.img``;

const ActionIcons = styled(FontAwesomeIcon)`
  font-size: 2em;
  color: #dddddd;
  transition: all 0.3s ease;

  &:hover {
    color: #2667ff;
  }
`;

const UserName = styled.p`
  font-size: 1.3em;
  font-weight: 600;
`;

const Resume = ({ id, profile }) => {
  const HandleDelete = async () => {
    const Confirmed = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (Confirmed) {
      try {
        const res = await axios.delete(`/api/${id}`);

        if (res.status === 200) {
          window.location.href = "/";
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <ResumeBox>
      <UserName>{profile?.name}</UserName>
      <Tilt>
        <Actions>
          <Link to={`view-resume/${id}`}>
            <ActionIcons icon={faEye} />
          </Link>

          <Link to={`edit-resume/${id}`}>
            <ActionIcons icon={faEdit} />
          </Link>

          <ActionIcons onClick={() => HandleDelete()} icon={faTrash} />
        </Actions>
      </Tilt>
      <Image
        src="https://resumeworded.com/assets/images/resume-guides/data-analytics-manager.png"
        alt="resume"
      />
    </ResumeBox>
  );
};

export default Resume;
