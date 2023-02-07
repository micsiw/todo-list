import Project from './projects';
import { projects } from './projects';

const addProjectButton = document.querySelector('#add-project');
const headerProject = document.querySelector('.header-project-list');

let actualProject = projects[0]

//ładowanie strony

function initializeWebPage() {
    addProjectButton.addEventListener('click', initializeNewProject);

    updateProjectList();
    loadTasks();
};

//dodawanie nowego projektu

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

//aktualizacja listy aktywnych projektów

function updateProjectList() {
    const projectList = document.querySelector('#project-list');
    projectList.innerHTML = '';

    projects.forEach((project, index) => {
        const projectOption = document.createElement('option');
        projectOption.dataset.id = index;
        projectOption.value = project.getName();
        projectOption.innerHTML = project.getName();
        projectList.appendChild(projectOption);
    })
}

//ładowanie tasków na stronę

function loadTasks() {
    const todoList = document.querySelector('.todo-list');
    const block = document.querySelectorAll('.todo-block');
    todoList.innerHTML = '';

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
        todoList.appendChild(container);
        block.addEventListener('click', () => {
            block.classList.toggle('expand');
        })
    })
}

//ładowanie nowego projektu na stronę i zmiana actualProject

    const projectList = document.querySelector('#project-list');
    const projectInfo = document.querySelector('.header-project-info');
    projectInfo.innerHTML = 'Actual project: ' + actualProject.getName();

    projectList.addEventListener('change', () => {
        const selectedOption = projectList.options[projectList.selectedIndex]
        actualProject = projects[selectedOption.dataset.id]
        projectInfo.innerHTML = 'Actual project: ' + actualProject.getName();
        console.log('Actual project: ' + actualProject)
        console.log(selectedOption.dataset.id)
        loadTasks();
    });

//tworzenie nowych tasków 

    const addTaskButton = document.querySelector('#add-todo');
    const addTodoForm = document.querySelector('.add-todo-form');
    const formOverlay = document.querySelector('#form-overlay');
    const cancelForm = document.querySelector('#cancel-form');
    addTaskButton.addEventListener('click', () => {
        addTodoForm.classList.toggle('active');
        formOverlay.classList.toggle('active');
    })
    cancelForm.addEventListener('click', () => {
        addTodoForm.classList.toggle('active');
        formOverlay.classList.toggle('active');
    })

    const dueDateForm = document.querySelector('#task-due-date');
    dueDateForm.min = new Date().toLocaleDateString('en-ca');
    dueDateForm.max = "2100-01-01";

    const addSubTaskButton = document.querySelector('#add-subtask');

    addSubTaskButton.addEventListener('click', () => {
        const newSubTaskLabel = document.createElement('label');
        const newSubTaskTitle = document.createElement('input');
        const newSubTaskDateLabel = document.createElement('label');
        const newSubTaskDueDate = document.createElement('input');
        newSubTaskTitle.type = 'text';
        newSubTaskTitle.id = 'subtask-name';
        newSubTaskTitle.name = 'subtask-name';
        newSubTaskLabel.for = newSubTaskTitle.id;
        newSubTaskLabel.innerHTML = 'Subtask name:';
        newSubTaskLabel.appendChild(newSubTaskTitle);
        addSubTaskButton.before(newSubTaskLabel);
        newSubTaskDueDate.type = 'date';
        newSubTaskDueDate.id = 'subtask-due-date';
        newSubTaskDueDate.name = 'subtask-due-date';
        newSubTaskDueDate.min = new Date().toLocaleDateString('en-ca');
        newSubTaskDueDate.max = "2100-01-01";
        newSubTaskDateLabel.innerHTML = 'Subtask due date:';
        newSubTaskDateLabel.appendChild(newSubTaskDueDate);
        addSubTaskButton.before(newSubTaskDateLabel);
    })
   



export { initializeWebPage };