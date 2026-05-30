import { FaceDetector } from "@mediapipe/tasks-vision"
import { createBrowserRouter } from "react-router"
import Facedetection from "./src/features/Facedetection/Facedetection"
import Hero from "./src/features/pages/Hero"
import Login from "./src/features/auth/Login"
import Register from "./src/features/auth/Register"
import Second from "./src/features/pages/Second"

import AffectraWelcomeHub from "./src/features/components/AffectraWelcomeHub"
import Welcome from "./src/features/components/AffectraWelcomeHub"
import Protected from "./src/features/auth/Protected"

import Show1 from "./src/features/Facedetection/Show1"
import Show from "./src/features/pages/Show"
import Card from "./src/features/Facedetection/Card"

export const router = createBrowserRouter([
{
    path : '/face' ,
    element : <Protected>
        <Facedetection/>
    </Protected>
}
,
{
    path : '/',
    element : <Show/>
},
{
    path : '/hero',
    element : <Hero/>
},
{
    path: '/login',
    element : <Login/>
}
,{
    path : '/register',
    element : <Register/>
}
,{
    path : 'second',
    element : <Second/>
}
,{
    path:'/welcome' ,
    element : <Welcome/>
}
,{
    path : "/show1",
    element : <Show1/>
}
,{
    path:"/card" ,
    element: <Card/>
}

])
