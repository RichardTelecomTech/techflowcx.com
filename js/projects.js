let currentProjects = [];
let currentPage = 0;
const projectsPerPage = 5;

document.addEventListener('DOMContentLoaded', function() {
    fetchProjects();
});

function fetchProjects() {
    // Simulated fetch request (replace this with actual API call or data fetch method)
    const projects = [
        { title: "Genesys Cloud Solutions", description: "Detailed implementations of Genesys Cloud setups for various clients, focusing on integration and customization.", link: "https://github.com/TelcoVantage/GenesysProject" },
        // Add more project entries similar to the above
    ];
    currentProjects = projects;
    displayProjects();
}

function displayProjects() {
    const start = currentPage * projectsPerPage;
    const end = start + projectsPerPage;
    const projectsToShow = currentProjects.slice(start, end);

    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = ''; // Clear previous entries

    projectsToShow.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank">View on GitHub</a>
        `;
        projectsContainer.appendChild(projectElement);
    });
}

function nextPage() {
    if ((currentPage + 1) * projectsPerPage < currentProjects.length) {
        currentPage++;
        displayProjects();
    }
}

function previousPage() {
    if (currentPage > 0) {
        currentPage--;
        displayProjects();
    }
}
