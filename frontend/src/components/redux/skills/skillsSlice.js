import { createSlice } from "@reduxjs/toolkit";
const skillSlice = createSlice({
    name:"skills",
    initialState: {skill:[],userSkills:[]},
    reducers:{
       
setSkillByUser: (state, action) => {
    const userId = action.payload.userId;
    const skills = state.skill.filter((s) => s.user_id === userId);
    state.skill = action.payload;
    console.log("skills by user: ",action.payload);

  },
  setSkills:(state, action) => {
    console.log("set all skills",action.payload)
    state.skill =action.payload;
  },
  setSkillforUser: (state, action) => {
    console.log("set skills for skills",action.payload)

    state.userSkills = action.payload;
  },
}
})

export const {setSkillByUser,setSkills,setSkillforUser } = skillSlice.actions
export default skillSlice.reducer