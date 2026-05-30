import { configureStore } from "@reduxjs/toolkit";
import authreducer from '../auth/slice/auth.slice'

 export const store = configureStore({
    reducer :{
auth : authreducer  ,

    }
 })