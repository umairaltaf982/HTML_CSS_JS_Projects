document.addEventListener("DOMContentLoaded", function () {
    const projectTitle = document.getElementById("projectTitle");
    const projectDesc = document.getElementById("projectDesc");
    const projectStatus = document.getElementById("projectStatus");
    const addProjectBtn = document.getElementById("addProject");
    const projectList = document.getElementById("projectList");
    const filterStatus = document.getElementById("filterStatus");
    const searchProject = document.getElementById("searchProject");

    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    function saveProjects() {
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    function renderProjects() {
        projectList.innerHTML = "";
        const filteredProjects = projects.filter(project =>
            filterStatus.value === "All" || project.status === filterStatus.value
        ).filter(project =>
            project.title.toLowerCase().includes(searchProject.value.toLowerCase())
        );

        filteredProjects.forEach((project, index) => {
            const projectCard = document.createElement("div");
            projectCard.classList.add("project-card");
            projectCard.innerHTML = `
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <p><strong>Status:</strong> ${project.status}</p>
                <div class="actions">
                    <button class="edit" onclick="editProject(${index})">Edit</button>
                    <button class="delete" onclick="deleteProject(${index})">Delete</button>
                </div>
            `;
            projectList.appendChild(projectCard);
        });
    }

    function addProject() {
        const title = projectTitle.value.trim();
        const description = projectDesc.value.trim();
        const status = projectStatus.value;

        if (title === "" || description === "") {
            alert("Please fill all fields!");
            return;
        }

        projects.push({ title, description, status });
        saveProjects();
        renderProjects();

        projectTitle.value = "";
        projectDesc.value = "";
    }

    window.editProject = function (index) {
        const project = projects[index];
        const newTitle = prompt("Edit Title:", project.title);
        const newDesc = prompt("Edit Description:", project.description);
        const newStatus = prompt("Edit Status (Pending, In Progress, Completed):", project.status);

        if (newTitle && newDesc && (newStatus === "Pending" || newStatus === "In Progress" || newStatus === "Completed")) {
            projects[index] = { title: newTitle, description: newDesc, status: newStatus };
            saveProjects();
            renderProjects();
        } else {
            alert("Invalid input!");
        }
    };

    window.deleteProject = function (index) {
        if (confirm("Are you sure you want to delete this project?")) {
            projects.splice(index, 1);
            saveProjects();
            renderProjects();
        }
    };

    addProjectBtn.addEventListener("click", addProject);
    filterStatus.addEventListener("change", renderProjects);
    searchProject.addEventListener("input", renderProjects);

    renderProjects();
});
