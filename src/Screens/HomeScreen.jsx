import React, { useEffect, useState } from "react";
import Dashboardservice from "../Appwrite/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { FaSync } from "react-icons/fa";
import ReviewCard from '../Components/ReviewCard';
import authservice from "../Appwrite/Auth";
import { login, logout } from "../Store/AuthSlice";
import { savereviews } from "../Store/ReviewSlice";
import { useNavigate } from "react-router-dom";

function HomeScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const authUserData = useSelector(state => state.auth.userData);
    const authStatus = useSelector(state => state.auth.status);
    const Slicereviews = useSelector(state => state.rev.reviews);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await authservice.getcurrentuser();
                if (userData) {
                    dispatch(login(userData));
                    if (authStatus) {
                        fetchReviews(); // Fetch reviews for the user
                    }
                } else {
                    dispatch(logout());
                    setError("Please log in to view reviews");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Failed to fetch user data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Call the fetch function
    }, [authStatus, dispatch]);


  const fetchReviews = () => {
        if (authUserData?.$id) {
            setLoading(true);
            setError(null);

            Dashboardservice.GetReviews(authUserData.$id)
                .then(response => {
                    const fetchedReviews = response.documents || [];
                    dispatch(savereviews(fetchedReviews));
                })
                .catch(error => {
                    console.error("Error fetching reviews:", error);
                    setError("Failed to fetch reviews. Please try again later.");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };


    function handleDelete(id) {
        Dashboardservice.DeleteReview(id)
          .then(response => {
            if (response) {
              fetchReviews()
            } else {
              window.alert('Something went wrong. Please try again.');
            }
          })
          .catch(error => {
            console.error('Error deleting review:', error);
            window.alert('Something went wrong. Please try again.');
          });
      }

    return (
        <>
            {authStatus && (
                <button
                    onClick={fetchReviews}
                    disabled={loading}
                    className="ms-4 mt-2 bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center gap-2 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaSync size={20} />
                    <span>Refresh</span>
                </button>
            )}

            {/* Error */}
            {error && (
                <p className="mt-52 text-center font-bold text-gray-600 text-2xl me-8 ms-8">
                    {error}
                </p>
            )}

            {/* Loading */}
            {loading && (
                <div className="flex items-center justify-center mt-48 ">
                    <svg
                        className="animate-spin h-12 w-12 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 0 1 16 0H4z"
                        />
                    </svg>
                </div>
            )}

            {/* Login Button (Only show if not logged in and error present) */}
            <div className="flex items-center justify-center bg-gray-100">
                {!authStatus && error && (
                    <button
                        onClick={() => navigate("account")}
                        className="bg-blue-500 mt-5 text-white font-bold py-2 px-4 rounded flex items-center gap-2 hover:bg-blue-600"
                    >
                        Login
                    </button>
                )}
            </div>

            {/* Review Cards */}
            {!error && !loading && authStatus && Slicereviews && (
    <div className="mt-2">
        <ReviewCard reviews={Slicereviews} handleDelete={handleDelete} />
    </div>
)}
        </>
    );
}

export default HomeScreen;