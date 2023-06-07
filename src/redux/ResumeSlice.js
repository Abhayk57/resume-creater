import { createSlice } from "@reduxjs/toolkit";

const ResumeSlice = createSlice({
  name: "userResume",
  initialState: {
    id: null,
    profile: {},
    aboutMe: "",
    academics: [],
    Experience: [],
    Projects: [],
    Skills: [],
  },

  reducers: {
    AddProfile: (state, action) => {
      state.profile = action.payload;
      state.id =
        state.id === null &&
        new Date().getTime() + Math.floor(Math.random() * 1234252635667373);
    },
    AddAboutMe: (state, action) => {
      state.aboutMe = action.payload;
    },
    Addacademics: (state, action) => {
      const id = action.payload.academics?.id;

      const index = state.academics.findIndex((ac) => ac.id == id);

      if (index > 0) {
        state.academics[index] = action.payload;
      } else {
        state.academics.push({
          id:
            new Date().getTime() + Math.floor(Math.random() * 1234252635667373),
          ...action.payload,
        });
      }
    },

    AddExperience: (state, action) => {
      const { id } = action.payload;

      const index = state.Experience.findIndex((ac) => ac.id == id);
      if (index >= 0) {
        state.Experience[index] = action.payload;
      } else {
        state.Experience.push({
          id:
            new Date().getTime() + Math.floor(Math.random() * 1234252635667373),
          ...action.payload,
        });
      }
    },

    AddProjects: (state, action) => {
      const { id } = action.payload;

      const index = state.Projects.findIndex((ac) => ac.id == id);
      if (index >= 0) {
        state.Projects[index] = action.payload;
      } else {
        state.Projects.push({
          id:
            new Date().getTime() + Math.floor(Math.random() * 1234252635667373),
          ...action.payload,
        });
      }
    },

    AddSkill: (state, action) => {
      const { id } = action.payload;

      const index = state.Skills.findIndex((ac) => ac.id == id);

      if (index >= 0) {
        state.Skills[index] = action.payload;
      } else {
        state.Skills.push({
          id:
            new Date().getTime() + Math.floor(Math.random() * 1234252635667373),
          ...action.payload,
        });
      }
    },

    DeleteAcademics: (state, action) => {
      const { id } = action.payload;

      state.academics.filter((ac) => ac.id == id);
    },

    DeleteExperience: (state, action) => {
      const { id } = action.payload;

      state.Experience.filter((e) => e.id == id);
    },

    DeleteProjects: (state, action) => {
      const { id } = action.payload;

      state.Projects.filter((p) => p.id == id);
    },

    DeleteSkills: (state, action) => {
      const { id } = action.payload;

      state.Skills.filter((p) => p.id == id);
    },
  },
});

export const {
  AddProfile,
  AddAboutMe,
  Addacademics,
  AddExperience,
  AddProjects,
  AddSkill,
  DeleteAcademics,
  DeleteExperience,
  DeleteProjects,
  DeleteSkills,
} = ResumeSlice.actions;

export default ResumeSlice.reducer;
