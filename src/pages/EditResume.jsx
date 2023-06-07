import { faArrowRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  AddAboutMe,
  AddExperience,
  AddProfile,
  AddProjects,
  AddSkill,
  Addacademics,
  DeleteAcademics,
  DeleteExperience,
  DeleteProjects,
  DeleteSkills,
} from "../redux/ResumeSlice";
import axios from "axios";
import { useParams } from "react-router-dom";
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

const EditResume = () => {
  const notify = () => toast("Section updated sucessfully!");

  const deleted = () => toast("Section deleted successfully...");

  const { id, profile, aboutMe, academics, Experience, Projects, Skills } =
    useSelector((state) => state.resumes);

  const [resumeData, setResumeData] = useState({});

  const { Resumeid } = useParams();

  const [Profile, setProfile] = useState({});
  const [AboutMe, setAboutMe] = useState("");
  const [Academics, setAcademics] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    let isSubscribe = true;

    const getData = async () => {
      try {
        const res = await axios.get("/api");

        let Data = res.data.filter((item) => item.id == Resumeid);

        setProfile(Data[0].profile);
        setAboutMe(Data[0].aboutMe);
        setAcademics(Data[0].academics);
        setExperience(Data[0].Experience);
        setProjects(Data[0].Projects);
        setSkills(Data[0].Skills);
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

  console.log(resumeData.profile);

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

  const HandleChangeAcademics = (e, id) => {
    const index = Academics.findIndex((academic) => academic.id === id);
    const updatedAcademics = [...Academics];

    if (index !== -1) {
      updatedAcademics[index] = {
        ...updatedAcademics[index],
        [e.target.name]: e.target.value,
      };

      setAcademics(updatedAcademics);
    }
  };

  const HandleAddAcademics = (e) => {
    e.preventDefault();

    dispatch(Addacademics({ ...resumeData.academics }));
    notify();
  };

  const HandleChangeExperience = (e, id) => {
    const index = experience.findIndex((item) => item.id === id);

    if (index !== -1) {
      const updatedExperience = [...experience];
      updatedExperience[index] = {
        ...updatedExperience[index],
        [e.target.name]: e.target.value,
      };

      setExperience(updatedExperience);
    }
  };
  const HandleAddExperience = (e) => {
    e.preventDefault();
    dispatch(AddExperience(experience));
    notify();
  };

  const HandleChangeProject = (e, id) => {
    const index = projects.findIndex((project) => project.id === id);

    if (index !== -1) {
      const updatedProjects = [...projects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [e.target.name]: e.target.value,
      };
      setProjects(updatedProjects);
    }
  };

  const HandleAddProjects = (e) => {
    e.preventDefault();
    dispatch(AddProjects(projects));
    notify();
  };

  const HandleChangeSkills = (e, id) => {
    const updatedSkills = skills.map((skill) => {
      if (skill.id === id) {
        return { ...skill, [e.target.name]: e.target.value };
      }
      return skill;
    });

    setSkills(updatedSkills);
  };

  const HanldeAddSkills = (e) => {
    e.preventDefault();
    dispatch(AddSkill(skills));
    notify();
  };

  const HandleDeleteAcademics = (e, id) => {
    e.preventDefault();

    // dispatch(DeleteAcademics({ id }));

    const updatedAcademics = Academics.filter((item) => item.id !== id);

    setAcademics(updatedAcademics);
    deleted();
  };

  const HandleDeleteExperience = (e, id) => {
    e.preventDefault();

    const updatedExperience = experience.filter((item) => item.id !== id);

    setExperience(updatedExperience);
    deleted();
  };

  const handleDeleteProjects = (e, id) => {
    e.preventDefault();

    const updatedProjects = experience.filter((item) => item.id !== id);

    setProjects(updatedProjects);
    deleted();
  };

  const handleDeleteSkills = (e, id) => {
    e.preventDefault();

    const updatedSkills = skills.filter((item) => item.id !== id);

    setSkills(updatedSkills);
    deleted();
  };

  const HandleUpdateResume = async (e) => {
    try {
      const res = await axios.put(`/api/${Resumeid}`, {
        id: Resumeid,
        profile: Profile,
        aboutMe: AboutMe,
        academics: Academics,
        Experience: experience,
        Projects: projects,
        Skills: skills,
      });

      console.log(res.status);

      if (res.status === 200) {
        alert("Resume is updated...");
        window.location.reload(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  Academics.map((item) => console.log(item));

  return (
    <Container>
      <Tilt>
        <TiltBg_1 />
        <TiltBg_2 />
      </Tilt>
      <Content>
        <Title>Edit your Resume with Following Simple Steps </Title>
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
                value={Profile?.name}
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
                value={Profile?.currentDesignation}
              />
            </InputBox>
            <InputBox>
              <label>Location &#42;</label>
              <input
                required
                name="location"
                type="text"
                onChange={(e) => HanldeChangeProfile(e)}
                value={Profile?.location}
              />
            </InputBox>
            <InputBox>
              <label>Email &#42;</label>
              <input
                required
                name="email"
                type="email"
                onChange={(e) => HanldeChangeProfile(e)}
                value={Profile?.email}
              />
            </InputBox>
            <InputBox>
              <label>Phone Number &#42;</label>
              <input
                required
                name="phone"
                type="text"
                onChange={(e) => HanldeChangeProfile(e)}
                value={Profile?.phone}
              />
            </InputBox>
            <InputBox>
              <label>Website </label>
              <input
                name="website"
                type="text"
                onChange={(e) => HanldeChangeProfile(e)}
                value={Profile?.website}
              />
            </InputBox>
            <ToastContainer />
            <Button onClick={(e) => HandleAddProfile(e)}>Update</Button>
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
                value={AboutMe}
              />
            </InputBox>
            <ToastContainer />
            <Button onClick={(e) => HandleAboutMe(e)}>Update</Button>
          </ContextBox>

          {Academics.map((items) => (
            <ContextBox>
              <p>Academics</p>
              <hr />
              <InputBox>
                <label>School/College/University Name</label>
                <input
                  type="text"
                  name="schoolName"
                  onChange={(e) => HandleChangeAcademics(e, items.id)}
                  value={items.schoolName}
                />
              </InputBox>
              <InputBox>
                <label>Degree/Certificate</label>
                <input
                  type="text"
                  name="degree"
                  onChange={(e) => HandleChangeAcademics(e, items.id)}
                  value={items?.degree}
                />
              </InputBox>
              <TenureBox>
                <label>Period</label>
                <div>
                  <input
                    type="text"
                    name="from"
                    onChange={(e) => HandleChangeAcademics(e, items.id)}
                    value={items?.from}
                  />
                  <FontAwesomeIcon icon={faArrowRight} />
                  <input
                    type="text"
                    name="to"
                    onChange={(e) => HandleChangeAcademics(e, items.id)}
                    value={items.to}
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
                  onChange={(e) => HandleChangeAcademics(e, items.id)}
                  value={items.description}
                />
              </InputBox>
              <small>
                You can add multiple entries by simply clicking on "add" and
                proceed with adding another entry.
              </small>
              <ToastContainer />
              <Button onClick={(e) => HandleAddAcademics(e)}>Update</Button>
              <Button onClick={(e) => HandleDeleteAcademics(e, items.id)}>
                Delete
              </Button>
            </ContextBox>
          ))}

          {experience?.map((items, id) => (
            <ContextBox>
              <p>Professional Experience</p>
              <hr />
              <InputBox>
                <label>Designation</label>
                <input
                  type="text"
                  name="designation"
                  onChange={(e) => HandleChangeExperience(e, items.id)}
                  value={items.designation}
                />
              </InputBox>
              <InputBox>
                <label>Organization</label>
                <input
                  type="text"
                  name="organization"
                  onChange={(e) => HandleChangeExperience(e, items.id)}
                  value={items.organization}
                />
              </InputBox>
              <InputBox>
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  onChange={(e) => HandleChangeExperience(e, items.id)}
                  value={items.location}
                />
              </InputBox>
              <TenureBox>
                <label>Period</label>
                <div>
                  <input
                    type="text"
                    name="from"
                    onChange={(e) => HandleChangeExperience(e, items.id)}
                    value={items.from}
                  />
                  <FontAwesomeIcon icon={faArrowRight} />
                  <input
                    type="text"
                    name="to"
                    onChange={(e) => HandleChangeExperience(e, items.id)}
                    value={items.to}
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
                  onChange={(e) => HandleChangeExperience(e, items.id)}
                  value={items.description}
                />
              </InputBox>
              <small>
                You can add multiple entries by simply clicking on "add" and
                proceed with adding another entry.
              </small>
              <ToastContainer />
              <Button onClick={(e) => HandleAddExperience(e)}>Update</Button>
              <Button onClick={(e) => HandleDeleteExperience(e, items.id)}>
                Delete
              </Button>
            </ContextBox>
          ))}

          {projects?.map((items) => (
            <ContextBox>
              <p>Projects</p>
              <hr />
              <InputBox>
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  onChange={(e) => HandleChangeProject(e, items.id)}
                  value={items.title}
                />
              </InputBox>
              <InputBox>
                <label>URL</label>
                <input
                  type="text"
                  name="url"
                  onChange={(e) => HandleChangeProject(e, items.id)}
                  value={items.url}
                />
              </InputBox>
              <TenureBox>
                <label>Period</label>
                <div>
                  <input
                    type="text"
                    name="from"
                    onChange={(e) => HandleChangeProject(e, items.id)}
                    value={items.from}
                  />
                  <FontAwesomeIcon icon={faArrowRight} />
                  <input
                    type="text"
                    name="to"
                    onChange={(e) => HandleChangeProject(e, items.id)}
                    value={items.to}
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
                  value={items.description}
                />
              </InputBox>
              <small>
                You can add multiple entries by simply clicking on "add" and
                proceed with adding another entry.
              </small>
              <ToastContainer />
              <Button onClick={(e) => HandleAddProjects(e)}>Update</Button>
              <Button onClick={(e) => handleDeleteProjects(e, items.id)}>
                Delete
              </Button>
            </ContextBox>
          ))}

          {skills?.map((items) => (
            <ContextBox>
              <p>Skills</p>
              <hr />
              <InputBox>
                <label>Skills</label>
                <input
                  type="text"
                  placeholder="Enter Skill Name"
                  name="skill"
                  onChange={(e) => HandleChangeSkills(e, items.id)}
                  value={items.skill}
                />
                <input
                  type="number"
                  min="0"
                  max="5"
                  placeholder="Enter a rating"
                  name="rating"
                  onChange={(e) => HandleChangeSkills(e, items.id)}
                  value={items.rating}
                />
              </InputBox>
              <small>
                You can add multiple entries by simply clicking on "add" and
                proceed with adding another entry.
              </small>
              <ToastContainer />
              <Button onClick={(e) => HanldeAddSkills(e)}>Update</Button>
              <Button onClick={(e) => handleDeleteSkills(e, items.id)}>
                Delete
              </Button>
            </ContextBox>
          ))}

          <SubmitButton onClick={(e) => HandleUpdateResume(e)}>
            Upadate Resume
          </SubmitButton>
        </Form>
      </Content>
    </Container>
  );
};

export default EditResume;
