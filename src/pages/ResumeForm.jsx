import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  AddAboutMe,
  AddExperience,
  AddProfile,
  AddProjects,
  AddSkill,
  Addacademics,
} from "../redux/ResumeSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100%;
  position: relative;
`;

const Tilt = styled.div`
  width: 100%;
  position: relative;
`;

const TiltBg_1 = styled.div`
  height: 70vh;
  background-color: #2dc46a;
  transform: skewY(-10deg);
  z-index: 2;
`;

const TiltBg_2 = styled.div`
  height: 50vh;
  background-color: #2dc46a;
  position: absolute;
  top: -20%;
  left: 0;
  right: 0;
  z-index: 1;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  position: absolute;
  z-index: 10;
  width: 60%;
  margin-top: 3em;
  ${mobile({ width: "80%" })}
`;

const Title = styled.h2`
  z-index: 10;
  font-size: 1.8em;
  color: #ffffff;
  font-weight: 700;
`;

const Form = styled.form`
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.2);
  border-radius: 0.3em;
  padding: 2em;
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

const ContextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  p {
    color: #494949;
    font-size: 1.2em;
    font-weight: 600;
  }

  hr {
    color: #494949;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  label {
    font-size: 1em;
  }

  input,
  textarea {
    width: 100%;
    border: 2px solid #adadad;
    outline: none;
    font-size: 1em;
    padding: 0.5em;
    border-radius: 0.3em;
  }
`;

const TenureBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  gap: 1em;

  input {
    width: 30%;
    border: 2px solid #adadad;
    outline: none;
    font-size: 1em;
    padding: 0.5em;
    border-radius: 0.3em;
    ${mobile({ width: "5em" })}
  }

  div {
    display: flex;
    align-items: center;
    gap: 1em;
  }
`;

const Button = styled.button`
  font-size: 1em;
  background-color: #2dc46a;
  color: #fff;
  width: 10em;
  padding: 0.4em;
  border: none;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  font-size: 1em;
  background-color: #2667ff;
  color: #fff;
  width: 10em;
  padding: 0.4em;
  border: none;
  cursor: pointer;
`;

const ResumeForm = () => {
  const notify = () => toast("Section added sucessfully!");

  const { id, profile, aboutMe, academics, Experience, Projects, Skills } =
    useSelector((state) => state.resumes);

  const [Profile, setProfile] = useState({});
  const [AboutMe, setAboutMe] = useState("");
  const [Academics, setAcademics] = useState({});
  const [experience, setExperience] = useState({});
  const [projects, setProjects] = useState({});
  const [skills, setSkills] = useState({});

  const dispatch = useDispatch();

  const HanldeChangeProfile = (e) => {
    setProfile({ ...Profile, [e.target.name]: e.target.value });
  };

  const HandleAddProfile = (e) => {
    e.preventDefault();
    dispatch(AddProfile(Profile));
    notify();
  };
  const HandleAboutMe = (e) => {
    e.preventDefault();
    dispatch(AddAboutMe(AboutMe));
    notify();
  };

  const HandleChangeAcademics = (e) => {
    setAcademics({ ...Academics, [e.target.name]: e.target.value });
  };

  const HandleAddAcademics = (e) => {
    e.preventDefault();
    dispatch(Addacademics(Academics));
    notify();
  };

  const HandleChangeExperience = (e) => {
    setExperience({ ...experience, [e.target.name]: e.target.value });
  };

  const HandleAddExperience = (e) => {
    e.preventDefault();
    dispatch(AddExperience(experience));
    notify();
  };

  const HandleChangeProject = (e) => {
    setProjects({ ...projects, [e.target.name]: e.target.value });
  };

  const HandleAddProjects = (e) => {
    e.preventDefault();
    dispatch(AddProjects(projects));
    notify();
  };

  const HandleChangeSkills = (e) => {
    setSkills({ ...skills, [e.target.name]: e.target.value });
  };

  const HanldeAddSkills = (e) => {
    e.preventDefault();
    dispatch(AddSkill(skills));
    notify();
  };

  const HandleCreateResume = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api", {
        id,
        profile,
        aboutMe,
        academics,
        Experience,
        Projects,
        Skills,
      });

      if (res.data) {
        alert("Resume is created successfully...");
        window.location.reload(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Tilt>
        <TiltBg_1 />
        <TiltBg_2 />
      </Tilt>
      <Content>
        <Title>Create Resume with Following Simple Steps </Title>
        <Form>
          <ContextBox>
            <p>Profile</p>
            <hr />
            <InputBox>
              <label>Full Name &#42;</label>
              <input
                required
                name="name"
                type="text"
                onChange={(e) => HanldeChangeProfile(e)}
              />
            </InputBox>
            <InputBox>
              <label>Current Designation &#42;</label>
              <input
                required
                name="currentDesignation"
                type="text"
                onChange={(e) => HanldeChangeProfile(e)}
              />
            </InputBox>
            <InputBox>
              <label>Location &#42;</label>
              <input
                required
                name="location"
                type="text"
                onChange={(e) => HanldeChangeProfile(e)}
              />
            </InputBox>
            <InputBox>
              <label>Email &#42;</label>
              <input
                required
                name="email"
                type="email"
                onChange={(e) => HanldeChangeProfile(e)}
              />
            </InputBox>
            <InputBox>
              <label>Phone Number &#42;</label>
              <input
                required
                name="phone"
                type="text"
                onChange={(e) => HanldeChangeProfile(e)}
              />
            </InputBox>
            <InputBox>
              <label>Website </label>
              <input
                name="website"
                type="text"
                onChange={(e) => HanldeChangeProfile(e)}
              />
            </InputBox>

            <ToastContainer />
            <Button onClick={(e) => HandleAddProfile(e)}>Add</Button>
          </ContextBox>
          <ContextBox>
            <p>About Me</p>
            <hr />
            <InputBox>
              <textarea
                name="name"
                type="textArea"
                rows={5}
                cols={10}
                onChange={(e) => setAboutMe(e.target.value)}
              />
            </InputBox>
            <Button onClick={(e) => HandleAboutMe(e)}>Add</Button>
          </ContextBox>
          <ContextBox>
            <p>Academics</p>
            <hr />
            <InputBox>
              <label>School/College/University Name</label>
              <input
                type="text"
                name="schoolName"
                onChange={(e) => HandleChangeAcademics(e)}
              />
            </InputBox>
            <InputBox>
              <label>Degree/Certificate</label>
              <input
                type="text"
                name="degree"
                onChange={(e) => HandleChangeAcademics(e)}
              />
            </InputBox>
            <TenureBox>
              <label>Period</label>
              <div>
                <input
                  type="text"
                  name="from"
                  onChange={(e) => HandleChangeAcademics(e)}
                />
                <FontAwesomeIcon icon={faArrowRight} />
                <input
                  type="text"
                  name="to"
                  onChange={(e) => HandleChangeAcademics(e)}
                />
              </div>
            </TenureBox>
            <InputBox>
              <label>Description</label>
              <textarea
                name="description"
                type="textArea"
                rows={5}
                cols={10}
                onChange={(e) => HandleChangeAcademics(e)}
              />
            </InputBox>
            <small>
              You can add multiple entries by simply clicking on "add" and
              proceed with adding another entry.
            </small>
            <ToastContainer />
            <Button onClick={(e) => HandleAddAcademics(e)}>Add</Button>
          </ContextBox>
          <ContextBox>
            <p>Professional Experience</p>
            <hr />
            <InputBox>
              <label>Designation</label>
              <input
                type="text"
                name="designation"
                onChange={(e) => HandleChangeExperience(e)}
              />
            </InputBox>
            <InputBox>
              <label>Organization</label>
              <input
                type="text"
                name="organization"
                onChange={(e) => HandleChangeExperience(e)}
              />
            </InputBox>
            <InputBox>
              <label>Location</label>
              <input
                type="text"
                name="location"
                onChange={(e) => HandleChangeExperience(e)}
              />
            </InputBox>
            <TenureBox>
              <label>Period</label>
              <div>
                <input
                  type="text"
                  name="from"
                  onChange={(e) => HandleChangeExperience(e)}
                />
                <FontAwesomeIcon icon={faArrowRight} />
                <input
                  type="text"
                  name="to"
                  onChange={(e) => HandleChangeExperience(e)}
                />
              </div>
            </TenureBox>
            <InputBox>
              <label>Description</label>
              <textarea
                name="description"
                type="textArea"
                rows={5}
                cols={10}
                onChange={(e) => HandleChangeExperience(e)}
              />
            </InputBox>
            <small>
              You can add multiple entries by simply clicking on "add" and
              proceed with adding another entry.
            </small>
            <ToastContainer />
            <Button onClick={(e) => HandleAddExperience(e)}>Add</Button>
          </ContextBox>
          <ContextBox>
            <p>Projects</p>
            <hr />
            <InputBox>
              <label>Title</label>
              <input
                type="text"
                name="title"
                onChange={(e) => HandleChangeProject(e)}
              />
            </InputBox>
            <InputBox>
              <label>URL</label>
              <input
                type="text"
                name="url"
                onChange={(e) => HandleChangeProject(e)}
              />
            </InputBox>
            <TenureBox>
              <label>Period</label>
              <div>
                <input
                  type="text"
                  name="from"
                  onChange={(e) => HandleChangeProject(e)}
                />
                <FontAwesomeIcon icon={faArrowRight} />
                <input
                  type="text"
                  name="to"
                  onChange={(e) => HandleChangeProject(e)}
                />
              </div>
            </TenureBox>
            <InputBox>
              <label>Description</label>
              <textarea
                name="description"
                type="textArea"
                rows={5}
                cols={10}
                onChange={(e) => HandleChangeProject(e)}
              />
            </InputBox>
            <small>
              You can add multiple entries by simply clicking on "add" and
              proceed with adding another entry.
            </small>
            <ToastContainer />
            <Button onClick={(e) => HandleAddProjects(e)}>Add</Button>
          </ContextBox>
          <ContextBox>
            <p>Skills</p>
            <hr />
            <InputBox>
              <label>Skills</label>
              <input
                type="text"
                placeholder="Enter Skill Name"
                name="skill"
                onChange={(e) => HandleChangeSkills(e)}
              />
              <input
                type="number"
                min="0"
                max="5"
                placeholder="Enter a rating"
                name="rating"
                onChange={(e) => HandleChangeSkills(e)}
              />
            </InputBox>
            <small>
              You can add multiple entries by simply clicking on "add" and
              proceed with adding another entry.
            </small>
            <ToastContainer />
            <Button onClick={(e) => HanldeAddSkills(e)}>Add</Button>
          </ContextBox>

          <SubmitButton onClick={(e) => HandleCreateResume(e)}>
            Create A Resume
          </SubmitButton>
        </Form>
      </Content>
    </Container>
  );
};

export default ResumeForm;
