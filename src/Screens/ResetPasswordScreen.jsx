import React, { useState, useEffect } from 'react';
import { Client, Account } from 'appwrite';
import { useLocation } from 'react-router-dom';
import conf from '../Conf/Conf';

const client = new Client()
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);

const account = new Account(client);

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status , setStatus] = useState(false)
  
  
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const userId = query.get('userId');
  const secret = query.get('secret');

  useEffect(() => {
    if (!userId || !secret) {
      setError('Invalid recovery link.');
    }
  }, [userId, secret]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      setLoading(false);
      return;
    }

    try {
      await account.updateRecovery(userId, secret, password);
      setMessage('Password has been updated successfully. You can now log in.');
      setStatus(true)
    } catch (error) {
      setError('Failed to reset password. Please try again.');
      setStatus(false)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col mt-20 items-center justify-center bg-gray-100">
      <div className="m-10 w-11/12 max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>

        {error && <p className="text-red-500 text-center font-bold mb-4">{error}</p>}
        {message && <p className="text-green-500 text-center font-bold mb-4">{message}</p>}

       {!status &&  <form onSubmit={handlePasswordReset}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">New Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              className="w-full px-3 py-2 border rounded-lg shadow-sm"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </form>}

      </div>
    </div>
  );
}

export default ResetPassword;
