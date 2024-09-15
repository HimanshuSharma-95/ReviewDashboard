import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import React, { Component } from 'react';

import store from './Store/Store.js'
import { Provider } from 'react-redux';

import AccountCenter from './Screens/AccountCenter.jsx';
import HomeScreen from './Screens/HomeScreen.jsx';
import ResetPassword from './Screens/ResetPasswordScreen.jsx';
import RecoveryRequest from './Components/RecoveryRequest.jsx';




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,  // Use `index` for the default route under the parent path
        element: <HomeScreen />,
      },
      {
        path: "account",
        element: <AccountCenter />,
      },{
        path:"forgotpassword",
        element:<ResetPassword/>
      },
      {
        path:"recoveryrequest",
        element:<RecoveryRequest/>
      }
    ]
  }
]);



createRoot(document.getElementById('root')).render(

  <Provider store={store} >
  <RouterProvider router={router} />
  </Provider>
)
