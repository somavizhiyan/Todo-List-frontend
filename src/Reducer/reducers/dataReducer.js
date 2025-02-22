import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  todoDataApi,
  todoDataApiDelete,
  todoDataApiUpdate,
  gettodoDataApi,
} from "../../service/api";

const namespace = "TodoDatas";

export const todoDataCreate = createAsyncThunk(
  `${namespace}/todoDataCreate`,
  async (formData, {rejectWithValue}) => {
    try {
      const responce = await todoDataApi(formData);
      console.log(responce, "responceFromCreateApi");
      return responce;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const gettodoData = createAsyncThunk(
  `${namespace}/gettodoData`,
  async (query, {rejectWithValue}) => {
    try {
      const responce = await gettodoDataApi(query);
      console.log(responce, "responceFromgetApi");
      return responce;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const todoDataUpdate = createAsyncThunk(
  `${namespace}/todoDataUpdate`,
  async (formData, { rejectWithValue }) => {
    try {
      const responce = await todoDataApiUpdate(formData);
      console.log(responce, "responceFromUpdateApi");
      return responce;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const todoDataDelete = createAsyncThunk(
  `${namespace}/todoDataDelete`,
  async (formData, {rejectWithValue}) => {
    try {
      const responce = await todoDataApiDelete(formData);
      console.log(responce, "responceFromDeleteteApi");
      return responce;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


const initialState = {
  createtododata: "",
  createtododataLoading: false,
  updatetododata: "",
  updatetododataLoading: false,
  deletetododata: "",
  deletetododataLoading: false,
  gettododata: [],
  gettododataLoading: false,
};

const todoDataSlice = createSlice({
  name: `${namespace}`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(todoDataCreate.pending, (state) => {
        state.createtododataLoading = true;
      })
      .addCase(todoDataCreate.fulfilled, (state, action) => {
        state.createtododataLoading = false;
        state.createtododata = action?.payload?.data?.message;
        toast.success(`${action?.payload?.data?.message}`,{position:"top-right"})
        console.log(action?.payload?.data?.message, "actionFromCreateslice");
      })
      .addCase(todoDataCreate.rejected, (state, action) => {
        state.createtododataLoading = false;
        state.createtododata = action?.payload?.response?.data?.error;
        toast.error(`${action?.payload?.response?.data?.error}`,{position:"top-right"})
        console.log(action?.payload?.response?.data?.error, "actionFromCreateslice");
      })
      .addCase(todoDataUpdate.pending, (state) => {
        state.updatetododataLoading = true;
      })
      .addCase(todoDataUpdate.fulfilled, (state, action) => {
        state.updatetododataLoading = false;
        state.updatetododata = action?.payload?.data?.message;
        toast.success(`${action?.payload?.data?.message}`,{position:"top-right"})
        console.log(action?.payload?.data?.message, "actionFromUpdateslice");
      })
      .addCase(todoDataUpdate.rejected, (state, action) => {
        state.updatetododataLoading = false;
        state.updatetododata = action?.payload?.response?.data?.error;
        toast.error(`${action?.payload?.response?.data?.error}`)
        console.log(action?.payload?.response?.data?.error, "actionFromUpdateslice");
      })
      .addCase(todoDataDelete.pending, (state) => {
        state.deletetododataLoading = true;
      })
      .addCase(todoDataDelete.fulfilled, (state, action) => {
        state.deletetododataLoading = false;
        state.deletetododata = action?.payload?.data?.message;
        toast.success(`${action?.payload?.data?.message}`,{position:"top-right"})
        console.log(action?.payload?.data?.message, "actionFromDeleteslice");
      })
      .addCase(todoDataDelete.rejected, (state, action) => {
        state.deletetododataLoading = false;
        state.deletetododata = action?.payload?.response?.data?.error;
        toast.error(`${action?.payload?.response?.data?.error}`)
        console.log(action?.payload?.response?.data?.error, "actionFromDeleteslice");
      })
      .addCase(gettodoData.pending, (state) => {
        state.gettododataLoading = true;
      })
      .addCase(gettodoData.fulfilled, (state, action) => {
        state.gettododataLoading = false;
        state.gettododata = action?.payload?.data;
        console.log(action?.payload?.data, "actionFromDeleteslice");
      })
      .addCase(gettodoData.rejected, (state, action) => {
        state.gettododataLoading = false;
        state.gettododata = action?.payload?.data?.error;
        console.log(action?.payload?.data?.error, "actionFromDeleteslice");
      });
  },
});

export const todoDataSelector = (state) => state.TodoDatas;
export default todoDataSlice.reducer;
