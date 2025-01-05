import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateNickname = createAsyncThunk(
    'user/updateNickname',
    async (nickname) => {
      try {
        const requestData = { nickname: nickname };
        const { data } = await axios.put(`/v1/users/nickname`, requestData);
        return data;
      } catch (error) {
        throw error;
      }
    }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    nickname: null,
  },
  reducers: {
    setNickname: (state, action) => {
      state.nickname = action.payload;
    },
  }
});

export const { setNickname } = userSlice.actions;

export default userSlice.reducer;