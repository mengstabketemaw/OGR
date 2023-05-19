import axios from 'axios';
import {createAsyncThunk, createSlice, isFulfilled} from '@reduxjs/toolkit';
import {serializeAxiosError} from 'app/shared/reducers/reducer.utils';

const initialState = {
  loading: false,
  errorMessage: null,
  currentFields:{},
  currentState:{},
  totalItems: 0,
};


// Actions
export const getFieldsByState = createAsyncThunk('fetch_state_fields', async ({id,state_id}, thunkAPI) => axios.get(`api/forms/state/${id}/${state_id}`), {
  serializeError: serializeAxiosError,
});



export const WorkflowSlice = createSlice({
  name: 'workflow',
  initialState: initialState ,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(getFieldsByState.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFields = action.payload.data;
      })


  },
});

// Reducer
export default WorkflowSlice.reducer;
