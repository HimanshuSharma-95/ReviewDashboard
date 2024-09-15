import React, { useState } from 'react';
import { Client, Account } from 'appwrite';
import conf from '../Conf/Conf';
import { useNavigate } from 'react-router-dom';

const client = new Client()
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);

const account = new Account(client);

function RecoveryRequest() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRecoveryRequest = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    // Check if the email is valid
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      await account.createRecovery(email, 'https://reviews-dashboard-eight.vercel.app/forgotpassword');
      setStatus(true);
      setMessage('Password reset link sent to your email.');
    } catch (error) {
      setStatus(false);
      setError('Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col mt-20 items-center justify-center bg-gray-100">
        <div className="m-10 w-11/12 max-w-md bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>

          {error && <p className="text-red-500 text-center font-bold mb-4">{error}</p>}
          {message && <p className="text-green-500 text-center font-bold mb-4">{message}</p>}

          {!status && (
            <form onSubmit={handleRecoveryRequest}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
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
              <button
                type="submit"
                className={`w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? "Processing..." : "Send Reset Link"}
              </button>
            </form>
          )}

{status && (
        <button
          onClick={() => navigate("/account")}
          className={`w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          Back To Login
        </button>
      )}
      
        </div>
      </div>

    
    </>
  );
}

export default RecoveryRequest;
