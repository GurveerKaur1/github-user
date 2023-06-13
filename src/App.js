import React, { useState } from 'react';
import Search from './pages/Search';
import User from './pages/User';
import { Routes, Route } from 'react-router-dom';
import './style/index.css';

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);

  // Callback function to receive the fetched user information
  const handleUserFetch = (userData, usernameData) => {
    setUser(userData);
    setUsername(usernameData);
  };


  return (
    <>
      <Routes>
        <Route
          exact path="/"
          element={ <Search onUserFetch={handleUserFetch} />}
        />
        <Route
           exact path="/user/:username"
          element={<User user={user} />}
          />
        </Routes>
    </>
  )
};

export default App;