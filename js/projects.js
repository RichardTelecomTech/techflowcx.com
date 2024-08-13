document.addEventListener('DOMContentLoaded', function() {
    const username = 'RichardTelecomTech';  // Your GitHub username
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=created`;
    const hideRepos = ['techflowcx.com'];  // List of repositories to hide
    let currentPage = 0;
    const reposPerPage = 5;
    let displayedRepos = [];

    function updateDisplay() {
        const repoContainer = document.getElementById('repo-list');
        repoContainer.innerHTML = '';  // Clear the "Loading repositories..." text

        const start = currentPage * reposPerPage;
        const end = start + reposPerPage;
        const paginatedRepos = displayedRepos.slice(start, end);

        paginatedRepos.forEach(repo => {
            const repoElement = document.createElement('div');
            repoElement.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description || 'No description provided.'}</p>
            `;
            repoContainer.appendChild(repoElement);
        });

        updatePaginationControls();
    }

    function updatePaginationControls() {
        const paginationContainer = document.getElementById('pagination');
        paginationContainer.innerHTML = `
            <button onclick="changePage(-1)" ${currentPage === 0 ? 'disabled' : ''}>&#9664;</button>
            <button onclick="changePage(1)" ${currentPage * reposPerPage + reposPerPage >= displayedRepos.length ? 'disabled' : ''}>&#9654;</button>
        `;
    }

    window.changePage = function(delta) {
        currentPage += delta;
        updateDisplay();
    };

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayedRepos = data.filter(repo => !hideRepos.includes(repo.name.toLowerCase()));
            updateDisplay();
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            document.getElementById('repo-list').innerHTML = 'Failed to load repositories.';
        });
});
