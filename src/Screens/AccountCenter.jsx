import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../Components/Login';
import authservice from '../Appwrite/Auth';
import { useNavigate } from 'react-router-dom';
import { deletereviews } from '../Store/ReviewSlice';
import { UserIcon } from '@heroicons/react/solid';

function AccountCenter() {
  const authStatus = useSelector((state) => state.auth.status);
  const authUserData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [status,setStatus] = useState(false)


  useEffect(()=>{

setStatus(authStatus)

  },[])



  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await authservice.logout();
      if (data) {
        navigate("/");
        dispatch(deletereviews());
      } else {
        console.error("Logout failed: no data returned.");
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {status ? (
        <div className="flex items-center justify-center mt-20 ms-4 me-4 bg-gray-100">
          <div className="bg-white p-8 rounded-3xl shadow-md w-full max-w-md">
            <div className="flex flex-col items-center text-center">
              {/* User Icon */}
              <div className="mb-4">
                <UserIcon className="h-28 w-28 text-gray-500 bg-gray-100 p-3 rounded-full shadow-md" />
              </div>

              {/* User Info */}
              <p className="text-2xl font-bold text-gray-700 mb-2">
                Hey, {authUserData?.name || 'User'}!
              </p>
              <p className="text-md text-gray-500 mb-8">
                Email: {authUserData?.email || 'No email'}
              </p>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className={`bg-blue-500 text-white font-bold py-2 px-6 rounded-full shadow hover:bg-blue-700 transition duration-200 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? "Logging Out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}

      <button onClick={()=>{
        console.log(status)
      }}>kjbbj</button>
    </>
  );
}

export default AccountCenter;
