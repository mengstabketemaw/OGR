import axios from 'axios';
import {createAsyncThunk, createSlice, isFulfilled} from '@reduxjs/toolkit';
import {serializeAxiosError} from 'app/shared/reducers/reducer.utils';
import {updateForm} from "app/modules/form/form.reducer";

const initialState = {
  loading: false,
  errorMessage: null,
  currentFields:{},
  currentStateId:{},
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

export const createTechnicalReview = createAsyncThunk(
  'create_technical_review',
  async (tr, thunkAPI) => {
    return await axios.post('/api/technicalReview', tr);
  },
  { serializeError: serializeAxiosError }
);

export const getFieldsDataByLicenceTR =
  createAsyncThunk('fetch_fields_dataTR', async (t_id, thunkAPI) => axios.get(`/api/technicalReview/licence/${t_id}`), {
    serializeError: serializeAxiosError,
  });


export const createSpecializedReview = createAsyncThunk(
  'create_specialized_review',
  async (ir, thunkAPI) => {
    return await axios.post('/api/specializedReview', ir);
  },
  { serializeError: serializeAxiosError }
);

export const getFieldsDataByLicenceSR =
  createAsyncThunk('fetch_fields_dataSR', async (l_id, thunkAPI) => axios.get(`/api/specializedReview/licence/${l_id}`), {
    serializeError: serializeAxiosError,
  });



export const getFieldsDataByLicenceDM =
  createAsyncThunk('fetch_fields_dataDM', async (l_id, thunkAPI) => axios.get(`/api/decisionMaking/licence/${l_id}`), {
    serializeError: serializeAxiosError,
  });

export const createDecisionMaking = createAsyncThunk(
  'create_Decision_Making',
  async (ir, thunkAPI) => {
    return await axios.post('/api/decisionMaking', ir);
  },
  { serializeError: serializeAxiosError }
);

export const updateStatusAndState = createAsyncThunk(
  'update_status_state',
  async (p, thunkAPI) => {
    const url = `/api/licence/updateLicenceStage/${p.id}?stateId=${p.data.stateId}&status=${p.data.status}`;
    return await axios.put(url);
  },
  { serializeError: serializeAxiosError }
);
export const updateRemark = createAsyncThunk(
  'update_status_state',
  async (p, thunkAPI) => {
    const url = `/api/licence/moreReqRemark/${p.id}?remark=${p.data.remark}`;
    return await axios.put(url);
  },
  { serializeError: serializeAxiosError }
);
export const getStateOfLicence  = createAsyncThunk('fetch_licence', async (id) => axios.get(`api/licence/${id}`), {
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
      .addCase(getFieldsDataByLicence.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFieldData = action.payload.data;
      })
      .addCase(getFieldsDataByLicenceTR.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFieldData = action.payload.data;
      })
      .addCase(getFieldsDataByLicenceSR.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFieldData = action.payload.data;
      })
      .addCase(getFieldsDataByLicenceDM.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFieldData = action.payload.data;
      })
      .addCase(getStateOfLicence.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStateId = action.payload.data.stage.id;
      })
      .addMatcher(isFulfilled(createInitialReview,createTechnicalReview,createSpecializedReview,createDecisionMaking), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        //state.user = action.payload.data;
      })

  },
});

// Reducer
export default WorkflowSlice.reducer;
