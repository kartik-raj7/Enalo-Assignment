import { configureStore } from "@reduxjs/toolkit";
import getReducer from './getApi'
export default configureStore({
    reducer:{
        getPosts: getReducer,
    },
});