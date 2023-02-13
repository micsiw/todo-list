import Project from './projects';
import { projects } from './projects';

const addProjectButton = document.querySelector('#add-project');
const removeProjectButton = document.querySelector('#delete-project');

let actualProject = projects[0]
let projectIndex = projects.indexOf(actualProject)

//ładowanie strony

function initializeWebPage() {

    addProjectButton.addEventListener('click', initializeNewProject);
    removeProjectButton.addEventListener('click', deleteActualProject);

    projectInfo.innerHTML = actualProject.getName();

    subTaskSection.innerHTML = '';
    addNewSubtasksControls();
    updateProjectList();
    loadTasks();
};

//dodawanie nowego projektu

function initializeNewProject() {

    addProjectButton.remove();;
    const addProjectFormInput = document.createElement('input');
    addProjectFormInput.type = 'text';
    addProjectFormInput.placeholder = 'project name';
    addProjectFormInput.id = 'add-project-form';
    removeProjectButton.before(addProjectFormInput);
    const addProjectFormButton = document.createElement('button');
    addProjectFormButton.innerHTML = 'confirm'
    addProjectFormButton.id = 'button-project-accept';
    removeProjectButton.before(addProjectFormButton);
    addProjectFormInput.focus();

    addProjectFormButton.addEventListener('click', getProjectName);
    addProjectFormInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            getProjectName();
        };
    });

    function getProjectName() {
        const projectName = addProjectFormInput.value

        if (projectName === '') {
            alert('Project must be named');
            return false
        }

        projects.push(Project(projectName));
        addProjectFormInput.remove();
        addProjectFormButton.remove();
        removeProjectButton.before(addProjectButton);
        actualProject = projects[projects.length - 1];
        projectIndex = projects.indexOf(actualProject);
        initializeWebPage();
    };

    const cancelNewProject = function(e) {
        if (!addProjectFormInput.contains(e.target) && !addProjectFormButton.contains(e.target)) {
            addProjectFormInput.remove();
            addProjectFormButton.remove();
            removeProjectButton.before(addProjectButton);
            removeEventListener('mouseup', cancelNewProject);
            initializeWebPage();
        }
    }

    window.addEventListener('mouseup', cancelNewProject);
};

function deleteActualProject() {

    const projectList = document.querySelector('#project-list');

    if (projectIndex == 0) {
        alert(`Sorry, you can't delete ${actualProject.getName()} project`)
        return false
    } else if (actualProject.tasks.length > 0) {
        if (confirm(`Project ${actualProject.getName()} is not empty, are you sure you want to delete all the content?`) === true) {
            projects.splice(projectIndex, 1);
            actualProject = projects[projectIndex-1];
            projectIndex = projectIndex - 1;
            initializeWebPage();
            projectList.options[projectIndex].selected = true;
            projectInfo.innerHTML = actualProject.getName();
        }
    } else {
        projects.splice(projectIndex, 1);
        actualProject = projects[projectIndex-1]
        projectIndex = projectIndex - 1;
        initializeWebPage();
        projectList.options[projectIndex].selected = true;
        projectInfo.innerHTML = actualProject.getName();
    }
}

//aktualizacja listy aktywnych projektów

function updateProjectList() {
    const projectList = document.querySelector('#project-list');
    projectList.innerHTML = '';

    projects.forEach((project, index) => {
        const projectOption = document.createElement('option');
        projectOption.dataset.projectId = index;
        projectOption.value = project.getName();
        projectOption.innerHTML = project.getName();
        projectList.appendChild(projectOption);
    })

    projectList.options[projectIndex].selected = true;
}

//ładowanie tasków na stronę

function loadTasks() {
    const todoList = document.querySelector('.todo-list');
    todoList.innerHTML = '';

    actualProject.tasks.forEach((task, index) => {
        const container = document.createElement('div');
        container.classList.add('todo-container');
        const block = document.createElement('div');
        block.classList.add('todo-block');
        block.dataset.taskId = index;
        const todoHeader = document.createElement('div');
        todoHeader.classList.add('todo-header');

        const todoTitle = document.createElement('p');
        const todoDate = document.createElement('p');

        todoTitle.innerHTML = task.getName();
        todoTitle.classList.add('todo-title')

        todoDate.innerHTML = task.getDate();
        todoDate.classList.add('todo-date');

        todoDate.addEventListener('dblclick', () => {
            const newDateContainer = document.createElement('div');
            const newDate = document.createElement('input');
            const newDateTooltip = document.createElement('p');
            newDateContainer.classList.add('new-due-date')
            newDateTooltip.innerHTML = 'Press enter to confirm';
            newDateTooltip.classList.add('task-new-date-tooltip');
            newDate.type = 'date';
            newDate.value = task.getRawDate();
            newDate.id = 'task-new-due-date';
            newDate.name = 'task-new-due-date';
            newDate.min = new Date().toLocaleDateString('en-ca');
            newDate.max = "2100-01-01";
            todoDate.remove();
            todoHeader.appendChild(newDateContainer);
            newDateContainer.appendChild(newDate);
            newDateContainer.appendChild(newDateTooltip)
            newDate.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    task.setDate(newDate.value)
                    newDateContainer.remove();
                    todoDate.innerHTML = task.getDate();
                    todoHeader.appendChild(todoDate);
                }
            });
            newDate.focus();
        })

        todoHeader.append(todoTitle, todoDate);
        block.appendChild(todoHeader);
        container.appendChild(block);
        todoList.appendChild(container);
        block.addEventListener('click', () => {
            block.classList.add('expand');
        });
        window.addEventListener('mouseup', (e) => {
            if (!block.contains(e.target)) {
                block.classList.remove('expand');
            }
        })

        const subtaskBlock = document.createElement('div');
        subtaskBlock.classList.add('subtask-block');
        block.appendChild(subtaskBlock)

        const subtaskBlockTitle = document.createElement('h4');
        subtaskBlockTitle.classList.add('subtask-block-title');
        subtaskBlockTitle.innerHTML = 'subtask list';
        subtaskBlock.appendChild(subtaskBlockTitle);

        //tutaj generowanie subtasków w tasku

        task.subtasks.forEach((subtask, subindex) => {
            const subtaskPosition = document.createElement('div');
            subtaskPosition.classList.add('subtask-position');
            subtaskPosition.dataset.subtaskId = subindex;
            subtaskBlock.appendChild(subtaskPosition);

            const subtaskLabel = document.createElement('label');
            subtaskLabel.for = 'subtask';
            subtaskPosition.appendChild(subtaskLabel)
            const subtaskCheck = document.createElement('input');
            subtaskCheck.type = 'checkbox';
            subtaskCheck.id = 'subtask'
            subtaskCheck.checked = subtask.getStatus();

            if (subtaskCheck.checked === true) {
                subtaskPosition.style.textDecoration = 'line-through'; 
                subtaskPosition.style.color = 'gray'
            } else {
                subtaskPosition.style.textDecoration = 'none'; 
                subtaskPosition.style.color = 'black'
            }

            subtaskCheck.addEventListener('change', () => {
                if (subtaskCheck.checked === true) {
                    subtaskPosition.style.textDecoration = 'line-through'; 
                    subtaskPosition.style.color = 'gray'
                } else {
                    subtaskPosition.style.textDecoration = 'none';
                    subtaskPosition.style.color = 'black'
                }
                subtask.changeStatus();
            })
            
            subtaskLabel.appendChild(subtaskCheck);
            const subtaskName = document.createElement('p');
            subtaskName.classList.add('subtask-name');
            subtaskName.innerHTML = subtask.getName();
            subtaskLabel.appendChild(subtaskName);
            const subtaskDate = document.createElement('p');
            subtaskDate.classList.add('subtask-date');
            subtaskDate.innerHTML = subtask.getDate();
            subtaskPosition.appendChild(subtaskDate);
            const subtaskRemove = document.createElement('button');
            subtaskRemove.type = 'button';
            subtaskRemove.classList.add('subtask-remove');
            const subtaskRemoveIcon = document.createElement('img');
            subtaskRemoveIcon.src = 'images/trash.png'
            subtaskRemove.appendChild(subtaskRemoveIcon);
            subtaskPosition.appendChild(subtaskRemove);

            //usuwanie subtasków bezpośrednio w bloku

            subtaskRemove.addEventListener('click', () => {
                actualProject.tasks[index].subtasks.splice(subindex, 1);
                loadTasks();
                document.querySelector(`[data-task-id="${index}"]`).classList.add('expand');

            })
        })

        //tutaj dodawanie subtasków bezpośrednio w bloku

        const newSubTaskButton = document.createElement('button');
        newSubTaskButton.id = 'add-subtask-block';
        newSubTaskButton.type = 'button';
        const newSubTaskButtonIcon = document.createElement('img');
        newSubTaskButtonIcon.src = 'images/plus.png';
        newSubTaskButton.appendChild(newSubTaskButtonIcon)
        subtaskBlock.appendChild(newSubTaskButton);

        newSubTaskButton.addEventListener('click', () => {
            if (subtaskBlock.childNodes.length === 17) {
                alert("You've reached maximum number of subtasks.")
                return false
            } else {
                newSubTaskButton.remove();

                const newSubTaskInBlock = document.createElement('div');
                newSubTaskInBlock.classList.add('new-subtask-block');
                subtaskBlock.appendChild(newSubTaskInBlock);

                const newSubTaskForm = document.createElement('form')
                newSubTaskForm.id = 'new-subtask-form-block';
                newSubTaskInBlock.appendChild(newSubTaskForm);

                newSubTaskForm.addEventListener('submit', (e) => {
                    const subtaskNameBlock = document.getElementById('subtask-name-block').value;
                    const subtaskDueDate = document.getElementById('subtask-due-date-block').value;
                    const actualTaskIndex = document.querySelector('.expand').dataset.taskId;
                    e.preventDefault();
                        if (subtaskNameBlock === '') {
                            alert("Sorry, tasks must have a name.")
                            return false
                        }
                    actualProject.tasks[actualTaskIndex].addSubtask(subtaskNameBlock, subtaskDueDate);
                    loadTasks();
                    document.querySelector(`[data-task-id="${actualTaskIndex}"]`).classList.add('expand');
                })

                const newSubTaskLabel = document.createElement('label');
                const newSubTaskTitle = document.createElement('input');
                const newSubTaskDateLabel = document.createElement('label');
                const newSubTaskDueDate = document.createElement('input');
                newSubTaskTitle.type = 'text';
                newSubTaskTitle.id = 'subtask-name-block';
                newSubTaskTitle.name = 'subtask-name-block';
                newSubTaskLabel.for = newSubTaskTitle.id;
                newSubTaskLabel.innerHTML = 'Subtask name:';
                newSubTaskLabel.appendChild(newSubTaskTitle);
                newSubTaskForm.appendChild(newSubTaskLabel);
                newSubTaskTitle.focus();
                newSubTaskDueDate.type = 'date';
                newSubTaskDueDate.id = 'subtask-due-date-block';
                newSubTaskDueDate.name = 'subtask-due-date-block';
                newSubTaskDueDate.min = new Date().toLocaleDateString('en-ca');
                newSubTaskDueDate.max = "2100-01-01";
                newSubTaskDateLabel.innerHTML = 'Subtask due date:';
                newSubTaskDateLabel.appendChild(newSubTaskDueDate);
                newSubTaskForm.appendChild(newSubTaskDateLabel);

                const newSubTaskControls = document.createElement('div');
                newSubTaskControls.classList.add('new-subtask-controls-block');
                newSubTaskInBlock.appendChild(newSubTaskControls)

                const newSubTaskAdd = document.createElement('button');
                const newSubTaskAbandon = document.createElement('button');
                newSubTaskAdd.type = 'button';
                newSubTaskAdd.innerHTML = 'Submit'
                newSubTaskAbandon.type = 'button';
                newSubTaskAbandon.innerHTML = 'Abandon';
                newSubTaskControls.append(newSubTaskAdd, newSubTaskAbandon)

                newSubTaskAdd.addEventListener('click', (e) => {
                    const subtaskNameBlock = document.getElementById('subtask-name-block').value;
                    const subtaskDueDate = document.getElementById('subtask-due-date-block').value;
                    const actualTaskIndex = document.querySelector('.expand').dataset.taskId;

                    if (subtaskNameBlock === '') {
                        alert("Sorry, tasks must have a name.")
                        return false
                    }

                    actualProject.tasks[actualTaskIndex].addSubtask(subtaskNameBlock, subtaskDueDate);
                    loadTasks();
                    document.querySelector(`[data-task-id="${actualTaskIndex}"]`).classList.add('expand');
                })

                newSubTaskAbandon.addEventListener('click', () => {
                    newSubTaskInBlock.remove();
                    subtaskBlock.appendChild(newSubTaskButton);
                })
            }
        })
        
        //usuwanie tasków

        const removeTodoButton = document.createElement('button');
        const removeButtonContainer = document.createElement('div');
        removeButtonContainer.classList.add('remove-todo-container');
        block.appendChild(removeButtonContainer)
        removeTodoButton.id = 'remove-todo';
        removeTodoButton.innerHTML = 'Delete task';
        removeTodoButton.type = 'button';
        removeButtonContainer.appendChild(removeTodoButton);

        removeTodoButton.addEventListener('click', () => {
            const actualTask = document.querySelector('.expand');
            const subtaskList = actualTask.querySelectorAll('#subtask');
            
            if (subtaskList.length > 0) {
                for (let i = 0; i < subtaskList.length; i++) {
                    if (subtaskList[i].checked === false) {
                        if (confirm(`There are undone subtasks in ${task.getName()}, you want to delete whole task anyway?`) === true) {
                            actualProject.tasks.splice(index, 1);
                            loadTasks();
                            break;
                        } else {
                            return false
                        }
                    } else if (i === subtaskList.length - 1) {
                        actualProject.tasks.splice(index, 1);
                        loadTasks();
                    }
                }
            } else {
                actualProject.tasks.splice(index, 1);
                loadTasks();
            }
        })

    })
}

//ładowanie nowego projektu na stronę i zmiana actualProject

const projectList = document.querySelector('#project-list');
const projectInfo = document.querySelector('.header-actual-project');

projectList.addEventListener('change', () => {
    const selectedOption = projectList.options[projectList.selectedIndex]
    actualProject = projects[selectedOption.dataset.projectId]
    projectIndex = selectedOption.dataset.projectId
    console.log(actualProject)
    console.log(projectIndex)
    projectInfo.innerHTML = actualProject.getName();
    loadTasks();
});

//tworzenie formularza nowych tasków 

const addTaskButton = document.querySelector('#add-todo');
const addTodoForm = document.querySelector('.add-todo-form');
const formOverlay = document.querySelector('#form-overlay');
const cancelForm = document.querySelector('#cancel-form');
const subTaskSection = document.querySelector('[data-sub-form]');
const taskName = document.querySelector('#task-name');
addTaskButton.addEventListener('click', () => {
    addTodoForm.classList.toggle('active');
    formOverlay.classList.toggle('active');
    taskName.focus();
})
cancelForm.addEventListener('click', () => {
    addTodoForm.classList.toggle('active');
    formOverlay.classList.toggle('active');
    subTaskSection.innerHTML = '';
    addNewSubtasksControls();
    document.getElementById('add-task-form').reset();
})

const dueDateForm = document.querySelector('#task-due-date');
dueDateForm.min = new Date().toLocaleDateString('en-ca');
dueDateForm.max = "2100-01-01";

//rysowanie dodawania subtasków w głównym formularzu

function addNewSubtasksControls() {

    const subSection = document.querySelector('[data-sub-form]');
    const subSectionTitle = document.createElement('h3');
    subSectionTitle.innerHTML = 'Add new subtask';
    subSection.appendChild(subSectionTitle);

    const addSubTaskButton = document.createElement('button');
    addSubTaskButton.type = 'button';
    addSubTaskButton.id = 'add-subtask-form';
    const addSubTaskButtonIcon = document.createElement('img');
    addSubTaskButtonIcon.src = 'images/plus.png';
    addSubTaskButton.appendChild(addSubTaskButtonIcon);
    subSection.appendChild(addSubTaskButton);

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
    });

};

//dodawanie nowych tasków

const confirmTaskButton = document.querySelector('#confirm-task-button');

confirmTaskButton.addEventListener('click', (e) => {
    e.preventDefault();
    const taskNameValue = document.getElementById('task-name').value;
    let taskDueDate = document.getElementById('task-due-date').value;

    if (taskNameValue === '') {
        alert("Sorry, tasks must have a name.")
        return false
    }

    actualProject.addTask(taskNameValue, taskDueDate);

    const subTaskSection = document.querySelector('[data-sub-form]');
    const subTaskSectionElements = document.querySelector('[data-sub-form]').elements;
    const addedTaskIndex = actualProject.tasks.length - 1;

    for (let i = 0; i<subTaskSectionElements.length; i++) {
        if (subTaskSectionElements[i].type === 'text' && subTaskSectionElements[i].value !== '') {
            actualProject.tasks[addedTaskIndex].addSubtask(subTaskSectionElements[i].value, subTaskSectionElements[i+1].value)
        } else if (subTaskSectionElements[i].type === 'text' && subTaskSectionElements[i].value === '') {
            alert("Sorry, tasks must have a name.")
            return false
        }
    }

    loadTasks();
    addTodoForm.classList.toggle('active');
    formOverlay.classList.toggle('active');
    document.getElementById('add-task-form').reset();
    subTaskSection.innerHTML = '';
    addNewSubtasksControls()
})




export { initializeWebPage };