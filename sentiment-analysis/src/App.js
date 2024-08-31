import React, { useState } from 'react';
import Navbar from './navbar';

function App() {
  const [link, setLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted link: ${link}`);
    // You can perform any action with the link here
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Enter your product URL
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="url"
              placeholder="Enter a URL"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-300"
              required
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-3 rounded-lg mt-6 w-full hover:bg-purple-700 transition duration-300 font-semibold shadow-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;


