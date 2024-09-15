import React from "react";
import { Drawer, Button, Typography, IconButton } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export function DrawerSecondary({ open, onClose }) {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleAccountClick = () => {
    navigate("/account"); // Navigate to /account when the button is clicked
    onClose()
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      className="p-4 fixed top-0 left-0 h-full z-50 max-w-6xl" // Adjusted positioning and width
    >
      <div className="mb-6 flex items-center justify-between">
        <Typography variant="h5" color="blue-gray">
          Review Manager
        </Typography>
        <IconButton variant="text" color="blue-gray" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>
  
      <div className="flex flex-col gap-2"> {/* Changed to flex-col to stack buttons vertically */}
      <Button
          size="sm"
          color="blue"
          onClick={()=>{
            navigate("/")
            onClose()
          }} // Added click handler
        >
          Home
        </Button>
        <Button
          size="sm"
          color="blue"
          onClick={handleAccountClick} // Added click handler
        >
          Account
        </Button>

      </div>
    </Drawer>
  );
}
