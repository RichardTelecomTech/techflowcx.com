document.addEventListener('DOMContentLoaded', function() {
    const username = 'RichardTelecomTech';  // Your GitHub username
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=created`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const repoContainer = document.getElementById('repo-list');
            repoContainer.innerHTML = '';  // Clear the "Loading repositories..." text

            data.forEach(repo => {
                const repoElement = document.createElement('div');
                repoElement.innerHTML = `
                    <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                    <p>${repo.description || 'No description provided.'}</p>
                `;
                repoContainer.appendChild(repoElement);
            });
        })
        .catch(error => {
            document.getElementById('repo-list').innerHTML = 'Failed to load repositories.';
            console.error('Error fetching repositories:', error);
        });
});
