import React, { useState } from 'react';
import LeetCodeProfile from './LeetCodeProfile';
import './style.css';

function App() {
  const [username, setUsername] = useState(''); // Initialize with empty username

  const handleUsernameChange = (event) => {
    setUsername(event.target.value); // Update the username state when input changes
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  };

  return (
    <div className="App">
      <h1>Welcome to CodeCracker</h1>

      {/* Input field to take username dynamically */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter LeetCode Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange} // Update state whenever username changes
          placeholder="Enter username"
        />
        <button type="submit">Submit</button>
      </form>

      {/* Only render profile if username is entered */}
      {username && <LeetCodeProfile username={username} />}
    </div>
  );
}

export default App;
