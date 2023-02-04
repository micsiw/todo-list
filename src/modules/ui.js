import Project from './projects';
import { projects } from './projects';

const addProjectButton = document.querySelector('#add-project');
const headerProject = document.querySelector('.header-project-list');
const block = document.querySelectorAll('.todo-block');

let actualProject = projects[0]

function initializeWebPage() {
    addProjectButton.addEventListener('click', initializeNewProject);

    updateProjectList();
    loadTasks();
};

function initializeNewProject() {

    addProjectButton.remove();;
    const addProjectFormInput = document.createElement('input');
    addProjectFormInput.type = 'text';
    addProjectFormInput.placeholder = 'project name'
    addProjectFormInput.required = true;
    headerProject.appendChild(addProjectFormInput);
    const addProjectFormButton = document.createElement('button');
    addProjectFormButton.onclick = getProjectName;
    addProjectFormButton.innerHTML = 'confirm'
    addProjectFormButton.id = 'button-project-accept';
    headerProject.appendChild(addProjectFormButton);

    function getProjectName() {
        const projectName = addProjectFormInput.value

        if (projectName === '') {
            alert('Project must be named');
            return false
        }

        console.log('New project name is ' + projectName)
        projects.push(Project(projectName));
        addProjectFormInput.remove();
        addProjectFormButton.remove();
        headerProject.appendChild(addProjectButton);
        initializeWebPage();
    };
};

function updateProjectList() {
    const projectList = document.querySelector('#project-list');
    projectList.innerHTML = '';

    projects.forEach(project => {
        const projectOption = document.createElement('option');
        // const projectID = project.indexOf(project.getName());
        // projectOption.dataset.id = projectID;
        // zrób tak, żeby każdy projet miał id dataset po którym można ustawić aktualny projekt
        projectOption.value = project.getName();
        projectOption.innerHTML = project.getName();
        projectList.appendChild(projectOption);
    })
}

function loadTasks() {
    const main = document.querySelector('main');
    main.innerHTML = '';

    actualProject.tasks.forEach(task => {
        const container = document.createElement('div');
        container.classList.add('todo-container');
        const block = document.createElement('div');
        block.classList.add('todo-block');
        const title = document.createElement('p');
        title.innerHTML = task.getName();
        title.classList.add('todo-title');
        block.appendChild(title);
        container.appendChild(block);
        main.appendChild(container);
    })
}

//opcja rozwinięcia todo okna

block.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.toggle('expand');
    })
})

//ładowanie nowego projektu na stronę i zmiana actualProject

const projectList = document.querySelector('#project-list');
    const projectInfo = document.querySelector('.header-project-info');
    projectInfo.innerHTML = 'Actual project: ' + actualProject.getName();

    projectList.addEventListener("change", (e) => {
        actualProject = e.target.value;
        projectInfo.innerHTML = 'Actual project: ' + actualProject;
        console.log('Actual project: ' + actualProject)
        console.log(e.target)
    });

export { initializeWebPage };