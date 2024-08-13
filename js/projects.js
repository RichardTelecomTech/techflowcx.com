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
            // Filter out hidden repos and prepare for pagination
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
        const end = start + reposPerPage;
        const reposToShow = filteredRepos.slice(start, end);

        reposToShow.forEach(repo => {
            const repoElement = document.createElement('div');
            repoElement.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description || 'No description provided.'}</p>
            `;
            repoContainer.appendChild(repoElement);
        });

        // Update pagination controls
        updatePaginationControls();
    }

    function updatePaginationControls() {
        const paginationContainer = document.getElementById('pagination');
        paginationContainer.innerHTML = `
            <button onclick="previousPage()" ${currentPage === 0 ? 'disabled' : ''}>&#9664;</button>
            <button onclick="nextPage()" ${currentPage * reposPerPage + reposPerPage >= filteredRepos.length ? 'disabled' : ''}>&#9654;</button>
        `;
    }

    window.previousPage = function() {
        if (currentPage > 0) {
            currentPage--;
            displayRepos();
        }
    };

    window.nextPage = function() {
        if ((currentPage + 1) * reposPerPage < filteredRepos.length) {
            currentPage++;
            displayRepos();
        }
    };
});
