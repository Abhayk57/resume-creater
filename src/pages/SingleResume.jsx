import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100%;
  position: relative;
  padding-bottom: 56.25%;
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
`;

const Title = styled.h2`
  z-index: 10;
  font-size: 1.8em;
  color: #ffffff;
  font-weight: 700;
`;

const ContextBox = styled.div`
  display: flex;
  gap: 1em;
  background-color: #ffff;
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.2);
  border-radius: 0.3em;
  padding: 2em;
  p {
    color: #494949;
    font-size: 1.2em;
    font-weight: 600;
  }

  hr {
    color: #494949;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border-right: 1px solid #2dc46a;
  padding: 1em;
  gap: 0.8em;
`;

const Skills = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Skill = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 1em;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
  padding: 1em;
  gap: 2em;
`;

const Button = styled(Link)`
  font-size: 1em;
  background-color: #ffffff;
  color: #333333;
  width: 10em;
  padding: 0.4em;
  border: none;
  border-radius: 0.4em;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8em;

  p {
    font-size: 0.9em;
    text-align: justify;
  }
`;

const Education = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.6em;
  }

  p {
    font-size: 0.9em;
    text-align: justify;
  }
`;

const Experience = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.6em;
  }

  p {
    font-size: 0.9em;
    text-align: justify;
  }
`;

const Projects = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.6em;
  }

  p {
    font-size: 0.9em;
    text-align: justify;
  }
`;

const Stars = styled.div`
  display: flex;
`;

const SingleResume = () => {
  const { id } = useParams();

  const [resumeData, setResumeData] = useState({});

  console.log(id);

  useEffect(() => {
    let isSubscribe = true;

    const getData = async () => {
      try {
        const res = await axios.get("/api");

        console.log(res.data);

        let Data = res.data.filter((item) => item.id == id);

        console.log(Data);

        setResumeData(Data[0]);
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
  }, [id]);

  console.log(resumeData);

  return (
    <Container>
      <Tilt>
        <TiltBg_1 />
        <TiltBg_2 />
      </Tilt>

      <Content>
        <Button to={`/edit-resume/${id}`}>Edit</Button>
        <ContextBox>
          <Left>
            <p>{resumeData.profile?.location}</p>
            <small>{resumeData.profile?.email}</small>
            <small>{resumeData.profile?.phone}</small>
            <small>{resumeData.profile?.website}</small>

            <Skills>
              <h4>Skills</h4>
              {resumeData.Skills?.map((item, id) => (
                <div>
                  <Skill>{item.skill}</Skill>
                  <Stars>
                    {Array(parseInt(item.rating))
                      .fill()
                      .map((_, id) => (
                        <FontAwesomeIcon
                          icon={faStar}
                          style={{ color: "#2dc46a" }}
                        />
                      ))}
                  </Stars>
                </div>
              ))}

              {/* <div>
                <Skill>React.js</Skill>
                <Stars>
                  <FontAwesomeIcon icon={faStar} style={{ color: "#2dc46a" }} />
                  <FontAwesomeIcon icon={faStar} style={{ color: "#2dc46a" }} />
                  <FontAwesomeIcon icon={faStar} style={{ color: "#2dc46a" }} />
                  <FontAwesomeIcon icon={faStar} style={{ color: "#2dc46a" }} />
                  <FontAwesomeIcon icon={faStar} style={{ color: "#2dc46a" }} />
                </Stars>
              </div> */}
            </Skills>
          </Left>
          <Right>
            <Profile>
              <h1>{resumeData.profile?.name}</h1>
              <h4>{resumeData.profile?.currentDesignation}</h4>
              <p>{resumeData?.aboutMe}</p>
            </Profile>
            <hr />
            <Education>
              <h2>Education</h2>
              {resumeData.academics?.map((items, id) => (
                <div>
                  <h4>{items.schoolName}</h4>
                  <small>
                    {items.from} - {items.to}
                  </small>
                  <p>{items.degree}</p>
                  <p>{items.description}</p>
                </div>
              ))}

              <hr />
            </Education>
            <Experience>
              <h2>Experience</h2>
              {resumeData.Experience?.map((items, id) => (
                <div>
                  <h4>{items.designation}</h4>
                  <small>{items.organozation}</small>
                  <small>
                    {items.from} - {items.to}
                  </small>
                  <p>{items.description}</p>
                </div>
              ))}

              <hr />
            </Experience>
            <Projects>
              <h2>Projects</h2>
              {resumeData.Projects?.map((items, id) => (
                <div>
                  <h4>{items.title}</h4>
                  <small>{items.url}</small>
                  <small>
                    {items.from} - {items.to}
                  </small>
                  <p>{items.description}</p>
                </div>
              ))}
              <hr />
            </Projects>
          </Right>
        </ContextBox>
      </Content>
    </Container>
  );
};

export default SingleResume;
