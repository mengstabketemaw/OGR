import axios from 'axios';
import {createAsyncThunk, createSlice, isFulfilled} from '@reduxjs/toolkit';
import {serializeAxiosError} from 'app/shared/reducers/reducer.utils';
import {createUser, updateUser} from "app/modules/administration/user-management/user-management.reducer";

const initialState = {
  loading: false,
  errorMessage: null,
  formTypes: [] ,
  form: {},
  fieldTypes:[],
  totalItems: 0,
};


// Actions
export const getFormType = createAsyncThunk('fetch_forms', async () => axios.get('api/forms'), {
  serializeError: serializeAxiosError,
});

export const getFieldType = createAsyncThunk('fetch_field_types'
  , async () => axios.get('/api/custome-field/names'), {
  serializeError: serializeAxiosError,
});

export const updateForm = createAsyncThunk(
  'update_forms',
  async (form, thunkAPI) => {
    return await axios.post('/api/forms', form);
  },
  { serializeError: serializeAxiosError }
);

export const FormSlice = createSlice({
  name: 'form',
  initialState: initialState ,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFormType.fulfilled, (state, action) => {
        state.loading = false;
        state.formTypes = action.payload.data;
      })
      .addCase(getFieldType.fulfilled, (state, action) => {
        state.loading = false;
        state.fieldTypes = action.payload.data;
      })
      .addMatcher(isFulfilled(updateForm), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        //state.user = action.payload.data;
      })
  },
});

// Reducer
export default FormSlice.reducer;
