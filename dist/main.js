/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/projects.js":
/*!*********************************!*\
  !*** ./src/modules/projects.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "projects": () => (/* binding */ projects)
/* harmony export */ });
/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks.js */ "./src/modules/tasks.js");



let projects = [];

const Project = (name) => {

    const getName = () => name;

    let tasks = [];

    const addTask = (name, dueDate) => {
        if (dueDate === '') {
            dueDate = 'no date';
        }
        tasks.push((0,_tasks_js__WEBPACK_IMPORTED_MODULE_0__["default"])(name, dueDate));
    };
    
    return { getName, addTask, tasks };
};

const defaultProject = Project('Default');
const testProject = Project('Test');
const schoolProject = Project('School');

projects.push(defaultProject, testProject, schoolProject);

defaultProject.addTask('first task', '2023-10-03');
defaultProject.addTask('second task', '');
defaultProject.addTask('third task', '2023-13-12');

testProject.addTask('fourth task', '');

schoolProject.addTask('fifth task', '');

defaultProject.tasks[0].addSubtask('first sub', '');
defaultProject.tasks[0].addSubtask('second sub', '');
defaultProject.tasks[2].addSubtask('third sub', '');


//console.log(defaultProject.tasks[0].subtasks[0])


//console.log('Project list: ' + projects)

// console.log(defaultProject.tasks[0].getName())
// console.log(defaultProject.tasks[0].getDate())



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);


/***/ }),

/***/ "./src/modules/tasks.js":
/*!******************************!*\
  !*** ./src/modules/tasks.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Task = (name, dueDate) => {

    let subtasks = [];

    const getName = () => name;
    const getDate = () => dueDate;
    const setDate = (newDate) => {
        if (newDate === '') {
            dueDate = 'no date'
        } else {
            dueDate = newDate;
        }
    }
    const addSubtask = (name, dueDate) => {
        if (dueDate === '') {
            dueDate = 'no date';
        }
        subtasks.push({name, dueDate});
    }

    return { subtasks, getName, getDate, setDate, addSubtask }
};



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Task);

/***/ }),

/***/ "./src/modules/ui.js":
/*!***************************!*\
  !*** ./src/modules/ui.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initializeWebPage": () => (/* binding */ initializeWebPage)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/modules/projects.js");



const addProjectButton = document.querySelector('#add-project');
const headerProject = document.querySelector('.header-project-list');
const removeProjectButton = document.querySelector('#delete-project');

let actualProject = _projects__WEBPACK_IMPORTED_MODULE_0__.projects[0]

let projectIndex = _projects__WEBPACK_IMPORTED_MODULE_0__.projects.indexOf(actualProject)

//ładowanie strony

function initializeWebPage() {

    addProjectButton.addEventListener('click', initializeNewProject);
    removeProjectButton.addEventListener('click', deleteActualProject);

    updateProjectList();
    loadTasks();
    addNewSubtasksControls()
};

//dodawanie nowego projektu

function initializeNewProject() {

    addProjectButton.remove();;
    const addProjectFormInput = document.createElement('input');
    addProjectFormInput.type = 'text';
    addProjectFormInput.placeholder = 'project name'
    addProjectFormInput.required = true;
    removeProjectButton.before(addProjectFormInput);
    const addProjectFormButton = document.createElement('button');
    addProjectFormButton.innerHTML = 'confirm'
    addProjectFormButton.id = 'button-project-accept';
    removeProjectButton.before(addProjectFormButton);

    addProjectFormButton.addEventListener('click', getProjectName);

    function getProjectName() {
        const projectName = addProjectFormInput.value

        if (projectName === '') {
            alert('Project must be named');
            return false
        }

        console.log('New project name is ' + projectName)
        _projects__WEBPACK_IMPORTED_MODULE_0__.projects.push((0,_projects__WEBPACK_IMPORTED_MODULE_0__["default"])(projectName));
        addProjectFormInput.remove();
        addProjectFormButton.remove();
        removeProjectButton.before(addProjectButton);
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

    if (projectIndex === 0) {
        alert(`Sorry, you can't delete ${actualProject.getName()} project`)
        return false
    } else if (actualProject.tasks.length > 0) {
        if (confirm(`Project ${actualProject.getName()} is not empty, are you sure you want to delete all the content?`) === true) {
            _projects__WEBPACK_IMPORTED_MODULE_0__.projects.splice(projectIndex, 1);
            actualProject = _projects__WEBPACK_IMPORTED_MODULE_0__.projects[projectIndex-1];
            initializeWebPage();
            projectList.options[projectIndex-1].selected = true;
            projectInfo.innerHTML = 'Actual project: ' + actualProject.getName();
        }
    } else {
        _projects__WEBPACK_IMPORTED_MODULE_0__.projects.splice(projectIndex, 1);
        actualProject = _projects__WEBPACK_IMPORTED_MODULE_0__.projects[projectIndex-1]
        initializeWebPage();
        projectList.options[projectIndex-1].selected = true;
        projectInfo.innerHTML = 'Actual project: ' + actualProject.getName();
    }
}

//aktualizacja listy aktywnych projektów

function updateProjectList() {
    const projectList = document.querySelector('#project-list');
    projectList.innerHTML = '';

    _projects__WEBPACK_IMPORTED_MODULE_0__.projects.forEach((project, index) => {
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

        todoDate.addEventListener('click', () => {
            const newDateContainer = document.createElement('div');
            const newDate = document.createElement('input');
            const newDateTooltip = document.createElement('p');
            newDateTooltip.innerHTML = 'Press enter to confirm';
            newDateTooltip.classList.add('task-new-date-tooltip');
            newDate.type = 'date';
            newDate.value = task.getDate();
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
            subtaskLabel.appendChild(subtaskCheck);
            const subtaskName = document.createElement('p');
            subtaskName.classList.add('subtask-name');
            subtaskName.innerHTML = subtask.name;
            subtaskLabel.appendChild(subtaskName);
            const subtaskDate = document.createElement('p');
            subtaskDate.classList.add('subtask-date');
            subtaskDate.innerHTML = subtask.dueDate;
            subtaskPosition.appendChild(subtaskDate);
            const subtaskRemove = document.createElement('button');
            subtaskRemove.type = 'button';
            subtaskRemove.classList.add('subtask-remove');
            subtaskRemove.innerHTML = '&times;';
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
        newSubTaskButton.innerHTML = '&plus;';
        newSubTaskButton.type = 'button';
        subtaskBlock.appendChild(newSubTaskButton);

        newSubTaskButton.addEventListener('click', () => {
            newSubTaskButton.remove();

            const newSubTaskInBlock = document.createElement('div');
            newSubTaskInBlock.classList.add('new-subtask-block');
            subtaskBlock.appendChild(newSubTaskInBlock);

            const newSubTaskForm = document.createElement('form')
            newSubTaskForm.id = 'new-subtask-form-block';
            newSubTaskInBlock.appendChild(newSubTaskForm);

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
            newSubTaskInBlock.append(newSubTaskAdd, newSubTaskAbandon)

            newSubTaskAdd.addEventListener('click', () => {
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
        })

        //usuwanie tasków

        const removeTodoButton = document.createElement('button');
        removeTodoButton.id = 'remove-todo';
        removeTodoButton.innerHTML = 'Remove';
        removeTodoButton.type = 'button';
        block.appendChild(removeTodoButton);

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
                    }
                }
                actualProject.tasks.splice(index, 1);
                loadTasks();
            } else {
                actualProject.tasks.splice(index, 1);
                loadTasks();
            }
        })

    })

}

//ładowanie nowego projektu na stronę i zmiana actualProject

const projectList = document.querySelector('#project-list');
const projectInfo = document.querySelector('.header-project-info');
projectInfo.innerHTML = 'Actual project: ' + actualProject.getName();

projectList.addEventListener('change', () => {
    const selectedOption = projectList.options[projectList.selectedIndex]
    actualProject = _projects__WEBPACK_IMPORTED_MODULE_0__.projects[selectedOption.dataset.projectId]
    projectIndex = selectedOption.dataset.projectId
    projectInfo.innerHTML = 'Actual project: ' + actualProject.getName();
    console.log('Actual project: ' + actualProject.getName())
    console.log(selectedOption.dataset.projectId)
    loadTasks();
});

//tworzenie formularza nowych tasków 

const addTaskButton = document.querySelector('#add-todo');
const addTodoForm = document.querySelector('.add-todo-form');
const formOverlay = document.querySelector('#form-overlay');
const cancelForm = document.querySelector('#cancel-form');
const subTaskSection = document.querySelector('[data-sub-form]');
addTaskButton.addEventListener('click', () => {
    addTodoForm.classList.toggle('active');
    formOverlay.classList.toggle('active');
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
    addSubTaskButton.innerHTML = '&plus;'
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






/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/ui */ "./src/modules/ui.js");


(0,_modules_ui__WEBPACK_IMPORTED_MODULE_0__.initializeWebPage)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNpQzs7QUFFakM7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIscURBQU87QUFDMUI7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7OztBQUdBOztBQUVBO0FBQ0E7Ozs7QUFJQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ2xEdkI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixjQUFjO0FBQ3JDOztBQUVBLGFBQWE7QUFDYjs7OztBQUlBLGlFQUFlLElBQUk7Ozs7Ozs7Ozs7Ozs7OztBQ3pCYztBQUNLOztBQUV0QztBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLGtEQUFXOztBQUUvQixtQkFBbUIsdURBQWdCOztBQUVuQzs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLG9EQUFhLENBQUMscURBQU87QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLHlDQUF5Qyx5QkFBeUI7QUFDbEU7QUFDQSxNQUFNO0FBQ04sK0JBQStCLHlCQUF5QjtBQUN4RCxZQUFZLHNEQUFlO0FBQzNCLDRCQUE0QiwrQ0FBUTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixRQUFRLHNEQUFlO0FBQ3ZCLHdCQUF3QiwrQ0FBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLHVEQUFnQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxNQUFNOztBQUUvRCxhQUFhO0FBQ2IsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQXlELGdCQUFnQjtBQUN6RSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyx3QkFBd0I7QUFDeEQ7QUFDQSxvRUFBb0UsZUFBZTtBQUNuRjtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQiwrQ0FBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4Qzs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixpQ0FBaUM7QUFDckQ7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7OztVQzViRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmlEOztBQUVqRCw4REFBaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy91aS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgbmV3VGFzayBmcm9tICcuL3Rhc2tzLmpzJztcblxubGV0IHByb2plY3RzID0gW107XG5cbmNvbnN0IFByb2plY3QgPSAobmFtZSkgPT4ge1xuXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG5cbiAgICBsZXQgdGFza3MgPSBbXTtcblxuICAgIGNvbnN0IGFkZFRhc2sgPSAobmFtZSwgZHVlRGF0ZSkgPT4ge1xuICAgICAgICBpZiAoZHVlRGF0ZSA9PT0gJycpIHtcbiAgICAgICAgICAgIGR1ZURhdGUgPSAnbm8gZGF0ZSc7XG4gICAgICAgIH1cbiAgICAgICAgdGFza3MucHVzaChuZXdUYXNrKG5hbWUsIGR1ZURhdGUpKTtcbiAgICB9O1xuICAgIFxuICAgIHJldHVybiB7IGdldE5hbWUsIGFkZFRhc2ssIHRhc2tzIH07XG59O1xuXG5jb25zdCBkZWZhdWx0UHJvamVjdCA9IFByb2plY3QoJ0RlZmF1bHQnKTtcbmNvbnN0IHRlc3RQcm9qZWN0ID0gUHJvamVjdCgnVGVzdCcpO1xuY29uc3Qgc2Nob29sUHJvamVjdCA9IFByb2plY3QoJ1NjaG9vbCcpO1xuXG5wcm9qZWN0cy5wdXNoKGRlZmF1bHRQcm9qZWN0LCB0ZXN0UHJvamVjdCwgc2Nob29sUHJvamVjdCk7XG5cbmRlZmF1bHRQcm9qZWN0LmFkZFRhc2soJ2ZpcnN0IHRhc2snLCAnMjAyMy0xMC0wMycpO1xuZGVmYXVsdFByb2plY3QuYWRkVGFzaygnc2Vjb25kIHRhc2snLCAnJyk7XG5kZWZhdWx0UHJvamVjdC5hZGRUYXNrKCd0aGlyZCB0YXNrJywgJzIwMjMtMTMtMTInKTtcblxudGVzdFByb2plY3QuYWRkVGFzaygnZm91cnRoIHRhc2snLCAnJyk7XG5cbnNjaG9vbFByb2plY3QuYWRkVGFzaygnZmlmdGggdGFzaycsICcnKTtcblxuZGVmYXVsdFByb2plY3QudGFza3NbMF0uYWRkU3VidGFzaygnZmlyc3Qgc3ViJywgJycpO1xuZGVmYXVsdFByb2plY3QudGFza3NbMF0uYWRkU3VidGFzaygnc2Vjb25kIHN1YicsICcnKTtcbmRlZmF1bHRQcm9qZWN0LnRhc2tzWzJdLmFkZFN1YnRhc2soJ3RoaXJkIHN1YicsICcnKTtcblxuXG4vL2NvbnNvbGUubG9nKGRlZmF1bHRQcm9qZWN0LnRhc2tzWzBdLnN1YnRhc2tzWzBdKVxuXG5cbi8vY29uc29sZS5sb2coJ1Byb2plY3QgbGlzdDogJyArIHByb2plY3RzKVxuXG4vLyBjb25zb2xlLmxvZyhkZWZhdWx0UHJvamVjdC50YXNrc1swXS5nZXROYW1lKCkpXG4vLyBjb25zb2xlLmxvZyhkZWZhdWx0UHJvamVjdC50YXNrc1swXS5nZXREYXRlKCkpXG5cblxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0O1xuZXhwb3J0IHsgcHJvamVjdHMgfTsiLCJjb25zdCBUYXNrID0gKG5hbWUsIGR1ZURhdGUpID0+IHtcblxuICAgIGxldCBzdWJ0YXNrcyA9IFtdO1xuXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG4gICAgY29uc3QgZ2V0RGF0ZSA9ICgpID0+IGR1ZURhdGU7XG4gICAgY29uc3Qgc2V0RGF0ZSA9IChuZXdEYXRlKSA9PiB7XG4gICAgICAgIGlmIChuZXdEYXRlID09PSAnJykge1xuICAgICAgICAgICAgZHVlRGF0ZSA9ICdubyBkYXRlJ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZHVlRGF0ZSA9IG5ld0RhdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgYWRkU3VidGFzayA9IChuYW1lLCBkdWVEYXRlKSA9PiB7XG4gICAgICAgIGlmIChkdWVEYXRlID09PSAnJykge1xuICAgICAgICAgICAgZHVlRGF0ZSA9ICdubyBkYXRlJztcbiAgICAgICAgfVxuICAgICAgICBzdWJ0YXNrcy5wdXNoKHtuYW1lLCBkdWVEYXRlfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgc3VidGFza3MsIGdldE5hbWUsIGdldERhdGUsIHNldERhdGUsIGFkZFN1YnRhc2sgfVxufTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IFRhc2s7IiwiaW1wb3J0IFByb2plY3QgZnJvbSAnLi9wcm9qZWN0cyc7XG5pbXBvcnQgeyBwcm9qZWN0cyB9IGZyb20gJy4vcHJvamVjdHMnO1xuXG5jb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0Jyk7XG5jb25zdCBoZWFkZXJQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlci1wcm9qZWN0LWxpc3QnKTtcbmNvbnN0IHJlbW92ZVByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVsZXRlLXByb2plY3QnKTtcblxubGV0IGFjdHVhbFByb2plY3QgPSBwcm9qZWN0c1swXVxuXG5sZXQgcHJvamVjdEluZGV4ID0gcHJvamVjdHMuaW5kZXhPZihhY3R1YWxQcm9qZWN0KVxuXG4vL8WCYWRvd2FuaWUgc3Ryb255XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVXZWJQYWdlKCkge1xuXG4gICAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGluaXRpYWxpemVOZXdQcm9qZWN0KTtcbiAgICByZW1vdmVQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVsZXRlQWN0dWFsUHJvamVjdCk7XG5cbiAgICB1cGRhdGVQcm9qZWN0TGlzdCgpO1xuICAgIGxvYWRUYXNrcygpO1xuICAgIGFkZE5ld1N1YnRhc2tzQ29udHJvbHMoKVxufTtcblxuLy9kb2Rhd2FuaWUgbm93ZWdvIHByb2pla3R1XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVOZXdQcm9qZWN0KCkge1xuXG4gICAgYWRkUHJvamVjdEJ1dHRvbi5yZW1vdmUoKTs7XG4gICAgY29uc3QgYWRkUHJvamVjdEZvcm1JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgYWRkUHJvamVjdEZvcm1JbnB1dC50eXBlID0gJ3RleHQnO1xuICAgIGFkZFByb2plY3RGb3JtSW5wdXQucGxhY2Vob2xkZXIgPSAncHJvamVjdCBuYW1lJ1xuICAgIGFkZFByb2plY3RGb3JtSW5wdXQucmVxdWlyZWQgPSB0cnVlO1xuICAgIHJlbW92ZVByb2plY3RCdXR0b24uYmVmb3JlKGFkZFByb2plY3RGb3JtSW5wdXQpO1xuICAgIGNvbnN0IGFkZFByb2plY3RGb3JtQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYWRkUHJvamVjdEZvcm1CdXR0b24uaW5uZXJIVE1MID0gJ2NvbmZpcm0nXG4gICAgYWRkUHJvamVjdEZvcm1CdXR0b24uaWQgPSAnYnV0dG9uLXByb2plY3QtYWNjZXB0JztcbiAgICByZW1vdmVQcm9qZWN0QnV0dG9uLmJlZm9yZShhZGRQcm9qZWN0Rm9ybUJ1dHRvbik7XG5cbiAgICBhZGRQcm9qZWN0Rm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdldFByb2plY3ROYW1lKTtcblxuICAgIGZ1bmN0aW9uIGdldFByb2plY3ROYW1lKCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGFkZFByb2plY3RGb3JtSW5wdXQudmFsdWVcblxuICAgICAgICBpZiAocHJvamVjdE5hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICBhbGVydCgnUHJvamVjdCBtdXN0IGJlIG5hbWVkJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKCdOZXcgcHJvamVjdCBuYW1lIGlzICcgKyBwcm9qZWN0TmFtZSlcbiAgICAgICAgcHJvamVjdHMucHVzaChQcm9qZWN0KHByb2plY3ROYW1lKSk7XG4gICAgICAgIGFkZFByb2plY3RGb3JtSW5wdXQucmVtb3ZlKCk7XG4gICAgICAgIGFkZFByb2plY3RGb3JtQnV0dG9uLnJlbW92ZSgpO1xuICAgICAgICByZW1vdmVQcm9qZWN0QnV0dG9uLmJlZm9yZShhZGRQcm9qZWN0QnV0dG9uKTtcbiAgICAgICAgaW5pdGlhbGl6ZVdlYlBhZ2UoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgY2FuY2VsTmV3UHJvamVjdCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCFhZGRQcm9qZWN0Rm9ybUlucHV0LmNvbnRhaW5zKGUudGFyZ2V0KSAmJiAhYWRkUHJvamVjdEZvcm1CdXR0b24uY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICAgICAgICBhZGRQcm9qZWN0Rm9ybUlucHV0LnJlbW92ZSgpO1xuICAgICAgICAgICAgYWRkUHJvamVjdEZvcm1CdXR0b24ucmVtb3ZlKCk7XG4gICAgICAgICAgICByZW1vdmVQcm9qZWN0QnV0dG9uLmJlZm9yZShhZGRQcm9qZWN0QnV0dG9uKTtcbiAgICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBjYW5jZWxOZXdQcm9qZWN0KTtcbiAgICAgICAgICAgIGluaXRpYWxpemVXZWJQYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGNhbmNlbE5ld1Byb2plY3QpO1xufTtcblxuZnVuY3Rpb24gZGVsZXRlQWN0dWFsUHJvamVjdCgpIHtcblxuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbGlzdCcpO1xuXG4gICAgaWYgKHByb2plY3RJbmRleCA9PT0gMCkge1xuICAgICAgICBhbGVydChgU29ycnksIHlvdSBjYW4ndCBkZWxldGUgJHthY3R1YWxQcm9qZWN0LmdldE5hbWUoKX0gcHJvamVjdGApXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSBpZiAoYWN0dWFsUHJvamVjdC50YXNrcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChjb25maXJtKGBQcm9qZWN0ICR7YWN0dWFsUHJvamVjdC5nZXROYW1lKCl9IGlzIG5vdCBlbXB0eSwgYXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSBhbGwgdGhlIGNvbnRlbnQ/YCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHByb2plY3RzLnNwbGljZShwcm9qZWN0SW5kZXgsIDEpO1xuICAgICAgICAgICAgYWN0dWFsUHJvamVjdCA9IHByb2plY3RzW3Byb2plY3RJbmRleC0xXTtcbiAgICAgICAgICAgIGluaXRpYWxpemVXZWJQYWdlKCk7XG4gICAgICAgICAgICBwcm9qZWN0TGlzdC5vcHRpb25zW3Byb2plY3RJbmRleC0xXS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICBwcm9qZWN0SW5mby5pbm5lckhUTUwgPSAnQWN0dWFsIHByb2plY3Q6ICcgKyBhY3R1YWxQcm9qZWN0LmdldE5hbWUoKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2plY3RzLnNwbGljZShwcm9qZWN0SW5kZXgsIDEpO1xuICAgICAgICBhY3R1YWxQcm9qZWN0ID0gcHJvamVjdHNbcHJvamVjdEluZGV4LTFdXG4gICAgICAgIGluaXRpYWxpemVXZWJQYWdlKCk7XG4gICAgICAgIHByb2plY3RMaXN0Lm9wdGlvbnNbcHJvamVjdEluZGV4LTFdLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgcHJvamVjdEluZm8uaW5uZXJIVE1MID0gJ0FjdHVhbCBwcm9qZWN0OiAnICsgYWN0dWFsUHJvamVjdC5nZXROYW1lKCk7XG4gICAgfVxufVxuXG4vL2FrdHVhbGl6YWNqYSBsaXN0eSBha3R5d255Y2ggcHJvamVrdMOzd1xuXG5mdW5jdGlvbiB1cGRhdGVQcm9qZWN0TGlzdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWxpc3QnKTtcbiAgICBwcm9qZWN0TGlzdC5pbm5lckhUTUwgPSAnJztcblxuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgcHJvamVjdE9wdGlvbi5kYXRhc2V0LnByb2plY3RJZCA9IGluZGV4O1xuICAgICAgICBwcm9qZWN0T3B0aW9uLnZhbHVlID0gcHJvamVjdC5nZXROYW1lKCk7XG4gICAgICAgIHByb2plY3RPcHRpb24uaW5uZXJIVE1MID0gcHJvamVjdC5nZXROYW1lKCk7XG4gICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKHByb2plY3RPcHRpb24pO1xuICAgIH0pXG5cbiAgICBwcm9qZWN0TGlzdC5vcHRpb25zW3Byb2plY3RJbmRleF0uc2VsZWN0ZWQgPSB0cnVlO1xufVxuXG4vL8WCYWRvd2FuaWUgdGFza8OzdyBuYSBzdHJvbsSZXG5cbmZ1bmN0aW9uIGxvYWRUYXNrcygpIHtcbiAgICBjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3QnKTtcbiAgICB0b2RvTGlzdC5pbm5lckhUTUwgPSAnJztcblxuICAgIGFjdHVhbFByb2plY3QudGFza3MuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0b2RvLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCBibG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBibG9jay5jbGFzc0xpc3QuYWRkKCd0b2RvLWJsb2NrJyk7XG4gICAgICAgIGJsb2NrLmRhdGFzZXQudGFza0lkID0gaW5kZXg7XG4gICAgICAgIGNvbnN0IHRvZG9IZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdG9kb0hlYWRlci5jbGFzc0xpc3QuYWRkKCd0b2RvLWhlYWRlcicpO1xuXG4gICAgICAgIGNvbnN0IHRvZG9UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgY29uc3QgdG9kb0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cbiAgICAgICAgdG9kb1RpdGxlLmlubmVySFRNTCA9IHRhc2suZ2V0TmFtZSgpO1xuICAgICAgICB0b2RvVGl0bGUuY2xhc3NMaXN0LmFkZCgndG9kby10aXRsZScpXG5cbiAgICAgICAgdG9kb0RhdGUuaW5uZXJIVE1MID0gdGFzay5nZXREYXRlKCk7XG4gICAgICAgIHRvZG9EYXRlLmNsYXNzTGlzdC5hZGQoJ3RvZG8tZGF0ZScpO1xuXG4gICAgICAgIHRvZG9EYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3RGF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgbmV3RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBjb25zdCBuZXdEYXRlVG9vbHRpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIG5ld0RhdGVUb29sdGlwLmlubmVySFRNTCA9ICdQcmVzcyBlbnRlciB0byBjb25maXJtJztcbiAgICAgICAgICAgIG5ld0RhdGVUb29sdGlwLmNsYXNzTGlzdC5hZGQoJ3Rhc2stbmV3LWRhdGUtdG9vbHRpcCcpO1xuICAgICAgICAgICAgbmV3RGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgICAgICAgICAgbmV3RGF0ZS52YWx1ZSA9IHRhc2suZ2V0RGF0ZSgpO1xuICAgICAgICAgICAgbmV3RGF0ZS5pZCA9ICd0YXNrLW5ldy1kdWUtZGF0ZSc7XG4gICAgICAgICAgICBuZXdEYXRlLm5hbWUgPSAndGFzay1uZXctZHVlLWRhdGUnO1xuICAgICAgICAgICAgbmV3RGF0ZS5taW4gPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tY2EnKTtcbiAgICAgICAgICAgIG5ld0RhdGUubWF4ID0gXCIyMTAwLTAxLTAxXCI7XG4gICAgICAgICAgICB0b2RvRGF0ZS5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRvZG9IZWFkZXIuYXBwZW5kQ2hpbGQobmV3RGF0ZUNvbnRhaW5lcik7XG4gICAgICAgICAgICBuZXdEYXRlQ29udGFpbmVyLmFwcGVuZENoaWxkKG5ld0RhdGUpO1xuICAgICAgICAgICAgbmV3RGF0ZUNvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdEYXRlVG9vbHRpcClcbiAgICAgICAgICAgIG5ld0RhdGUuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgICAgICAgICB0YXNrLnNldERhdGUobmV3RGF0ZS52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgbmV3RGF0ZUNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdG9kb0RhdGUuaW5uZXJIVE1MID0gdGFzay5nZXREYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRvZG9IZWFkZXIuYXBwZW5kQ2hpbGQodG9kb0RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbmV3RGF0ZS5mb2N1cygpO1xuICAgICAgICB9KVxuXG4gICAgICAgIHRvZG9IZWFkZXIuYXBwZW5kKHRvZG9UaXRsZSwgdG9kb0RhdGUpO1xuICAgICAgICBibG9jay5hcHBlbmRDaGlsZCh0b2RvSGVhZGVyKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJsb2NrKTtcbiAgICAgICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgYmxvY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBibG9jay5jbGFzc0xpc3QuYWRkKCdleHBhbmQnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGUpID0+IHtcbiAgICAgICAgICAgIGlmICghYmxvY2suY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgYmxvY2suY2xhc3NMaXN0LnJlbW92ZSgnZXhwYW5kJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3Qgc3VidGFza0Jsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHN1YnRhc2tCbG9jay5jbGFzc0xpc3QuYWRkKCdzdWJ0YXNrLWJsb2NrJyk7XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKHN1YnRhc2tCbG9jaylcblxuICAgICAgICBjb25zdCBzdWJ0YXNrQmxvY2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XG4gICAgICAgIHN1YnRhc2tCbG9ja1RpdGxlLmNsYXNzTGlzdC5hZGQoJ3N1YnRhc2stYmxvY2stdGl0bGUnKTtcbiAgICAgICAgc3VidGFza0Jsb2NrVGl0bGUuaW5uZXJIVE1MID0gJ3N1YnRhc2sgbGlzdCc7XG4gICAgICAgIHN1YnRhc2tCbG9jay5hcHBlbmRDaGlsZChzdWJ0YXNrQmxvY2tUaXRsZSk7XG5cbiAgICAgICAgLy90dXRhaiBnZW5lcm93YW5pZSBzdWJ0YXNrw7N3IHcgdGFza3VcblxuICAgICAgICB0YXNrLnN1YnRhc2tzLmZvckVhY2goKHN1YnRhc2ssIHN1YmluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdWJ0YXNrUG9zaXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHN1YnRhc2tQb3NpdGlvbi5jbGFzc0xpc3QuYWRkKCdzdWJ0YXNrLXBvc2l0aW9uJyk7XG4gICAgICAgICAgICBzdWJ0YXNrUG9zaXRpb24uZGF0YXNldC5zdWJ0YXNrSWQgPSBzdWJpbmRleDtcbiAgICAgICAgICAgIHN1YnRhc2tCbG9jay5hcHBlbmRDaGlsZChzdWJ0YXNrUG9zaXRpb24pO1xuXG4gICAgICAgICAgICBjb25zdCBzdWJ0YXNrTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgc3VidGFza0xhYmVsLmZvciA9ICdzdWJ0YXNrJztcbiAgICAgICAgICAgIHN1YnRhc2tQb3NpdGlvbi5hcHBlbmRDaGlsZChzdWJ0YXNrTGFiZWwpXG4gICAgICAgICAgICBjb25zdCBzdWJ0YXNrQ2hlY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgc3VidGFza0NoZWNrLnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICAgICAgc3VidGFza0NoZWNrLmlkID0gJ3N1YnRhc2snXG4gICAgICAgICAgICBzdWJ0YXNrTGFiZWwuYXBwZW5kQ2hpbGQoc3VidGFza0NoZWNrKTtcbiAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgc3VidGFza05hbWUuY2xhc3NMaXN0LmFkZCgnc3VidGFzay1uYW1lJyk7XG4gICAgICAgICAgICBzdWJ0YXNrTmFtZS5pbm5lckhUTUwgPSBzdWJ0YXNrLm5hbWU7XG4gICAgICAgICAgICBzdWJ0YXNrTGFiZWwuYXBwZW5kQ2hpbGQoc3VidGFza05hbWUpO1xuICAgICAgICAgICAgY29uc3Qgc3VidGFza0RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICBzdWJ0YXNrRGF0ZS5jbGFzc0xpc3QuYWRkKCdzdWJ0YXNrLWRhdGUnKTtcbiAgICAgICAgICAgIHN1YnRhc2tEYXRlLmlubmVySFRNTCA9IHN1YnRhc2suZHVlRGF0ZTtcbiAgICAgICAgICAgIHN1YnRhc2tQb3NpdGlvbi5hcHBlbmRDaGlsZChzdWJ0YXNrRGF0ZSk7XG4gICAgICAgICAgICBjb25zdCBzdWJ0YXNrUmVtb3ZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBzdWJ0YXNrUmVtb3ZlLnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgICAgIHN1YnRhc2tSZW1vdmUuY2xhc3NMaXN0LmFkZCgnc3VidGFzay1yZW1vdmUnKTtcbiAgICAgICAgICAgIHN1YnRhc2tSZW1vdmUuaW5uZXJIVE1MID0gJyZ0aW1lczsnO1xuICAgICAgICAgICAgc3VidGFza1Bvc2l0aW9uLmFwcGVuZENoaWxkKHN1YnRhc2tSZW1vdmUpO1xuXG4gICAgICAgICAgICAvL3VzdXdhbmllIHN1YnRhc2vDs3cgYmV6cG/Fm3JlZG5pbyB3IGJsb2t1XG5cbiAgICAgICAgICAgIHN1YnRhc2tSZW1vdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYWN0dWFsUHJvamVjdC50YXNrc1tpbmRleF0uc3VidGFza3Muc3BsaWNlKHN1YmluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICBsb2FkVGFza3MoKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS10YXNrLWlkPVwiJHtpbmRleH1cIl1gKS5jbGFzc0xpc3QuYWRkKCdleHBhbmQnKTtcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICAvL3R1dGFqIGRvZGF3YW5pZSBzdWJ0YXNrw7N3IGJlenBvxZtyZWRuaW8gdyBibG9rdVxuXG4gICAgICAgIGNvbnN0IG5ld1N1YlRhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgbmV3U3ViVGFza0J1dHRvbi5pZCA9ICdhZGQtc3VidGFzay1ibG9jayc7XG4gICAgICAgIG5ld1N1YlRhc2tCdXR0b24uaW5uZXJIVE1MID0gJyZwbHVzOyc7XG4gICAgICAgIG5ld1N1YlRhc2tCdXR0b24udHlwZSA9ICdidXR0b24nO1xuICAgICAgICBzdWJ0YXNrQmxvY2suYXBwZW5kQ2hpbGQobmV3U3ViVGFza0J1dHRvbik7XG5cbiAgICAgICAgbmV3U3ViVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIG5ld1N1YlRhc2tCdXR0b24ucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5ld1N1YlRhc2tJbkJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBuZXdTdWJUYXNrSW5CbG9jay5jbGFzc0xpc3QuYWRkKCduZXctc3VidGFzay1ibG9jaycpO1xuICAgICAgICAgICAgc3VidGFza0Jsb2NrLmFwcGVuZENoaWxkKG5ld1N1YlRhc2tJbkJsb2NrKTtcblxuICAgICAgICAgICAgY29uc3QgbmV3U3ViVGFza0Zvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJylcbiAgICAgICAgICAgIG5ld1N1YlRhc2tGb3JtLmlkID0gJ25ldy1zdWJ0YXNrLWZvcm0tYmxvY2snO1xuICAgICAgICAgICAgbmV3U3ViVGFza0luQmxvY2suYXBwZW5kQ2hpbGQobmV3U3ViVGFza0Zvcm0pO1xuXG4gICAgICAgICAgICBjb25zdCBuZXdTdWJUYXNrTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgY29uc3QgbmV3U3ViVGFza1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1N1YlRhc2tEYXRlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgY29uc3QgbmV3U3ViVGFza0R1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgbmV3U3ViVGFza1RpdGxlLnR5cGUgPSAndGV4dCc7XG4gICAgICAgICAgICBuZXdTdWJUYXNrVGl0bGUuaWQgPSAnc3VidGFzay1uYW1lLWJsb2NrJztcbiAgICAgICAgICAgIG5ld1N1YlRhc2tUaXRsZS5uYW1lID0gJ3N1YnRhc2stbmFtZS1ibG9jayc7XG4gICAgICAgICAgICBuZXdTdWJUYXNrTGFiZWwuZm9yID0gbmV3U3ViVGFza1RpdGxlLmlkO1xuICAgICAgICAgICAgbmV3U3ViVGFza0xhYmVsLmlubmVySFRNTCA9ICdTdWJ0YXNrIG5hbWU6JztcbiAgICAgICAgICAgIG5ld1N1YlRhc2tMYWJlbC5hcHBlbmRDaGlsZChuZXdTdWJUYXNrVGl0bGUpO1xuICAgICAgICAgICAgbmV3U3ViVGFza0Zvcm0uYXBwZW5kQ2hpbGQobmV3U3ViVGFza0xhYmVsKTtcbiAgICAgICAgICAgIG5ld1N1YlRhc2tEdWVEYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgICAgICAgICBuZXdTdWJUYXNrRHVlRGF0ZS5pZCA9ICdzdWJ0YXNrLWR1ZS1kYXRlLWJsb2NrJztcbiAgICAgICAgICAgIG5ld1N1YlRhc2tEdWVEYXRlLm5hbWUgPSAnc3VidGFzay1kdWUtZGF0ZS1ibG9jayc7XG4gICAgICAgICAgICBuZXdTdWJUYXNrRHVlRGF0ZS5taW4gPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tY2EnKTtcbiAgICAgICAgICAgIG5ld1N1YlRhc2tEdWVEYXRlLm1heCA9IFwiMjEwMC0wMS0wMVwiO1xuICAgICAgICAgICAgbmV3U3ViVGFza0RhdGVMYWJlbC5pbm5lckhUTUwgPSAnU3VidGFzayBkdWUgZGF0ZTonO1xuICAgICAgICAgICAgbmV3U3ViVGFza0RhdGVMYWJlbC5hcHBlbmRDaGlsZChuZXdTdWJUYXNrRHVlRGF0ZSk7XG4gICAgICAgICAgICBuZXdTdWJUYXNrRm9ybS5hcHBlbmRDaGlsZChuZXdTdWJUYXNrRGF0ZUxhYmVsKTtcblxuICAgICAgICAgICAgY29uc3QgbmV3U3ViVGFza0NvbnRyb2xzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBuZXdTdWJUYXNrQ29udHJvbHMuY2xhc3NMaXN0LmFkZCgnbmV3LXN1YnRhc2stY29udHJvbHMtYmxvY2snKTtcbiAgICAgICAgICAgIG5ld1N1YlRhc2tJbkJsb2NrLmFwcGVuZENoaWxkKG5ld1N1YlRhc2tDb250cm9scylcblxuICAgICAgICAgICAgY29uc3QgbmV3U3ViVGFza0FkZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgY29uc3QgbmV3U3ViVGFza0FiYW5kb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIG5ld1N1YlRhc2tBZGQudHlwZSA9ICdidXR0b24nO1xuICAgICAgICAgICAgbmV3U3ViVGFza0FkZC5pbm5lckhUTUwgPSAnU3VibWl0J1xuICAgICAgICAgICAgbmV3U3ViVGFza0FiYW5kb24udHlwZSA9ICdidXR0b24nO1xuICAgICAgICAgICAgbmV3U3ViVGFza0FiYW5kb24uaW5uZXJIVE1MID0gJ0FiYW5kb24nO1xuICAgICAgICAgICAgbmV3U3ViVGFza0luQmxvY2suYXBwZW5kKG5ld1N1YlRhc2tBZGQsIG5ld1N1YlRhc2tBYmFuZG9uKVxuXG4gICAgICAgICAgICBuZXdTdWJUYXNrQWRkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tOYW1lQmxvY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VidGFzay1uYW1lLWJsb2NrJykudmFsdWU7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3VidGFza0R1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VidGFzay1kdWUtZGF0ZS1ibG9jaycpLnZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdHVhbFRhc2tJbmRleCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5leHBhbmQnKS5kYXRhc2V0LnRhc2tJZDtcblxuICAgICAgICAgICAgICAgIGlmIChzdWJ0YXNrTmFtZUJsb2NrID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBhbGVydChcIlNvcnJ5LCB0YXNrcyBtdXN0IGhhdmUgYSBuYW1lLlwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhY3R1YWxQcm9qZWN0LnRhc2tzW2FjdHVhbFRhc2tJbmRleF0uYWRkU3VidGFzayhzdWJ0YXNrTmFtZUJsb2NrLCBzdWJ0YXNrRHVlRGF0ZSk7XG4gICAgICAgICAgICAgICAgbG9hZFRhc2tzKCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtdGFzay1pZD1cIiR7YWN0dWFsVGFza0luZGV4fVwiXWApLmNsYXNzTGlzdC5hZGQoJ2V4cGFuZCcpO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgbmV3U3ViVGFza0FiYW5kb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3U3ViVGFza0luQmxvY2sucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgc3VidGFza0Jsb2NrLmFwcGVuZENoaWxkKG5ld1N1YlRhc2tCdXR0b24pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICAvL3VzdXdhbmllIHRhc2vDs3dcblxuICAgICAgICBjb25zdCByZW1vdmVUb2RvQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHJlbW92ZVRvZG9CdXR0b24uaWQgPSAncmVtb3ZlLXRvZG8nO1xuICAgICAgICByZW1vdmVUb2RvQnV0dG9uLmlubmVySFRNTCA9ICdSZW1vdmUnO1xuICAgICAgICByZW1vdmVUb2RvQnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQocmVtb3ZlVG9kb0J1dHRvbik7XG5cbiAgICAgICAgcmVtb3ZlVG9kb0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFjdHVhbFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXhwYW5kJyk7XG4gICAgICAgICAgICBjb25zdCBzdWJ0YXNrTGlzdCA9IGFjdHVhbFRhc2sucXVlcnlTZWxlY3RvckFsbCgnI3N1YnRhc2snKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN1YnRhc2tMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YnRhc2tMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJ0YXNrTGlzdFtpXS5jaGVja2VkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpcm0oYFRoZXJlIGFyZSB1bmRvbmUgc3VidGFza3MgaW4gJHt0YXNrLmdldE5hbWUoKX0sIHlvdSB3YW50IHRvIGRlbGV0ZSB3aG9sZSB0YXNrIGFueXdheT9gKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbFByb2plY3QudGFza3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkVGFza3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYWN0dWFsUHJvamVjdC50YXNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIGxvYWRUYXNrcygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhY3R1YWxQcm9qZWN0LnRhc2tzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgbG9hZFRhc2tzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICB9KVxuXG59XG5cbi8vxYJhZG93YW5pZSBub3dlZ28gcHJvamVrdHUgbmEgc3Ryb27EmSBpIHptaWFuYSBhY3R1YWxQcm9qZWN0XG5cbmNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbGlzdCcpO1xuY29uc3QgcHJvamVjdEluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyLXByb2plY3QtaW5mbycpO1xucHJvamVjdEluZm8uaW5uZXJIVE1MID0gJ0FjdHVhbCBwcm9qZWN0OiAnICsgYWN0dWFsUHJvamVjdC5nZXROYW1lKCk7XG5cbnByb2plY3RMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IHByb2plY3RMaXN0Lm9wdGlvbnNbcHJvamVjdExpc3Quc2VsZWN0ZWRJbmRleF1cbiAgICBhY3R1YWxQcm9qZWN0ID0gcHJvamVjdHNbc2VsZWN0ZWRPcHRpb24uZGF0YXNldC5wcm9qZWN0SWRdXG4gICAgcHJvamVjdEluZGV4ID0gc2VsZWN0ZWRPcHRpb24uZGF0YXNldC5wcm9qZWN0SWRcbiAgICBwcm9qZWN0SW5mby5pbm5lckhUTUwgPSAnQWN0dWFsIHByb2plY3Q6ICcgKyBhY3R1YWxQcm9qZWN0LmdldE5hbWUoKTtcbiAgICBjb25zb2xlLmxvZygnQWN0dWFsIHByb2plY3Q6ICcgKyBhY3R1YWxQcm9qZWN0LmdldE5hbWUoKSlcbiAgICBjb25zb2xlLmxvZyhzZWxlY3RlZE9wdGlvbi5kYXRhc2V0LnByb2plY3RJZClcbiAgICBsb2FkVGFza3MoKTtcbn0pO1xuXG4vL3R3b3J6ZW5pZSBmb3JtdWxhcnphIG5vd3ljaCB0YXNrw7N3IFxuXG5jb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10b2RvJyk7XG5jb25zdCBhZGRUb2RvRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdG9kby1mb3JtJyk7XG5jb25zdCBmb3JtT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtLW92ZXJsYXknKTtcbmNvbnN0IGNhbmNlbEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FuY2VsLWZvcm0nKTtcbmNvbnN0IHN1YlRhc2tTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtc3ViLWZvcm1dJyk7XG5hZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGFkZFRvZG9Gb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgIGZvcm1PdmVybGF5LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xufSlcbmNhbmNlbEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgYWRkVG9kb0Zvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgZm9ybU92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgc3ViVGFza1NlY3Rpb24uaW5uZXJIVE1MID0gJyc7XG4gICAgYWRkTmV3U3VidGFza3NDb250cm9scygpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzay1mb3JtJykucmVzZXQoKTtcbn0pXG5cbmNvbnN0IGR1ZURhdGVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZHVlLWRhdGUnKTtcbmR1ZURhdGVGb3JtLm1pbiA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1jYScpO1xuZHVlRGF0ZUZvcm0ubWF4ID0gXCIyMTAwLTAxLTAxXCI7XG5cbi8vcnlzb3dhbmllIGRvZGF3YW5pYSBzdWJ0YXNrw7N3IHcgZ8WCw7N3bnltIGZvcm11bGFyenVcblxuZnVuY3Rpb24gYWRkTmV3U3VidGFza3NDb250cm9scygpIHtcblxuICAgIGNvbnN0IHN1YlNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zdWItZm9ybV0nKTtcbiAgICBjb25zdCBzdWJTZWN0aW9uVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgIHN1YlNlY3Rpb25UaXRsZS5pbm5lckhUTUwgPSAnQWRkIG5ldyBzdWJ0YXNrJztcbiAgICBzdWJTZWN0aW9uLmFwcGVuZENoaWxkKHN1YlNlY3Rpb25UaXRsZSk7XG5cbiAgICBjb25zdCBhZGRTdWJUYXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYWRkU3ViVGFza0J1dHRvbi50eXBlID0gJ2J1dHRvbic7XG4gICAgYWRkU3ViVGFza0J1dHRvbi5pZCA9ICdhZGQtc3VidGFzay1mb3JtJztcbiAgICBhZGRTdWJUYXNrQnV0dG9uLmlubmVySFRNTCA9ICcmcGx1czsnXG4gICAgc3ViU2VjdGlvbi5hcHBlbmRDaGlsZChhZGRTdWJUYXNrQnV0dG9uKTtcblxuXG4gICAgYWRkU3ViVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3U3ViVGFza0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgY29uc3QgbmV3U3ViVGFza1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgY29uc3QgbmV3U3ViVGFza0RhdGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGNvbnN0IG5ld1N1YlRhc2tEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgbmV3U3ViVGFza1RpdGxlLnR5cGUgPSAndGV4dCc7XG4gICAgICAgIG5ld1N1YlRhc2tUaXRsZS5pZCA9ICdzdWJ0YXNrLW5hbWUnO1xuICAgICAgICBuZXdTdWJUYXNrVGl0bGUubmFtZSA9ICdzdWJ0YXNrLW5hbWUnO1xuICAgICAgICBuZXdTdWJUYXNrTGFiZWwuZm9yID0gbmV3U3ViVGFza1RpdGxlLmlkO1xuICAgICAgICBuZXdTdWJUYXNrTGFiZWwuaW5uZXJIVE1MID0gJ1N1YnRhc2sgbmFtZTonO1xuICAgICAgICBuZXdTdWJUYXNrTGFiZWwuYXBwZW5kQ2hpbGQobmV3U3ViVGFza1RpdGxlKTtcbiAgICAgICAgYWRkU3ViVGFza0J1dHRvbi5iZWZvcmUobmV3U3ViVGFza0xhYmVsKTtcbiAgICAgICAgbmV3U3ViVGFza0R1ZURhdGUudHlwZSA9ICdkYXRlJztcbiAgICAgICAgbmV3U3ViVGFza0R1ZURhdGUuaWQgPSAnc3VidGFzay1kdWUtZGF0ZSc7XG4gICAgICAgIG5ld1N1YlRhc2tEdWVEYXRlLm5hbWUgPSAnc3VidGFzay1kdWUtZGF0ZSc7XG4gICAgICAgIG5ld1N1YlRhc2tEdWVEYXRlLm1pbiA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1jYScpO1xuICAgICAgICBuZXdTdWJUYXNrRHVlRGF0ZS5tYXggPSBcIjIxMDAtMDEtMDFcIjtcbiAgICAgICAgbmV3U3ViVGFza0RhdGVMYWJlbC5pbm5lckhUTUwgPSAnU3VidGFzayBkdWUgZGF0ZTonO1xuICAgICAgICBuZXdTdWJUYXNrRGF0ZUxhYmVsLmFwcGVuZENoaWxkKG5ld1N1YlRhc2tEdWVEYXRlKTtcbiAgICAgICAgYWRkU3ViVGFza0J1dHRvbi5iZWZvcmUobmV3U3ViVGFza0RhdGVMYWJlbCk7XG4gICAgfSk7XG5cbn07XG5cbi8vZG9kYXdhbmllIG5vd3ljaCB0YXNrw7N3XG5cbmNvbnN0IGNvbmZpcm1UYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbmZpcm0tdGFzay1idXR0b24nKTtcblxuY29uZmlybVRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB0YXNrTmFtZVZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stbmFtZScpLnZhbHVlO1xuICAgIGxldCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLWR1ZS1kYXRlJykudmFsdWU7XG5cbiAgICBpZiAodGFza05hbWVWYWx1ZSA9PT0gJycpIHtcbiAgICAgICAgYWxlcnQoXCJTb3JyeSwgdGFza3MgbXVzdCBoYXZlIGEgbmFtZS5cIilcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgYWN0dWFsUHJvamVjdC5hZGRUYXNrKHRhc2tOYW1lVmFsdWUsIHRhc2tEdWVEYXRlKTtcblxuICAgIGNvbnN0IHN1YlRhc2tTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtc3ViLWZvcm1dJyk7XG4gICAgY29uc3Qgc3ViVGFza1NlY3Rpb25FbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXN1Yi1mb3JtXScpLmVsZW1lbnRzO1xuICAgIGNvbnN0IGFkZGVkVGFza0luZGV4ID0gYWN0dWFsUHJvamVjdC50YXNrcy5sZW5ndGggLSAxO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGk8c3ViVGFza1NlY3Rpb25FbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc3ViVGFza1NlY3Rpb25FbGVtZW50c1tpXS50eXBlID09PSAndGV4dCcgJiYgc3ViVGFza1NlY3Rpb25FbGVtZW50c1tpXS52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgIGFjdHVhbFByb2plY3QudGFza3NbYWRkZWRUYXNrSW5kZXhdLmFkZFN1YnRhc2soc3ViVGFza1NlY3Rpb25FbGVtZW50c1tpXS52YWx1ZSwgc3ViVGFza1NlY3Rpb25FbGVtZW50c1tpKzFdLnZhbHVlKVxuICAgICAgICB9IGVsc2UgaWYgKHN1YlRhc2tTZWN0aW9uRWxlbWVudHNbaV0udHlwZSA9PT0gJ3RleHQnICYmIHN1YlRhc2tTZWN0aW9uRWxlbWVudHNbaV0udmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICBhbGVydChcIlNvcnJ5LCB0YXNrcyBtdXN0IGhhdmUgYSBuYW1lLlwiKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2FkVGFza3MoKTtcbiAgICBhZGRUb2RvRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICBmb3JtT3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRhc2stZm9ybScpLnJlc2V0KCk7XG4gICAgc3ViVGFza1NlY3Rpb24uaW5uZXJIVE1MID0gJyc7XG4gICAgYWRkTmV3U3VidGFza3NDb250cm9scygpXG59KVxuXG5cblxuXG5leHBvcnQgeyBpbml0aWFsaXplV2ViUGFnZSB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgaW5pdGlhbGl6ZVdlYlBhZ2UgfSBmcm9tIFwiLi9tb2R1bGVzL3VpXCI7XG5cbmluaXRpYWxpemVXZWJQYWdlKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=