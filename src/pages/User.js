import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function User({ user }) {
  const navigate = useNavigate();
  const {username} = useParams(); //Getting username data from Search page.
  
  const [reposArray, setReposArray] = useState([]);
  const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };


  let reposLink = `https://api.github.com/users/${username}/repos`;

  useEffect(() => {

    const getData = async () => {
      try {
        const reposList = await axios.get(reposLink);
        //console.log(reposList.data);
        setReposArray(reposList.data)
      } catch (error) {
        console.log(error);
      }
    }

    if (username) getData();
  }, [username]);

  return (
    <div className="container">
      <div className="grid">
        <section className="user-info">
          <div className="user-top">
            <picture>
              <img src={user.avatar_url} alt={user.login} />
            </picture>
            <h2 className="user-title">{user.name}</h2>
            <p className="user-bio">{user.bio}</p>
          </div>
          <div className="statistics">
            <div>
              <p className="number"> {user.public_repos}</p>
              <p className="subtitle">Repositories</p>
            </div> 
            <div>
              <p className="number"> {user.followers}</p>
              <p className="subtitle">Followers</p>
            </div>
            <div>
              <p className="number">{user.following}</p>
              <p className="subtitle">Following</p>
            </div> 
          </div>
          <div className="link">
            <input 
              type="button" 
              value="Go to GitHub" 
              onClick={()=> window.open(user.html_url, '_blank')} 
            />
            <input 
              type="button" 
              value="Go back" 
              className="back-btn" 
              onClick={() => navigate(-1)} //Returning to previous page (on route)
            />
          </div>
          
        </section>
      </div>
      <div className="grid2">
        <section className="repositories">
          <h3>My repositories</h3>
          <section className='reposList'>
            {reposArray.map(repo => (
              <div key={repo.id} className='repo-div'>
                <div className="row">
                  <div className="repos-grid">
                    <a href={repo.html_url} target="_blank">{repo.name}</a>
                    <p 
                      className="date-repo">
                        Updated at {new Date(repo.updated_at).toLocaleDateString('en-CA', dateOptions)}
                    </p>
                  </div>
                  <div>
                    <p className="repo-description">{repo.description}</p>
                  </div>
                </div>
              </div>
            ))};
          </section>
        </section>
      </div>
    </div>
  )
};

export default User;