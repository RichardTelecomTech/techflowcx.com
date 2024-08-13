document.addEventListener('DOMContentLoaded', function() {
    const username = 'RichardTelecomTech';  // Your GitHub username
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=created`;
    const hideRepos = ['techflowcx.com'];  // List of repositories to hide
    let currentPage = 0;
    const reposPerPage = 5;
    let filteredRepos = [];

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Projects fetched:", data);
            filteredRepos = data.filter(repo => !hideRepos.includes(repo.name.toLowerCase()));
            displayRepos();
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            document.getElementById('repo-list').innerHTML = 'Failed to load repositories.';
        });

    function displayRepos() {
        const repoContainer = document.getElementById('repo-list');
        repoContainer.innerHTML = ''; // Clear previous content

        const start = currentPage * reposPerPage;
        const end = Math.min(start + reposPerPage, filteredRepos.length);
        const reposToShow = filteredRepos.slice(start, end);

        reposToShow.forEach(repo => {
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
            <button onclick="changePage(1)" ${currentPage * reposPerPage + reposPerPage >= filteredRepos.length ? 'disabled' : ''}>&#9654;</button>
        `;
    }

    window.changePage = function(delta) {
        currentPage += delta;
        displayRepos();
    };
});
