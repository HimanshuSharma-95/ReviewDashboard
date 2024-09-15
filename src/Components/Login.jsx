import React, { useState } from 'react';
import authservice from '../Appwrite/Auth';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../Store/AuthSlice';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (!email || !password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    try {
      const session = await authservice.login(email, password);
      if (session) {
        const userData = await authservice.getcurrentuser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

    return (
      <div className="flex flex-col mt-20 items-center justify-center bg-gray-100">
        <div className="m-10 w-11/12 max-w-md bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {forgotPassword ? "Reset Password" : "Login"}
          </h1>
  
          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-center font-bold mb-4">{error}</p>
          )}
  
          {/* Success/Info Message */}
          {message && (
            <p className="text-green-500 text-center font-bold mb-4">{message}</p>
          )}
  
          <form onSubmit={forgotPassword ? handleForgotPassword : handleLogin}>
            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-lg shadow-sm"
                disabled={loading}
              />
            </div>
  
            {/* Password Field */}
            {!forgotPassword && (
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border rounded-lg shadow-sm"
                  disabled={loading}
                />
              </div>
            )}
  
            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? "Processing..." : (forgotPassword ? "Send Reset Link" : "Login")}
            </button>
          </form>
  
          {/* Forgot Password / Back to Login */}
          <div className="mt-4 text-center">
            {forgotPassword ? (
              <p>
                Remembered your password?{' '}
                <button
                  onClick={() => setForgotPassword(false)}
                  className="text-blue-600 hover:underline"
                  disabled={loading}
                >
                  Login
                </button>
              </p>
            ) : (
              <p>
                Forgot your password?{' '}
                <button
                  onClick={() => navigate("/recoveryrequest")}
                  className="text-blue-600 hover:underline"
                  disabled={loading}
                >
                  Reset Password
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }


export default Login;
