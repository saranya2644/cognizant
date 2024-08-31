import React, { useState } from 'react';

function App() {
  const [link, setLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted link: ${link}`);
    // You can perform any action with the link here
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Submit Your Link</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="Enter a URL"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-full hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
