import axios from 'axios';
import {createAsyncThunk, createSlice, isFulfilled} from '@reduxjs/toolkit';
import {serializeAxiosError} from 'app/shared/reducers/reducer.utils';
import {updateForm} from "app/modules/form/form.reducer";

const initialState = {
  loading: false,
  errorMessage: null,
  currentFields:{},
  currentState:{},
  currentFieldData:{},
  totalItems: 0,
};


// Actions
export const getFieldsByState = createAsyncThunk('fetch_state_fields', async ({id,state_id}, thunkAPI) => axios.get(`api/forms/state/${id}/${state_id}`), {
  serializeError: serializeAxiosError,
});
export const getFieldsDataByLicence =
  createAsyncThunk('fetch_fields_data', async (l_id, thunkAPI) => axios.get(`/api/initialReview/licence/${l_id}`), {
  serializeError: serializeAxiosError,
});

export const createInitialReview = createAsyncThunk(
  'create_initial_review',
  async (ir, thunkAPI) => {
    return await axios.post('/api/initialReview', ir);
  },
  { serializeError: serializeAxiosError }
);


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
      .addCase(getFieldsDataByLicence.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFieldData = action.payload.data;
      })
      .addMatcher(isFulfilled(createInitialReview), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        //state.user = action.payload.data;
      })

  },
});

// Reducer
export default WorkflowSlice.reducer;
