document.addEventListener('DOMContentLoaded', function() {
    const username = 'RichardTelecomTech';  // Your GitHub username
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=created`;
    const hideRepos = ['techflowcx.com'];  // List of repositories to hide

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const repoContainer = document.getElementById('repo-list');
            repoContainer.innerHTML = '';  // Clear the "Loading repositories..." text

            data.forEach(repo => {
                if (!hideRepos.includes(repo.name.toLowerCase())) {  // Check if repo is not in the hide list
                    const repoElement = document.createElement('div');
                    repoElement.innerHTML = `
                        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                        <p>${repo.description || 'No description provided.'}</p>
                    `;
                    repoContainer.appendChild(repoElement);
                }
            });
        })
        .catch(error => {
            document.getElementById('repo-list').innerHTML = 'Failed to load repositories.';
            console.error('Error fetching repositories:', error);
        });
});
