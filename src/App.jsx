import React, { useEffect, useState } from "react";
import Dashboardservice from "./Appwrite/Dashboard";
import { DrawerSecondary } from "./Drawer";
import { useDispatch, useSelector } from "react-redux";
import { FaBars, FaSync } from 'react-icons/fa';
import authservice from "./Appwrite/Auth";
import { login, logout } from "./Store/AuthSlice";
import { Outlet } from "react-router-dom";

function App() {
 
  const [drawerSecondaryOpen, setDrawerSecondaryOpen] = useState(false);




  const toggleDrawer = () => {
    setDrawerSecondaryOpen(prevState => !prevState);
  };

  return (
    <>
      {/* Drawer */}
      <DrawerSecondary open={drawerSecondaryOpen} onClose={() => setDrawerSecondaryOpen(false)} />

      {/* Heading */}
      <div className="flex items-center justify-start p-4">
        {/* Drawer Icon */}
        <button onClick={toggleDrawer} className="me-3 ms-2">
          <FaBars size={20} color="Black" /> {/* Smaller Drawer Icon */}
        </button>

        {/* Reviews Text */}
        <h1 className="text-2xl font-bold text-blue-500">
          Reviews
        </h1>

      </div>


      {/* Render the child routes */}
      <Outlet />
    </>
  );
}

export default App;
