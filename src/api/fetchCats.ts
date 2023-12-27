import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCats = createAsyncThunk('cats/fetchCats',
    async () => {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');
        return response.data;
    });