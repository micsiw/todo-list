import newProject from './projects';
import { projects } from './projects';

const addProjectButton = document.querySelector('#add-project');
const headerProject = document.querySelector('.header-project-list');
const block = document.querySelectorAll('.todo-block');

function initializeWebPage() {
    addProjectButton.addEventListener('click', initializeNewProject);


    block.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.toggle('expand');
        })
    })

    updateProjectList();
    swapProject();

    console.log('Projects array: ' + projects)

};

function initializeNewProject() {

    let projectName;

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
        projectName = addProjectFormInput.value

        if (projectName === '') {
            alert('Project must be named');
            return false
        }

        console.log('New project name is ' + projectName)
        newProject.create(addProjectFormInput.value)
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
        projectOption.value = project;
        projectOption.innerHTML = project;
        projectList.appendChild(projectOption);
    })
}

function swapProject() {
    const projectList = document.querySelector('#project-list').childNodes;
    const projectInfo = document.querySelector('.header-project-info');


    projectList.forEach(project => {
        console.log(project)
        project.addEventListener('select', (e) => {
            console.log(e);
            projectInfo.innerHTML = project;
        })
    });

// Zrob ta funkcje tak zeby zmieniala focus projektu na inny :P

}

export { initializeWebPage };