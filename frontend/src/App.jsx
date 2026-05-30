import React from 'react'
import Facedetection from './features/Facedetection/Facedetection'
import { RouterProvider } from 'react-router'
import { router } from '../app.routes'
import { Provider } from 'react-redux'
import { store } from './features/redux/Authstore'

const App = () => {
  return (
    <div>
      <Provider  store = {store}>
  <RouterProvider  router = {router} />

      </Provider>
    
    </div>
  )
}

export default App
