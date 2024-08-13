document.addEventListener('DOMContentLoaded', function() {
    console.log("Document ready. Starting fetch...");
    fetchProjects();
});

function fetchProjects() {
    const username = 'RichardTelecomTech';  // Your GitHub username
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=created`;
    const hideRepos = ['techflowcx.com'];  // List of repositories to hide, ensure this is defined within the scope where it's used
    
    console.log("Fetching projects from GitHub...");

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Projects fetched: ", data);
            // Filter out hidden repos and prepare for pagination
            const filteredRepos = data.filter(repo => !hideRepos.includes(repo.name.toLowerCase()));
            displayRepos(filteredRepos);
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            document.getElementById('repo-list').innerHTML = 'Failed to load repositories.';
        });
}

function displayRepos(repos) {
    const repoContainer = document.getElementById('repo-list');
    if (!repoContainer) {
        console.error("Failed to find the 'repo-list' element.");
        return;
    }

    repoContainer.innerHTML = ''; // Clear previous content
    repos.forEach(repo => {
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
    if (!paginationContainer) {
        console.error("Failed to find the 'pagination' element.");
        return;
    }
    paginationContainer.innerHTML = `
        <button onclick="previousPage()" ${currentPage === 0 ? 'disabled' : ''}>&#9664;</button>
        <button onclick="nextPage()" ${currentPage * reposPerPage + reposPerPage >= filteredRepos.length ? 'disabled' : ''}>&#9654;</button>
    `;
}

let currentPage = 0;
const reposPerPage = 5;

window.nextPage = function(filteredRepos) {
    if ((currentPage + 1) * reposPerPage < filteredRepos.length) {
        currentPage++;
        displayRepos(filteredRepos.slice(currentPage * reposPerPage, (currentPage + 1) * reposPerPage));
    }
};

window.previousPage = function(filteredRepos) {
    if (currentPage > 0) {
        currentPage--;
        displayRepos(filteredRepos.slice(currentPage * reposPerPage, (currentPage + 1) * reposPerPage));
    }
};
