import { createSlice } from "@reduxjs/toolkit";
const initialeState ={
    users:[],
    loading:false,
    error:null
}

export const getallusers = createAsyncThunk('auth/getallusers', async (_, { rejectWithValue }) => { 
    try {
        const res = await api.get('/auth/users');
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response.data.message);
    }   
});

const usersSlice = createSlice({
    name:'users',
    initialeState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getallusers.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getallusers.fulfilled,(state,action)=>{
            state.loading = false;
            state.users = action.payload;
        })
        .addCase(getallusers.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })      
    }
})
export default usersSlice.reducer;