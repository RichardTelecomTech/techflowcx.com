document.addEventListener('DOMContentLoaded', function() {
    console.log("Document ready. Starting fetch...");
    fetchProjects();
});

function fetchProjects() {
    const username = 'RichardTelecomTech';
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=created`;
    console.log("Fetching projects from GitHub...");

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Projects fetched: ", data);
            filteredRepos = data.filter(repo => !hideRepos.includes(repo.name.toLowerCase()));
            displayRepos();
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            document.getElementById('repo-list').innerHTML = 'Failed to load repositories.';
        });
}

function displayRepos() {
    const repoContainer = document.getElementById('repo-list');
    if (!repoContainer) {
        console.error("Failed to find the 'repo-list' element.");
        return;
    }

    repoContainer.innerHTML = ''; // Clear previous content
    const start = currentPage * reposPerPage;
    const end = start + reposPerPage;
    const reposToShow = filteredRepos.slice(start, end);

    console.log("Displaying repos from index " + start + " to " + end);

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
    if (!paginationContainer) {
        console.error("Failed to find the 'pagination' element.");
        return;
    }
    paginationContainer.innerHTML = `
        <button onclick="previousPage()" ${currentPage === 0 ? 'disabled' : ''}>&#9664;</button>
        <button onclick="nextPage()" ${currentPage * reposPerPage + reposPerPage >= filteredRepos.length ? 'disabled' : ''}>&#9654;</button>
    `;
}
