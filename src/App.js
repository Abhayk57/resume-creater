import styled from "styled-components";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleResume from "./pages/SingleResume";
import ResumeForm from "./pages/ResumeForm";
import Navbar from "./components/Navbar";
import EditResume from "./pages/EditResume";

const Container = styled.main`
  display: flex;
  width: 100%;
  min-height: 100vh;
  flex-direction: column;
`;

function App() {
  return (
    <Container>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view-resume/:id" element={<SingleResume />} />
          <Route path="/create-resume" element={<ResumeForm />} />
          <Route path="/edit-resume/:Resumeid" element={<EditResume />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
