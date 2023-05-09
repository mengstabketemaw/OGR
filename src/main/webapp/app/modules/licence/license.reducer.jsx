import axios from 'axios';
import {createAsyncThunk, createSlice, isFulfilled} from '@reduxjs/toolkit';
import {serializeAxiosError} from 'app/shared/reducers/reducer.utils';

const initialState = {
  loading: false,
  errorMessage: null,
  licenses:[],
  license:{},
  totalItems: 0,
};


// Actions
export const getLicenceAll = createAsyncThunk('fetch_licences', async () => axios.get('api/licence'), {
  serializeError: serializeAxiosError,
});
export const createLicence = createAsyncThunk(
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

export const LicenceSlice = createSlice({
  name: 'licence',
  initialState: initialState ,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getLicenceAll.fulfilled, (state, action) => {
        state.loading = false;
        state.licenses = action.payload.data;
      })
      .addCase(getLicence.fulfilled, (state, action) => {
      state.loading = false;
      state.license = action.payload.data;
      })
      .addMatcher(isFulfilled(createLicence), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        //state.user = action.payload.data;
      })

  },
});

// Reducer
export default LicenceSlice.reducer;
