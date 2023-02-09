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
    const addSubtask = (name, dueDate) => {
        if (dueDate === '') {
            dueDate = 'no date';
        }
        subtasks.push({name, dueDate});
    }

    return { subtasks, getName, getDate, addSubtask }
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

let actualProject = _projects__WEBPACK_IMPORTED_MODULE_0__.projects[0]

//ładowanie strony

function initializeWebPage() {
    addProjectButton.addEventListener('click', initializeNewProject);

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
        _projects__WEBPACK_IMPORTED_MODULE_0__.projects.push((0,_projects__WEBPACK_IMPORTED_MODULE_0__["default"])(projectName));
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

    _projects__WEBPACK_IMPORTED_MODULE_0__.projects.forEach((project, index) => {
        const projectOption = document.createElement('option');
        projectOption.dataset.projectId = index;
        projectOption.value = project.getName();
        projectOption.innerHTML = project.getName();
        projectList.appendChild(projectOption);
    })
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

        task.subtasks.forEach((subtask, index) => {
            const subtaskPosition = document.createElement('div');
            subtaskPosition.classList.add('subtask-position');
            subtaskPosition.dataset.subtaskId = index;
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

        const removeTodoButton = document.createElement('button');
        removeTodoButton.id = 'remove-todo';
        removeTodoButton.innerHTML = 'Remove';
        removeTodoButton.type = 'button';
        block.appendChild(removeTodoButton);
    })

}

//ładowanie nowego projektu na stronę i zmiana actualProject

const projectList = document.querySelector('#project-list');
const projectInfo = document.querySelector('.header-project-info');
projectInfo.innerHTML = 'Actual project: ' + actualProject.getName();

projectList.addEventListener('change', () => {
    const selectedOption = projectList.options[projectList.selectedIndex]
    actualProject = _projects__WEBPACK_IMPORTED_MODULE_0__.projects[selectedOption.dataset.projectId]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLGlDQUFpQztBQUNyRDtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7O1VDaFZEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOaUQ7O0FBRWpELDhEQUFpQiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2tzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3VpLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBuZXdUYXNrIGZyb20gJy4vdGFza3MuanMnO1xuXG5sZXQgcHJvamVjdHMgPSBbXTtcblxuY29uc3QgUHJvamVjdCA9IChuYW1lKSA9PiB7XG5cbiAgICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcblxuICAgIGxldCB0YXNrcyA9IFtdO1xuXG4gICAgY29uc3QgYWRkVGFzayA9IChuYW1lLCBkdWVEYXRlKSA9PiB7XG4gICAgICAgIGlmIChkdWVEYXRlID09PSAnJykge1xuICAgICAgICAgICAgZHVlRGF0ZSA9ICdubyBkYXRlJztcbiAgICAgICAgfVxuICAgICAgICB0YXNrcy5wdXNoKG5ld1Rhc2sobmFtZSwgZHVlRGF0ZSkpO1xuICAgIH07XG4gICAgXG4gICAgcmV0dXJuIHsgZ2V0TmFtZSwgYWRkVGFzaywgdGFza3MgfTtcbn07XG5cbmNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gUHJvamVjdCgnRGVmYXVsdCcpO1xuY29uc3QgdGVzdFByb2plY3QgPSBQcm9qZWN0KCdUZXN0Jyk7XG5jb25zdCBzY2hvb2xQcm9qZWN0ID0gUHJvamVjdCgnU2Nob29sJyk7XG5cbnByb2plY3RzLnB1c2goZGVmYXVsdFByb2plY3QsIHRlc3RQcm9qZWN0LCBzY2hvb2xQcm9qZWN0KTtcblxuZGVmYXVsdFByb2plY3QuYWRkVGFzaygnZmlyc3QgdGFzaycsICcyMDIzLTEwLTAzJyk7XG5kZWZhdWx0UHJvamVjdC5hZGRUYXNrKCdzZWNvbmQgdGFzaycsICcnKTtcbmRlZmF1bHRQcm9qZWN0LmFkZFRhc2soJ3RoaXJkIHRhc2snLCAnMjAyMy0xMy0xMicpO1xuXG50ZXN0UHJvamVjdC5hZGRUYXNrKCdmb3VydGggdGFzaycsICcnKTtcblxuc2Nob29sUHJvamVjdC5hZGRUYXNrKCdmaWZ0aCB0YXNrJywgJycpO1xuXG5kZWZhdWx0UHJvamVjdC50YXNrc1swXS5hZGRTdWJ0YXNrKCdmaXJzdCBzdWInLCAnJyk7XG5kZWZhdWx0UHJvamVjdC50YXNrc1swXS5hZGRTdWJ0YXNrKCdzZWNvbmQgc3ViJywgJycpO1xuZGVmYXVsdFByb2plY3QudGFza3NbMl0uYWRkU3VidGFzaygndGhpcmQgc3ViJywgJycpO1xuXG5cbi8vY29uc29sZS5sb2coZGVmYXVsdFByb2plY3QudGFza3NbMF0uc3VidGFza3NbMF0pXG5cblxuLy9jb25zb2xlLmxvZygnUHJvamVjdCBsaXN0OiAnICsgcHJvamVjdHMpXG5cbi8vIGNvbnNvbGUubG9nKGRlZmF1bHRQcm9qZWN0LnRhc2tzWzBdLmdldE5hbWUoKSlcbi8vIGNvbnNvbGUubG9nKGRlZmF1bHRQcm9qZWN0LnRhc2tzWzBdLmdldERhdGUoKSlcblxuXG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3Q7XG5leHBvcnQgeyBwcm9qZWN0cyB9OyIsImNvbnN0IFRhc2sgPSAobmFtZSwgZHVlRGF0ZSkgPT4ge1xuXG4gICAgbGV0IHN1YnRhc2tzID0gW107XG5cbiAgICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcbiAgICBjb25zdCBnZXREYXRlID0gKCkgPT4gZHVlRGF0ZTtcbiAgICBjb25zdCBhZGRTdWJ0YXNrID0gKG5hbWUsIGR1ZURhdGUpID0+IHtcbiAgICAgICAgaWYgKGR1ZURhdGUgPT09ICcnKSB7XG4gICAgICAgICAgICBkdWVEYXRlID0gJ25vIGRhdGUnO1xuICAgICAgICB9XG4gICAgICAgIHN1YnRhc2tzLnB1c2goe25hbWUsIGR1ZURhdGV9KTtcbiAgICB9XG5cbiAgICByZXR1cm4geyBzdWJ0YXNrcywgZ2V0TmFtZSwgZ2V0RGF0ZSwgYWRkU3VidGFzayB9XG59O1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgVGFzazsiLCJpbXBvcnQgUHJvamVjdCBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCB7IHByb2plY3RzIH0gZnJvbSAnLi9wcm9qZWN0cyc7XG5cbmNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3QnKTtcbmNvbnN0IGhlYWRlclByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyLXByb2plY3QtbGlzdCcpO1xuXG5sZXQgYWN0dWFsUHJvamVjdCA9IHByb2plY3RzWzBdXG5cbi8vxYJhZG93YW5pZSBzdHJvbnlcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVdlYlBhZ2UoKSB7XG4gICAgYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGluaXRpYWxpemVOZXdQcm9qZWN0KTtcblxuICAgIHVwZGF0ZVByb2plY3RMaXN0KCk7XG4gICAgbG9hZFRhc2tzKCk7XG4gICAgYWRkTmV3U3VidGFza3NDb250cm9scygpXG59O1xuXG4vL2RvZGF3YW5pZSBub3dlZ28gcHJvamVrdHVcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZU5ld1Byb2plY3QoKSB7XG5cbiAgICBhZGRQcm9qZWN0QnV0dG9uLnJlbW92ZSgpOztcbiAgICBjb25zdCBhZGRQcm9qZWN0Rm9ybUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBhZGRQcm9qZWN0Rm9ybUlucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgYWRkUHJvamVjdEZvcm1JbnB1dC5wbGFjZWhvbGRlciA9ICdwcm9qZWN0IG5hbWUnXG4gICAgYWRkUHJvamVjdEZvcm1JbnB1dC5yZXF1aXJlZCA9IHRydWU7XG4gICAgaGVhZGVyUHJvamVjdC5hcHBlbmRDaGlsZChhZGRQcm9qZWN0Rm9ybUlucHV0KTtcbiAgICBjb25zdCBhZGRQcm9qZWN0Rm9ybUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGFkZFByb2plY3RGb3JtQnV0dG9uLm9uY2xpY2sgPSBnZXRQcm9qZWN0TmFtZTtcbiAgICBhZGRQcm9qZWN0Rm9ybUJ1dHRvbi5pbm5lckhUTUwgPSAnY29uZmlybSdcbiAgICBhZGRQcm9qZWN0Rm9ybUJ1dHRvbi5pZCA9ICdidXR0b24tcHJvamVjdC1hY2NlcHQnO1xuICAgIGhlYWRlclByb2plY3QuYXBwZW5kQ2hpbGQoYWRkUHJvamVjdEZvcm1CdXR0b24pO1xuXG4gICAgZnVuY3Rpb24gZ2V0UHJvamVjdE5hbWUoKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gYWRkUHJvamVjdEZvcm1JbnB1dC52YWx1ZVxuXG4gICAgICAgIGlmIChwcm9qZWN0TmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9qZWN0IG11c3QgYmUgbmFtZWQnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coJ05ldyBwcm9qZWN0IG5hbWUgaXMgJyArIHByb2plY3ROYW1lKVxuICAgICAgICBwcm9qZWN0cy5wdXNoKFByb2plY3QocHJvamVjdE5hbWUpKTtcbiAgICAgICAgYWRkUHJvamVjdEZvcm1JbnB1dC5yZW1vdmUoKTtcbiAgICAgICAgYWRkUHJvamVjdEZvcm1CdXR0b24ucmVtb3ZlKCk7XG4gICAgICAgIGhlYWRlclByb2plY3QuYXBwZW5kQ2hpbGQoYWRkUHJvamVjdEJ1dHRvbik7XG4gICAgICAgIGluaXRpYWxpemVXZWJQYWdlKCk7XG4gICAgfTtcbn07XG5cbi8vYWt0dWFsaXphY2phIGxpc3R5IGFrdHl3bnljaCBwcm9qZWt0w7N3XG5cbmZ1bmN0aW9uIHVwZGF0ZVByb2plY3RMaXN0KCkge1xuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbGlzdCcpO1xuICAgIHByb2plY3RMaXN0LmlubmVySFRNTCA9ICcnO1xuXG4gICAgcHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICBwcm9qZWN0T3B0aW9uLmRhdGFzZXQucHJvamVjdElkID0gaW5kZXg7XG4gICAgICAgIHByb2plY3RPcHRpb24udmFsdWUgPSBwcm9qZWN0LmdldE5hbWUoKTtcbiAgICAgICAgcHJvamVjdE9wdGlvbi5pbm5lckhUTUwgPSBwcm9qZWN0LmdldE5hbWUoKTtcbiAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQocHJvamVjdE9wdGlvbik7XG4gICAgfSlcbn1cblxuLy/FgmFkb3dhbmllIHRhc2vDs3cgbmEgc3Ryb27EmVxuXG5mdW5jdGlvbiBsb2FkVGFza3MoKSB7XG4gICAgY29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0Jyk7XG4gICAgdG9kb0xpc3QuaW5uZXJIVE1MID0gJyc7XG5cbiAgICBhY3R1YWxQcm9qZWN0LnRhc2tzLmZvckVhY2goKHRhc2ssIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgndG9kby1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgYmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYmxvY2suY2xhc3NMaXN0LmFkZCgndG9kby1ibG9jaycpO1xuICAgICAgICBibG9jay5kYXRhc2V0LnRhc2tJZCA9IGluZGV4O1xuICAgICAgICBjb25zdCB0b2RvSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRvZG9IZWFkZXIuY2xhc3NMaXN0LmFkZCgndG9kby1oZWFkZXInKTtcblxuICAgICAgICBjb25zdCB0b2RvVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIGNvbnN0IHRvZG9EYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXG4gICAgICAgIHRvZG9UaXRsZS5pbm5lckhUTUwgPSB0YXNrLmdldE5hbWUoKTtcbiAgICAgICAgdG9kb1RpdGxlLmNsYXNzTGlzdC5hZGQoJ3RvZG8tdGl0bGUnKVxuXG4gICAgICAgIHRvZG9EYXRlLmlubmVySFRNTCA9IHRhc2suZ2V0RGF0ZSgpO1xuICAgICAgICB0b2RvRGF0ZS5jbGFzc0xpc3QuYWRkKCd0b2RvLWRhdGUnKTtcblxuICAgICAgICB0b2RvSGVhZGVyLmFwcGVuZCh0b2RvVGl0bGUsIHRvZG9EYXRlKTtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQodG9kb0hlYWRlcik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChibG9jayk7XG4gICAgICAgIHRvZG9MaXN0LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgIGJsb2NrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgYmxvY2suY2xhc3NMaXN0LmFkZCgnZXhwYW5kJyk7XG4gICAgICAgIH0pO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWJsb2NrLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIGJsb2NrLmNsYXNzTGlzdC5yZW1vdmUoJ2V4cGFuZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IHN1YnRhc2tCbG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzdWJ0YXNrQmxvY2suY2xhc3NMaXN0LmFkZCgnc3VidGFzay1ibG9jaycpO1xuICAgICAgICBibG9jay5hcHBlbmRDaGlsZChzdWJ0YXNrQmxvY2spXG5cbiAgICAgICAgY29uc3Qgc3VidGFza0Jsb2NrVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xuICAgICAgICBzdWJ0YXNrQmxvY2tUaXRsZS5jbGFzc0xpc3QuYWRkKCdzdWJ0YXNrLWJsb2NrLXRpdGxlJyk7XG4gICAgICAgIHN1YnRhc2tCbG9ja1RpdGxlLmlubmVySFRNTCA9ICdzdWJ0YXNrIGxpc3QnO1xuICAgICAgICBzdWJ0YXNrQmxvY2suYXBwZW5kQ2hpbGQoc3VidGFza0Jsb2NrVGl0bGUpO1xuXG4gICAgICAgIC8vdHV0YWogZ2VuZXJvd2FuaWUgc3VidGFza8OzdyB3IHRhc2t1XG5cbiAgICAgICAgdGFzay5zdWJ0YXNrcy5mb3JFYWNoKChzdWJ0YXNrLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3VidGFza1Bvc2l0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBzdWJ0YXNrUG9zaXRpb24uY2xhc3NMaXN0LmFkZCgnc3VidGFzay1wb3NpdGlvbicpO1xuICAgICAgICAgICAgc3VidGFza1Bvc2l0aW9uLmRhdGFzZXQuc3VidGFza0lkID0gaW5kZXg7XG4gICAgICAgICAgICBzdWJ0YXNrQmxvY2suYXBwZW5kQ2hpbGQoc3VidGFza1Bvc2l0aW9uKTtcblxuICAgICAgICAgICAgY29uc3Qgc3VidGFza0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIHN1YnRhc2tMYWJlbC5mb3IgPSAnc3VidGFzayc7XG4gICAgICAgICAgICBzdWJ0YXNrUG9zaXRpb24uYXBwZW5kQ2hpbGQoc3VidGFza0xhYmVsKVxuICAgICAgICAgICAgY29uc3Qgc3VidGFza0NoZWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIHN1YnRhc2tDaGVjay50eXBlID0gJ2NoZWNrYm94JztcbiAgICAgICAgICAgIHN1YnRhc2tDaGVjay5pZCA9ICdzdWJ0YXNrJ1xuICAgICAgICAgICAgc3VidGFza0xhYmVsLmFwcGVuZENoaWxkKHN1YnRhc2tDaGVjayk7XG4gICAgICAgICAgICBjb25zdCBzdWJ0YXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIHN1YnRhc2tOYW1lLmNsYXNzTGlzdC5hZGQoJ3N1YnRhc2stbmFtZScpO1xuICAgICAgICAgICAgc3VidGFza05hbWUuaW5uZXJIVE1MID0gc3VidGFzay5uYW1lO1xuICAgICAgICAgICAgc3VidGFza0xhYmVsLmFwcGVuZENoaWxkKHN1YnRhc2tOYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgc3VidGFza0RhdGUuY2xhc3NMaXN0LmFkZCgnc3VidGFzay1kYXRlJyk7XG4gICAgICAgICAgICBzdWJ0YXNrRGF0ZS5pbm5lckhUTUwgPSBzdWJ0YXNrLmR1ZURhdGU7XG4gICAgICAgICAgICBzdWJ0YXNrUG9zaXRpb24uYXBwZW5kQ2hpbGQoc3VidGFza0RhdGUpO1xuICAgICAgICAgICAgY29uc3Qgc3VidGFza1JlbW92ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgc3VidGFza1JlbW92ZS50eXBlID0gJ2J1dHRvbic7XG4gICAgICAgICAgICBzdWJ0YXNrUmVtb3ZlLmNsYXNzTGlzdC5hZGQoJ3N1YnRhc2stcmVtb3ZlJyk7XG4gICAgICAgICAgICBzdWJ0YXNrUmVtb3ZlLmlubmVySFRNTCA9ICcmdGltZXM7JztcbiAgICAgICAgICAgIHN1YnRhc2tQb3NpdGlvbi5hcHBlbmRDaGlsZChzdWJ0YXNrUmVtb3ZlKTtcbiAgICAgICAgfSlcblxuICAgICAgICAvL3R1dGFqIGRvZGF3YW5pZSBzdWJ0YXNrw7N3IGJlenBvxZtyZWRuaW8gdyBibG9rdVxuXG4gICAgICAgIGNvbnN0IG5ld1N1YlRhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgbmV3U3ViVGFza0J1dHRvbi5pZCA9ICdhZGQtc3VidGFzay1ibG9jayc7XG4gICAgICAgIG5ld1N1YlRhc2tCdXR0b24uaW5uZXJIVE1MID0gJyZwbHVzOyc7XG4gICAgICAgIG5ld1N1YlRhc2tCdXR0b24udHlwZSA9ICdidXR0b24nO1xuICAgICAgICBzdWJ0YXNrQmxvY2suYXBwZW5kQ2hpbGQobmV3U3ViVGFza0J1dHRvbik7XG5cbiAgICAgICAgbmV3U3ViVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIG5ld1N1YlRhc2tCdXR0b24ucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5ld1N1YlRhc2tJbkJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBuZXdTdWJUYXNrSW5CbG9jay5jbGFzc0xpc3QuYWRkKCduZXctc3VidGFzay1ibG9jaycpO1xuICAgICAgICAgICAgc3VidGFza0Jsb2NrLmFwcGVuZENoaWxkKG5ld1N1YlRhc2tJbkJsb2NrKTtcblxuICAgICAgICAgICAgY29uc3QgbmV3U3ViVGFza0Zvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJylcbiAgICAgICAgICAgIG5ld1N1YlRhc2tGb3JtLmlkID0gJ25ldy1zdWJ0YXNrLWZvcm0tYmxvY2snO1xuICAgICAgICAgICAgbmV3U3ViVGFza0luQmxvY2suYXBwZW5kQ2hpbGQobmV3U3ViVGFza0Zvcm0pO1xuXG4gICAgICAgICAgICBjb25zdCBuZXdTdWJUYXNrTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgY29uc3QgbmV3U3ViVGFza1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1N1YlRhc2tEYXRlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgY29uc3QgbmV3U3ViVGFza0R1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgbmV3U3ViVGFza1RpdGxlLnR5cGUgPSAndGV4dCc7XG4gICAgICAgICAgICBuZXdTdWJUYXNrVGl0bGUuaWQgPSAnc3VidGFzay1uYW1lLWJsb2NrJztcbiAgICAgICAgICAgIG5ld1N1YlRhc2tUaXRsZS5uYW1lID0gJ3N1YnRhc2stbmFtZS1ibG9jayc7XG4gICAgICAgICAgICBuZXdTdWJUYXNrTGFiZWwuZm9yID0gbmV3U3ViVGFza1RpdGxlLmlkO1xuICAgICAgICAgICAgbmV3U3ViVGFza0xhYmVsLmlubmVySFRNTCA9ICdTdWJ0YXNrIG5hbWU6JztcbiAgICAgICAgICAgIG5ld1N1YlRhc2tMYWJlbC5hcHBlbmRDaGlsZChuZXdTdWJUYXNrVGl0bGUpO1xuICAgICAgICAgICAgbmV3U3ViVGFza0Zvcm0uYXBwZW5kQ2hpbGQobmV3U3ViVGFza0xhYmVsKTtcbiAgICAgICAgICAgIG5ld1N1YlRhc2tEdWVEYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgICAgICAgICBuZXdTdWJUYXNrRHVlRGF0ZS5pZCA9ICdzdWJ0YXNrLWR1ZS1kYXRlLWJsb2NrJztcbiAgICAgICAgICAgIG5ld1N1YlRhc2tEdWVEYXRlLm5hbWUgPSAnc3VidGFzay1kdWUtZGF0ZS1ibG9jayc7XG4gICAgICAgICAgICBuZXdTdWJUYXNrRHVlRGF0ZS5taW4gPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tY2EnKTtcbiAgICAgICAgICAgIG5ld1N1YlRhc2tEdWVEYXRlLm1heCA9IFwiMjEwMC0wMS0wMVwiO1xuICAgICAgICAgICAgbmV3U3ViVGFza0RhdGVMYWJlbC5pbm5lckhUTUwgPSAnU3VidGFzayBkdWUgZGF0ZTonO1xuICAgICAgICAgICAgbmV3U3ViVGFza0RhdGVMYWJlbC5hcHBlbmRDaGlsZChuZXdTdWJUYXNrRHVlRGF0ZSk7XG4gICAgICAgICAgICBuZXdTdWJUYXNrRm9ybS5hcHBlbmRDaGlsZChuZXdTdWJUYXNrRGF0ZUxhYmVsKTtcblxuICAgICAgICAgICAgY29uc3QgbmV3U3ViVGFza0NvbnRyb2xzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBuZXdTdWJUYXNrQ29udHJvbHMuY2xhc3NMaXN0LmFkZCgnbmV3LXN1YnRhc2stY29udHJvbHMtYmxvY2snKTtcbiAgICAgICAgICAgIG5ld1N1YlRhc2tJbkJsb2NrLmFwcGVuZENoaWxkKG5ld1N1YlRhc2tDb250cm9scylcblxuICAgICAgICAgICAgY29uc3QgbmV3U3ViVGFza0FkZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgY29uc3QgbmV3U3ViVGFza0FiYW5kb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIG5ld1N1YlRhc2tBZGQudHlwZSA9ICdidXR0b24nO1xuICAgICAgICAgICAgbmV3U3ViVGFza0FkZC5pbm5lckhUTUwgPSAnU3VibWl0J1xuICAgICAgICAgICAgbmV3U3ViVGFza0FiYW5kb24udHlwZSA9ICdidXR0b24nO1xuICAgICAgICAgICAgbmV3U3ViVGFza0FiYW5kb24uaW5uZXJIVE1MID0gJ0FiYW5kb24nO1xuICAgICAgICAgICAgbmV3U3ViVGFza0luQmxvY2suYXBwZW5kKG5ld1N1YlRhc2tBZGQsIG5ld1N1YlRhc2tBYmFuZG9uKVxuXG4gICAgICAgICAgICBuZXdTdWJUYXNrQWRkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tOYW1lQmxvY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VidGFzay1uYW1lLWJsb2NrJykudmFsdWU7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3VidGFza0R1ZURhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VidGFzay1kdWUtZGF0ZS1ibG9jaycpLnZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdHVhbFRhc2tJbmRleCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5leHBhbmQnKS5kYXRhc2V0LnRhc2tJZDtcblxuICAgICAgICAgICAgICAgIGlmIChzdWJ0YXNrTmFtZUJsb2NrID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICBhbGVydChcIlNvcnJ5LCB0YXNrcyBtdXN0IGhhdmUgYSBuYW1lLlwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhY3R1YWxQcm9qZWN0LnRhc2tzW2FjdHVhbFRhc2tJbmRleF0uYWRkU3VidGFzayhzdWJ0YXNrTmFtZUJsb2NrLCBzdWJ0YXNrRHVlRGF0ZSk7XG4gICAgICAgICAgICAgICAgbG9hZFRhc2tzKCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtdGFzay1pZD1cIiR7YWN0dWFsVGFza0luZGV4fVwiXWApLmNsYXNzTGlzdC5hZGQoJ2V4cGFuZCcpO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgbmV3U3ViVGFza0FiYW5kb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3U3ViVGFza0luQmxvY2sucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgc3VidGFza0Jsb2NrLmFwcGVuZENoaWxkKG5ld1N1YlRhc2tCdXR0b24pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCByZW1vdmVUb2RvQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHJlbW92ZVRvZG9CdXR0b24uaWQgPSAncmVtb3ZlLXRvZG8nO1xuICAgICAgICByZW1vdmVUb2RvQnV0dG9uLmlubmVySFRNTCA9ICdSZW1vdmUnO1xuICAgICAgICByZW1vdmVUb2RvQnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQocmVtb3ZlVG9kb0J1dHRvbik7XG4gICAgfSlcblxufVxuXG4vL8WCYWRvd2FuaWUgbm93ZWdvIHByb2pla3R1IG5hIHN0cm9uxJkgaSB6bWlhbmEgYWN0dWFsUHJvamVjdFxuXG5jb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWxpc3QnKTtcbmNvbnN0IHByb2plY3RJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlci1wcm9qZWN0LWluZm8nKTtcbnByb2plY3RJbmZvLmlubmVySFRNTCA9ICdBY3R1YWwgcHJvamVjdDogJyArIGFjdHVhbFByb2plY3QuZ2V0TmFtZSgpO1xuXG5wcm9qZWN0TGlzdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSBwcm9qZWN0TGlzdC5vcHRpb25zW3Byb2plY3RMaXN0LnNlbGVjdGVkSW5kZXhdXG4gICAgYWN0dWFsUHJvamVjdCA9IHByb2plY3RzW3NlbGVjdGVkT3B0aW9uLmRhdGFzZXQucHJvamVjdElkXVxuICAgIHByb2plY3RJbmZvLmlubmVySFRNTCA9ICdBY3R1YWwgcHJvamVjdDogJyArIGFjdHVhbFByb2plY3QuZ2V0TmFtZSgpO1xuICAgIGNvbnNvbGUubG9nKCdBY3R1YWwgcHJvamVjdDogJyArIGFjdHVhbFByb2plY3QuZ2V0TmFtZSgpKVxuICAgIGNvbnNvbGUubG9nKHNlbGVjdGVkT3B0aW9uLmRhdGFzZXQucHJvamVjdElkKVxuICAgIGxvYWRUYXNrcygpO1xufSk7XG5cbi8vdHdvcnplbmllIGZvcm11bGFyemEgbm93eWNoIHRhc2vDs3cgXG5cbmNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRvZG8nKTtcbmNvbnN0IGFkZFRvZG9Gb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10b2RvLWZvcm0nKTtcbmNvbnN0IGZvcm1PdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm0tb3ZlcmxheScpO1xuY29uc3QgY2FuY2VsRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW5jZWwtZm9ybScpO1xuY29uc3Qgc3ViVGFza1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zdWItZm9ybV0nKTtcbmFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgYWRkVG9kb0Zvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgZm9ybU92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG59KVxuY2FuY2VsRm9ybS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBhZGRUb2RvRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICBmb3JtT3ZlcmxheS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICBzdWJUYXNrU2VjdGlvbi5pbm5lckhUTUwgPSAnJztcbiAgICBhZGROZXdTdWJ0YXNrc0NvbnRyb2xzKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC10YXNrLWZvcm0nKS5yZXNldCgpO1xufSlcblxuY29uc3QgZHVlRGF0ZUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kdWUtZGF0ZScpO1xuZHVlRGF0ZUZvcm0ubWluID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLWNhJyk7XG5kdWVEYXRlRm9ybS5tYXggPSBcIjIxMDAtMDEtMDFcIjtcblxuLy9yeXNvd2FuaWUgZG9kYXdhbmlhIHN1YnRhc2vDs3cgdyBnxYLDs3dueW0gZm9ybXVsYXJ6dVxuXG5mdW5jdGlvbiBhZGROZXdTdWJ0YXNrc0NvbnRyb2xzKCkge1xuXG4gICAgY29uc3Qgc3ViU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXN1Yi1mb3JtXScpO1xuICAgIGNvbnN0IHN1YlNlY3Rpb25UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgc3ViU2VjdGlvblRpdGxlLmlubmVySFRNTCA9ICdBZGQgbmV3IHN1YnRhc2snO1xuICAgIHN1YlNlY3Rpb24uYXBwZW5kQ2hpbGQoc3ViU2VjdGlvblRpdGxlKTtcblxuICAgIGNvbnN0IGFkZFN1YlRhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBhZGRTdWJUYXNrQnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICBhZGRTdWJUYXNrQnV0dG9uLmlkID0gJ2FkZC1zdWJ0YXNrLWZvcm0nO1xuICAgIGFkZFN1YlRhc2tCdXR0b24uaW5uZXJIVE1MID0gJyZwbHVzOydcbiAgICBzdWJTZWN0aW9uLmFwcGVuZENoaWxkKGFkZFN1YlRhc2tCdXR0b24pO1xuXG5cbiAgICBhZGRTdWJUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBuZXdTdWJUYXNrTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICBjb25zdCBuZXdTdWJUYXNrVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBjb25zdCBuZXdTdWJUYXNrRGF0ZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgY29uc3QgbmV3U3ViVGFza0R1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBuZXdTdWJUYXNrVGl0bGUudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgbmV3U3ViVGFza1RpdGxlLmlkID0gJ3N1YnRhc2stbmFtZSc7XG4gICAgICAgIG5ld1N1YlRhc2tUaXRsZS5uYW1lID0gJ3N1YnRhc2stbmFtZSc7XG4gICAgICAgIG5ld1N1YlRhc2tMYWJlbC5mb3IgPSBuZXdTdWJUYXNrVGl0bGUuaWQ7XG4gICAgICAgIG5ld1N1YlRhc2tMYWJlbC5pbm5lckhUTUwgPSAnU3VidGFzayBuYW1lOic7XG4gICAgICAgIG5ld1N1YlRhc2tMYWJlbC5hcHBlbmRDaGlsZChuZXdTdWJUYXNrVGl0bGUpO1xuICAgICAgICBhZGRTdWJUYXNrQnV0dG9uLmJlZm9yZShuZXdTdWJUYXNrTGFiZWwpO1xuICAgICAgICBuZXdTdWJUYXNrRHVlRGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgICAgICBuZXdTdWJUYXNrRHVlRGF0ZS5pZCA9ICdzdWJ0YXNrLWR1ZS1kYXRlJztcbiAgICAgICAgbmV3U3ViVGFza0R1ZURhdGUubmFtZSA9ICdzdWJ0YXNrLWR1ZS1kYXRlJztcbiAgICAgICAgbmV3U3ViVGFza0R1ZURhdGUubWluID0gbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuLWNhJyk7XG4gICAgICAgIG5ld1N1YlRhc2tEdWVEYXRlLm1heCA9IFwiMjEwMC0wMS0wMVwiO1xuICAgICAgICBuZXdTdWJUYXNrRGF0ZUxhYmVsLmlubmVySFRNTCA9ICdTdWJ0YXNrIGR1ZSBkYXRlOic7XG4gICAgICAgIG5ld1N1YlRhc2tEYXRlTGFiZWwuYXBwZW5kQ2hpbGQobmV3U3ViVGFza0R1ZURhdGUpO1xuICAgICAgICBhZGRTdWJUYXNrQnV0dG9uLmJlZm9yZShuZXdTdWJUYXNrRGF0ZUxhYmVsKTtcbiAgICB9KTtcblxufTtcblxuLy9kb2Rhd2FuaWUgbm93eWNoIHRhc2vDs3dcblxuY29uc3QgY29uZmlybVRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29uZmlybS10YXNrLWJ1dHRvbicpO1xuXG5jb25maXJtVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHRhc2tOYW1lVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay1uYW1lJykudmFsdWU7XG4gICAgbGV0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZHVlLWRhdGUnKS52YWx1ZTtcblxuICAgIGlmICh0YXNrTmFtZVZhbHVlID09PSAnJykge1xuICAgICAgICBhbGVydChcIlNvcnJ5LCB0YXNrcyBtdXN0IGhhdmUgYSBuYW1lLlwiKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBhY3R1YWxQcm9qZWN0LmFkZFRhc2sodGFza05hbWVWYWx1ZSwgdGFza0R1ZURhdGUpO1xuXG4gICAgY29uc3Qgc3ViVGFza1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zdWItZm9ybV0nKTtcbiAgICBjb25zdCBzdWJUYXNrU2VjdGlvbkVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtc3ViLWZvcm1dJykuZWxlbWVudHM7XG4gICAgY29uc3QgYWRkZWRUYXNrSW5kZXggPSBhY3R1YWxQcm9qZWN0LnRhc2tzLmxlbmd0aCAtIDE7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaTxzdWJUYXNrU2VjdGlvbkVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzdWJUYXNrU2VjdGlvbkVsZW1lbnRzW2ldLnR5cGUgPT09ICd0ZXh0JyAmJiBzdWJUYXNrU2VjdGlvbkVsZW1lbnRzW2ldLnZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgYWN0dWFsUHJvamVjdC50YXNrc1thZGRlZFRhc2tJbmRleF0uYWRkU3VidGFzayhzdWJUYXNrU2VjdGlvbkVsZW1lbnRzW2ldLnZhbHVlLCBzdWJUYXNrU2VjdGlvbkVsZW1lbnRzW2krMV0udmFsdWUpXG4gICAgICAgIH0gZWxzZSBpZiAoc3ViVGFza1NlY3Rpb25FbGVtZW50c1tpXS50eXBlID09PSAndGV4dCcgJiYgc3ViVGFza1NlY3Rpb25FbGVtZW50c1tpXS52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiU29ycnksIHRhc2tzIG11c3QgaGF2ZSBhIG5hbWUuXCIpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWRUYXNrcygpO1xuICAgIGFkZFRvZG9Gb3JtLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgIGZvcm1PdmVybGF5LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtdGFzay1mb3JtJykucmVzZXQoKTtcbiAgICBzdWJUYXNrU2VjdGlvbi5pbm5lckhUTUwgPSAnJztcbiAgICBhZGROZXdTdWJ0YXNrc0NvbnRyb2xzKClcbn0pXG5cblxuXG5cbmV4cG9ydCB7IGluaXRpYWxpemVXZWJQYWdlIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBpbml0aWFsaXplV2ViUGFnZSB9IGZyb20gXCIuL21vZHVsZXMvdWlcIjtcblxuaW5pdGlhbGl6ZVdlYlBhZ2UoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==