import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Search() {
  const [input, setInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [gitHubUser, setGitHubUser] = useState(null);
  const [message, setMessage] = useState('');

  const token = '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';
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const handleInput = (input) => {
    setInput(input.target.value);
    console.log('User found');
  };

  const handleButton = () => {
    if (!isCorrect) {
      setInput('User Not found');
    }
  };

  const repos = `https://api.github.com/users/${input}/repos`;
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${input}`, options);
      const { gitHubUser } = response.data;
      setGitHubUser(response.data);
      setIsCorrect(false);
      navigate(`user/${input}`);

      setMessage('User Found');
      console.log('User found');
    } catch {
      setMessage('User not found');
      setIsCorrect(true);
      console.log('User not found');
    }
  };

  const notFound = <p>{message}</p>;

  return (
    <div className="container">
      <div className="child">
        <h2>Github Finder</h2>
        <div className="flex">
          <form onSubmit={getUser}>
            <input type="text" placeholder="Enter a Github username" value={input} onChange={handleInput} />
            <input type="submit" value="Search" />
          </form>
        </div>
      </div>
      <div className="message">{notFound}</div>
    </div>
  );
}

export default Search;
