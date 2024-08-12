import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Repositories.css';

function Repositories() {
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        axios.get('https://api.github.com/users/{your-github-username}/repos')
            .then(response => {
                setRepos(response.data);
            })
            .catch(error => console.error('Error fetching repos:', error));
    }, []);

    return (
        <div>
            <h1>My GitHub Repositories</h1>
            <ul>
                {repos.map(repo => (
                    <li key={repo.id}>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            {repo.name}
                        </a> - {repo.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Repositories;
