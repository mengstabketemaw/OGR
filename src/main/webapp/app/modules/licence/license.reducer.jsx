import axios from 'axios';
import {createAsyncThunk, createSlice, isFulfilled} from '@reduxjs/toolkit';
import {serializeAxiosError} from 'app/shared/reducers/reducer.utils';
import {formatSequence} from "app/shared/common/formatSequence";

const initialState = {
  loading: true,
  errorMessage: null,
  licenses:[],
  license:{},
  workflow: [],
  currentSequence:[],
  states:[],
  totalItems: 0,
};


// Actions
export const getLicenceAll = createAsyncThunk('fetch_licences', async () => axios.get('api/licence'), {
  serializeError: serializeAxiosError,
});
export const getLicenceByForm = createAsyncThunk('fetch_licences_by_form', async (id) => axios.get(`api/licence/form/${id}`), {
  serializeError: serializeAxiosError,
});
export const  createLicence =  createAsyncThunk(
  'create_licence',
  async (licence) => {
    return await axios.post('/api/licence', licence);
  },
  { serializeError: serializeAxiosError }
);

export const updateLicence = createAsyncThunk(
  'update_licence',
  async (licence, id) => {
    return await axios.post(`/api/licence/${id}`, licence);
  },
  { serializeError: serializeAxiosError }
);
export const getLicence = createAsyncThunk('fetch_licence', async (id) => axios.get(`api/licence/${id}`), {
  serializeError: serializeAxiosError,
});
// export const getAllWorkflows = createAsyncThunk('fetch_workflows',
//   async () => axios.get(`api/workflow/`), {
//     serializeError: serializeAxiosError,
//   });
export const getWorkflowByForm = createAsyncThunk('fetch_workflowByForm',
  async (id) => axios.get(`api/workflow/form/${id}`), {
  serializeError: serializeAxiosError,
});
export const getState = createAsyncThunk('fetch_state',
  async () => axios.get(`api/workflow/state`), {
    serializeError: serializeAxiosError,
  });
export const  createWorkflow =  createAsyncThunk(
  'create_workflow',
  async (workflow) => {
    return await axios.post('/api/workflow', workflow);
  },
  { serializeError: serializeAxiosError }
);
export const updateWorkflow = createAsyncThunk(
  'update_workflow',
  async (workflow, id) => {
    return await axios.post(`/api/workflow/${id}`, workflow);
  },
  { serializeError: serializeAxiosError }
);

export const deleteLicence = createAsyncThunk(
  'deleteLicence',
  async (id) => {
    return await axios.delete(`/api/licence/${id}`);
  },
  { serializeError: serializeAxiosError }
);

export const LicenceSlice = createSlice({
  name: 'licence',
  initialState ,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getLicenceAll.fulfilled, (state, action) => {
        state.loading = false;
        state.licenses = action.payload.data;
        state.totalItems = parseInt(action.payload.headers['x-total-count'], 10);
      })
      .addCase(deleteLicence.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getLicenceByForm.fulfilled, (state, action) => {
        state.loading = false;
        state.licenses = action.payload.data;
        state.totalItems = parseInt(action.payload.headers['x-total-count'], 10);
      })
      .addCase(getLicence.fulfilled, (state, action) => {
      state.loading = false;
      state.license = action.payload.data;
      })
      .addCase(getWorkflowByForm.fulfilled, (state, action) => {
        state.loading = false;
        state.workflow = action.payload.data;
        state.currentSequence = formatSequence(action.payload.data?.workFlowSequences)
      })
      .addCase(getState.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload.data;
      })
      .addMatcher(isFulfilled(createLicence,updateLicence,updateWorkflow,createWorkflow), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        //state.user = action.payload.data;
      })

  },
});

// Reducer
export default LicenceSlice.reducer;
