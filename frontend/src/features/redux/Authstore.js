import { configureStore } from "@reduxjs/toolkit";
import authreducer from '../auth/slice/auth.slice'
import emotionreducer from '../Facedetection/slice/emotion.slice'

 export const store = configureStore({
    reducer :{
auth : authreducer  ,
emotion : emotionreducer

    }
 })