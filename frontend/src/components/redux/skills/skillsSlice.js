import { createSlice } from "@reduxjs/toolkit";
const skillSlice = createSlice({
    name:"skills",
    initialState: {skill:[]},
    reducers:{
       
setSkillByUser: (state, action) => {
    const userId = action.payload.userId;
    const skills = state.skill.filter((s) => s.user_id === userId);
    state.skill = action.payload;
    console.log("projectoo: ",action.payload);

  },
}
})

export const {setSkillByUser } = skillSlice.actions
export default skillSlice.reducer