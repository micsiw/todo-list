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

defaultProject.tasks[0].addSubtask('first sub');
defaultProject.tasks[0].addSubtask('second sub');
defaultProject.tasks[2].addSubtask('third sub');


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

    actualProject.tasks.forEach(task => {
        const container = document.createElement('div');
        container.classList.add('todo-container');
        const block = document.createElement('div');
        block.classList.add('todo-block');
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
            block.classList.toggle('expand');
        });

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

        const newSubTaskButton = document.createElement('button');
        newSubTaskButton.id = 'add-subtask-block';
        newSubTaskButton.innerHTML = '&plus;';
        newSubTaskButton.type = 'button';
        subtaskBlock.appendChild(newSubTaskButton);

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
    addTaskButton.addEventListener('click', () => {
        addTodoForm.classList.toggle('active');
        formOverlay.classList.toggle('active');
    })
    cancelForm.addEventListener('click', () => {
        addTodoForm.classList.toggle('active');
        formOverlay.classList.toggle('active');
        //tutaj trzeba potem wrzucić funkcjęrysowania okna todo od
        // początku żeby się zresetowało ładnie
        document.getElementById('add-task-form').reset();
    })

    const dueDateForm = document.querySelector('#task-due-date');
    dueDateForm.min = new Date().toLocaleDateString('en-ca');
    dueDateForm.max = "2100-01-01";

    const addSubTaskButton = document.querySelector('#add-subtask-form');

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

        const subTaskSection = document.querySelector('[data-sub-form]').elements;
        const addedTaskIndex = actualProject.tasks.length - 1;

        for (let i = 0; i<subTaskSection.length; i++) {
            if (subTaskSection[i].type === 'text' && subTaskSection[i].value !== '') {
                actualProject.tasks[addedTaskIndex].addSubtask(subTaskSection[i].value, subTaskSection[i+1].value)
            } else if (subTaskSection[i].type === 'text' && subTaskSection[i].value === '') {
                alert("Sorry, tasks must have a name.")
                return false
            }
        }

        loadTasks();
        addTodoForm.classList.toggle('active');
        formOverlay.classList.toggle('active');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmlEOztBQUVqRCw4REFBaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy91aS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgbmV3VGFzayBmcm9tICcuL3Rhc2tzLmpzJztcblxubGV0IHByb2plY3RzID0gW107XG5cbmNvbnN0IFByb2plY3QgPSAobmFtZSkgPT4ge1xuXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG5cbiAgICBsZXQgdGFza3MgPSBbXTtcblxuICAgIGNvbnN0IGFkZFRhc2sgPSAobmFtZSwgZHVlRGF0ZSkgPT4ge1xuICAgICAgICBpZiAoZHVlRGF0ZSA9PT0gJycpIHtcbiAgICAgICAgICAgIGR1ZURhdGUgPSAnbm8gZGF0ZSc7XG4gICAgICAgIH1cbiAgICAgICAgdGFza3MucHVzaChuZXdUYXNrKG5hbWUsIGR1ZURhdGUpKTtcbiAgICB9O1xuICAgIFxuICAgIHJldHVybiB7IGdldE5hbWUsIGFkZFRhc2ssIHRhc2tzIH07XG59O1xuXG5jb25zdCBkZWZhdWx0UHJvamVjdCA9IFByb2plY3QoJ0RlZmF1bHQnKTtcbmNvbnN0IHRlc3RQcm9qZWN0ID0gUHJvamVjdCgnVGVzdCcpO1xuY29uc3Qgc2Nob29sUHJvamVjdCA9IFByb2plY3QoJ1NjaG9vbCcpO1xuXG5wcm9qZWN0cy5wdXNoKGRlZmF1bHRQcm9qZWN0LCB0ZXN0UHJvamVjdCwgc2Nob29sUHJvamVjdCk7XG5cbmRlZmF1bHRQcm9qZWN0LmFkZFRhc2soJ2ZpcnN0IHRhc2snLCAnMjAyMy0xMC0wMycpO1xuZGVmYXVsdFByb2plY3QuYWRkVGFzaygnc2Vjb25kIHRhc2snLCAnJyk7XG5kZWZhdWx0UHJvamVjdC5hZGRUYXNrKCd0aGlyZCB0YXNrJywgJzIwMjMtMTMtMTInKTtcblxudGVzdFByb2plY3QuYWRkVGFzaygnZm91cnRoIHRhc2snLCAnJyk7XG5cbnNjaG9vbFByb2plY3QuYWRkVGFzaygnZmlmdGggdGFzaycsICcnKTtcblxuZGVmYXVsdFByb2plY3QudGFza3NbMF0uYWRkU3VidGFzaygnZmlyc3Qgc3ViJyk7XG5kZWZhdWx0UHJvamVjdC50YXNrc1swXS5hZGRTdWJ0YXNrKCdzZWNvbmQgc3ViJyk7XG5kZWZhdWx0UHJvamVjdC50YXNrc1syXS5hZGRTdWJ0YXNrKCd0aGlyZCBzdWInKTtcblxuXG4vL2NvbnNvbGUubG9nKGRlZmF1bHRQcm9qZWN0LnRhc2tzWzBdLnN1YnRhc2tzWzBdKVxuXG5cbi8vY29uc29sZS5sb2coJ1Byb2plY3QgbGlzdDogJyArIHByb2plY3RzKVxuXG4vLyBjb25zb2xlLmxvZyhkZWZhdWx0UHJvamVjdC50YXNrc1swXS5nZXROYW1lKCkpXG4vLyBjb25zb2xlLmxvZyhkZWZhdWx0UHJvamVjdC50YXNrc1swXS5nZXREYXRlKCkpXG5cblxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0O1xuZXhwb3J0IHsgcHJvamVjdHMgfTsiLCJjb25zdCBUYXNrID0gKG5hbWUsIGR1ZURhdGUpID0+IHtcblxuICAgIGxldCBzdWJ0YXNrcyA9IFtdO1xuXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG4gICAgY29uc3QgZ2V0RGF0ZSA9ICgpID0+IGR1ZURhdGU7XG4gICAgY29uc3QgYWRkU3VidGFzayA9IChuYW1lLCBkdWVEYXRlKSA9PiB7XG4gICAgICAgIGlmIChkdWVEYXRlID09PSAnJykge1xuICAgICAgICAgICAgZHVlRGF0ZSA9ICdubyBkYXRlJztcbiAgICAgICAgfVxuICAgICAgICBzdWJ0YXNrcy5wdXNoKHtuYW1lLCBkdWVEYXRlfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgc3VidGFza3MsIGdldE5hbWUsIGdldERhdGUsIGFkZFN1YnRhc2sgfVxufTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IFRhc2s7IiwiaW1wb3J0IFByb2plY3QgZnJvbSAnLi9wcm9qZWN0cyc7XG5pbXBvcnQgeyBwcm9qZWN0cyB9IGZyb20gJy4vcHJvamVjdHMnO1xuXG5jb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0Jyk7XG5jb25zdCBoZWFkZXJQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlci1wcm9qZWN0LWxpc3QnKTtcblxubGV0IGFjdHVhbFByb2plY3QgPSBwcm9qZWN0c1swXVxuXG4vL8WCYWRvd2FuaWUgc3Ryb255XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVXZWJQYWdlKCkge1xuICAgIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpbml0aWFsaXplTmV3UHJvamVjdCk7XG5cbiAgICB1cGRhdGVQcm9qZWN0TGlzdCgpO1xuICAgIGxvYWRUYXNrcygpO1xufTtcblxuLy9kb2Rhd2FuaWUgbm93ZWdvIHByb2pla3R1XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVOZXdQcm9qZWN0KCkge1xuXG4gICAgYWRkUHJvamVjdEJ1dHRvbi5yZW1vdmUoKTs7XG4gICAgY29uc3QgYWRkUHJvamVjdEZvcm1JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgYWRkUHJvamVjdEZvcm1JbnB1dC50eXBlID0gJ3RleHQnO1xuICAgIGFkZFByb2plY3RGb3JtSW5wdXQucGxhY2Vob2xkZXIgPSAncHJvamVjdCBuYW1lJ1xuICAgIGFkZFByb2plY3RGb3JtSW5wdXQucmVxdWlyZWQgPSB0cnVlO1xuICAgIGhlYWRlclByb2plY3QuYXBwZW5kQ2hpbGQoYWRkUHJvamVjdEZvcm1JbnB1dCk7XG4gICAgY29uc3QgYWRkUHJvamVjdEZvcm1CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBhZGRQcm9qZWN0Rm9ybUJ1dHRvbi5vbmNsaWNrID0gZ2V0UHJvamVjdE5hbWU7XG4gICAgYWRkUHJvamVjdEZvcm1CdXR0b24uaW5uZXJIVE1MID0gJ2NvbmZpcm0nXG4gICAgYWRkUHJvamVjdEZvcm1CdXR0b24uaWQgPSAnYnV0dG9uLXByb2plY3QtYWNjZXB0JztcbiAgICBoZWFkZXJQcm9qZWN0LmFwcGVuZENoaWxkKGFkZFByb2plY3RGb3JtQnV0dG9uKTtcblxuICAgIGZ1bmN0aW9uIGdldFByb2plY3ROYW1lKCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGFkZFByb2plY3RGb3JtSW5wdXQudmFsdWVcblxuICAgICAgICBpZiAocHJvamVjdE5hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICBhbGVydCgnUHJvamVjdCBtdXN0IGJlIG5hbWVkJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKCdOZXcgcHJvamVjdCBuYW1lIGlzICcgKyBwcm9qZWN0TmFtZSlcbiAgICAgICAgcHJvamVjdHMucHVzaChQcm9qZWN0KHByb2plY3ROYW1lKSk7XG4gICAgICAgIGFkZFByb2plY3RGb3JtSW5wdXQucmVtb3ZlKCk7XG4gICAgICAgIGFkZFByb2plY3RGb3JtQnV0dG9uLnJlbW92ZSgpO1xuICAgICAgICBoZWFkZXJQcm9qZWN0LmFwcGVuZENoaWxkKGFkZFByb2plY3RCdXR0b24pO1xuICAgICAgICBpbml0aWFsaXplV2ViUGFnZSgpO1xuICAgIH07XG59O1xuXG4vL2FrdHVhbGl6YWNqYSBsaXN0eSBha3R5d255Y2ggcHJvamVrdMOzd1xuXG5mdW5jdGlvbiB1cGRhdGVQcm9qZWN0TGlzdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWxpc3QnKTtcbiAgICBwcm9qZWN0TGlzdC5pbm5lckhUTUwgPSAnJztcblxuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgcHJvamVjdE9wdGlvbi5kYXRhc2V0LnByb2plY3RJZCA9IGluZGV4O1xuICAgICAgICBwcm9qZWN0T3B0aW9uLnZhbHVlID0gcHJvamVjdC5nZXROYW1lKCk7XG4gICAgICAgIHByb2plY3RPcHRpb24uaW5uZXJIVE1MID0gcHJvamVjdC5nZXROYW1lKCk7XG4gICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKHByb2plY3RPcHRpb24pO1xuICAgIH0pXG59XG5cbi8vxYJhZG93YW5pZSB0YXNrw7N3IG5hIHN0cm9uxJlcblxuZnVuY3Rpb24gbG9hZFRhc2tzKCkge1xuICAgIGNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdCcpO1xuICAgIHRvZG9MaXN0LmlubmVySFRNTCA9ICcnO1xuXG4gICAgYWN0dWFsUHJvamVjdC50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RvZG8tY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IGJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJsb2NrLmNsYXNzTGlzdC5hZGQoJ3RvZG8tYmxvY2snKTtcbiAgICAgICAgY29uc3QgdG9kb0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0b2RvSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3RvZG8taGVhZGVyJyk7XG5cbiAgICAgICAgY29uc3QgdG9kb1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBjb25zdCB0b2RvRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblxuICAgICAgICB0b2RvVGl0bGUuaW5uZXJIVE1MID0gdGFzay5nZXROYW1lKCk7XG4gICAgICAgIHRvZG9UaXRsZS5jbGFzc0xpc3QuYWRkKCd0b2RvLXRpdGxlJylcblxuICAgICAgICB0b2RvRGF0ZS5pbm5lckhUTUwgPSB0YXNrLmdldERhdGUoKTtcbiAgICAgICAgdG9kb0RhdGUuY2xhc3NMaXN0LmFkZCgndG9kby1kYXRlJyk7XG5cbiAgICAgICAgdG9kb0hlYWRlci5hcHBlbmQodG9kb1RpdGxlLCB0b2RvRGF0ZSk7XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKHRvZG9IZWFkZXIpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYmxvY2spO1xuICAgICAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgICBibG9jay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGJsb2NrLmNsYXNzTGlzdC50b2dnbGUoJ2V4cGFuZCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzdWJ0YXNrQmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3VidGFza0Jsb2NrLmNsYXNzTGlzdC5hZGQoJ3N1YnRhc2stYmxvY2snKTtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQoc3VidGFza0Jsb2NrKVxuXG4gICAgICAgIGNvbnN0IHN1YnRhc2tCbG9ja1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcbiAgICAgICAgc3VidGFza0Jsb2NrVGl0bGUuY2xhc3NMaXN0LmFkZCgnc3VidGFzay1ibG9jay10aXRsZScpO1xuICAgICAgICBzdWJ0YXNrQmxvY2tUaXRsZS5pbm5lckhUTUwgPSAnc3VidGFzayBsaXN0JztcbiAgICAgICAgc3VidGFza0Jsb2NrLmFwcGVuZENoaWxkKHN1YnRhc2tCbG9ja1RpdGxlKTtcblxuICAgICAgICAvL3R1dGFqIGdlbmVyb3dhbmllIHN1YnRhc2vDs3cgdyB0YXNrdVxuXG4gICAgICAgIHRhc2suc3VidGFza3MuZm9yRWFjaCgoc3VidGFzaywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tQb3NpdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgc3VidGFza1Bvc2l0aW9uLmNsYXNzTGlzdC5hZGQoJ3N1YnRhc2stcG9zaXRpb24nKTtcbiAgICAgICAgICAgIHN1YnRhc2tQb3NpdGlvbi5kYXRhc2V0LnN1YnRhc2tJZCA9IGluZGV4O1xuICAgICAgICAgICAgc3VidGFza0Jsb2NrLmFwcGVuZENoaWxkKHN1YnRhc2tQb3NpdGlvbik7XG5cbiAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBzdWJ0YXNrTGFiZWwuZm9yID0gJ3N1YnRhc2snO1xuICAgICAgICAgICAgc3VidGFza1Bvc2l0aW9uLmFwcGVuZENoaWxkKHN1YnRhc2tMYWJlbClcbiAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tDaGVjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBzdWJ0YXNrQ2hlY2sudHlwZSA9ICdjaGVja2JveCc7XG4gICAgICAgICAgICBzdWJ0YXNrQ2hlY2suaWQgPSAnc3VidGFzaydcbiAgICAgICAgICAgIHN1YnRhc2tMYWJlbC5hcHBlbmRDaGlsZChzdWJ0YXNrQ2hlY2spO1xuICAgICAgICAgICAgY29uc3Qgc3VidGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICBzdWJ0YXNrTmFtZS5jbGFzc0xpc3QuYWRkKCdzdWJ0YXNrLW5hbWUnKTtcbiAgICAgICAgICAgIHN1YnRhc2tOYW1lLmlubmVySFRNTCA9IHN1YnRhc2submFtZTtcbiAgICAgICAgICAgIHN1YnRhc2tMYWJlbC5hcHBlbmRDaGlsZChzdWJ0YXNrTmFtZSk7XG4gICAgICAgICAgICBjb25zdCBzdWJ0YXNrRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIHN1YnRhc2tEYXRlLmNsYXNzTGlzdC5hZGQoJ3N1YnRhc2stZGF0ZScpO1xuICAgICAgICAgICAgc3VidGFza0RhdGUuaW5uZXJIVE1MID0gc3VidGFzay5kdWVEYXRlO1xuICAgICAgICAgICAgc3VidGFza1Bvc2l0aW9uLmFwcGVuZENoaWxkKHN1YnRhc2tEYXRlKTtcbiAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tSZW1vdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIHN1YnRhc2tSZW1vdmUudHlwZSA9ICdidXR0b24nO1xuICAgICAgICAgICAgc3VidGFza1JlbW92ZS5jbGFzc0xpc3QuYWRkKCdzdWJ0YXNrLXJlbW92ZScpO1xuICAgICAgICAgICAgc3VidGFza1JlbW92ZS5pbm5lckhUTUwgPSAnJnRpbWVzOyc7XG4gICAgICAgICAgICBzdWJ0YXNrUG9zaXRpb24uYXBwZW5kQ2hpbGQoc3VidGFza1JlbW92ZSk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgbmV3U3ViVGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBuZXdTdWJUYXNrQnV0dG9uLmlkID0gJ2FkZC1zdWJ0YXNrLWJsb2NrJztcbiAgICAgICAgbmV3U3ViVGFza0J1dHRvbi5pbm5lckhUTUwgPSAnJnBsdXM7JztcbiAgICAgICAgbmV3U3ViVGFza0J1dHRvbi50eXBlID0gJ2J1dHRvbic7XG4gICAgICAgIHN1YnRhc2tCbG9jay5hcHBlbmRDaGlsZChuZXdTdWJUYXNrQnV0dG9uKTtcblxuICAgICAgICBjb25zdCByZW1vdmVUb2RvQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHJlbW92ZVRvZG9CdXR0b24uaWQgPSAncmVtb3ZlLXRvZG8nO1xuICAgICAgICByZW1vdmVUb2RvQnV0dG9uLmlubmVySFRNTCA9ICdSZW1vdmUnO1xuICAgICAgICByZW1vdmVUb2RvQnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQocmVtb3ZlVG9kb0J1dHRvbik7XG4gICAgfSlcbn1cblxuLy/FgmFkb3dhbmllIG5vd2VnbyBwcm9qZWt0dSBuYSBzdHJvbsSZIGkgem1pYW5hIGFjdHVhbFByb2plY3RcblxuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbGlzdCcpO1xuICAgIGNvbnN0IHByb2plY3RJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlci1wcm9qZWN0LWluZm8nKTtcbiAgICBwcm9qZWN0SW5mby5pbm5lckhUTUwgPSAnQWN0dWFsIHByb2plY3Q6ICcgKyBhY3R1YWxQcm9qZWN0LmdldE5hbWUoKTtcblxuICAgIHByb2plY3RMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSBwcm9qZWN0TGlzdC5vcHRpb25zW3Byb2plY3RMaXN0LnNlbGVjdGVkSW5kZXhdXG4gICAgICAgIGFjdHVhbFByb2plY3QgPSBwcm9qZWN0c1tzZWxlY3RlZE9wdGlvbi5kYXRhc2V0LnByb2plY3RJZF1cbiAgICAgICAgcHJvamVjdEluZm8uaW5uZXJIVE1MID0gJ0FjdHVhbCBwcm9qZWN0OiAnICsgYWN0dWFsUHJvamVjdC5nZXROYW1lKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdBY3R1YWwgcHJvamVjdDogJyArIGFjdHVhbFByb2plY3QuZ2V0TmFtZSgpKVxuICAgICAgICBjb25zb2xlLmxvZyhzZWxlY3RlZE9wdGlvbi5kYXRhc2V0LnByb2plY3RJZClcbiAgICAgICAgbG9hZFRhc2tzKCk7XG4gICAgfSk7XG5cbi8vdHdvcnplbmllIGZvcm11bGFyemEgbm93eWNoIHRhc2vDs3cgXG5cbiAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10b2RvJyk7XG4gICAgY29uc3QgYWRkVG9kb0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRvZG8tZm9ybScpO1xuICAgIGNvbnN0IGZvcm1PdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm0tb3ZlcmxheScpO1xuICAgIGNvbnN0IGNhbmNlbEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FuY2VsLWZvcm0nKTtcbiAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBhZGRUb2RvRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgICAgZm9ybU92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgfSlcbiAgICBjYW5jZWxGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBhZGRUb2RvRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgICAgZm9ybU92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgIC8vdHV0YWogdHJ6ZWJhIHBvdGVtIHdyenVjacSHIGZ1bmtjasSZcnlzb3dhbmlhIG9rbmEgdG9kbyBvZFxuICAgICAgICAvLyBwb2N6xIV0a3UgxbxlYnkgc2nEmSB6cmVzZXRvd2HFgm8gxYJhZG5pZVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLXRhc2stZm9ybScpLnJlc2V0KCk7XG4gICAgfSlcblxuICAgIGNvbnN0IGR1ZURhdGVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZHVlLWRhdGUnKTtcbiAgICBkdWVEYXRlRm9ybS5taW4gPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tY2EnKTtcbiAgICBkdWVEYXRlRm9ybS5tYXggPSBcIjIxMDAtMDEtMDFcIjtcblxuICAgIGNvbnN0IGFkZFN1YlRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXN1YnRhc2stZm9ybScpO1xuXG4gICAgYWRkU3ViVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3U3ViVGFza0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgY29uc3QgbmV3U3ViVGFza1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgY29uc3QgbmV3U3ViVGFza0RhdGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGNvbnN0IG5ld1N1YlRhc2tEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgbmV3U3ViVGFza1RpdGxlLnR5cGUgPSAndGV4dCc7XG4gICAgICAgIG5ld1N1YlRhc2tUaXRsZS5pZCA9ICdzdWJ0YXNrLW5hbWUnO1xuICAgICAgICBuZXdTdWJUYXNrVGl0bGUubmFtZSA9ICdzdWJ0YXNrLW5hbWUnO1xuICAgICAgICBuZXdTdWJUYXNrTGFiZWwuZm9yID0gbmV3U3ViVGFza1RpdGxlLmlkO1xuICAgICAgICBuZXdTdWJUYXNrTGFiZWwuaW5uZXJIVE1MID0gJ1N1YnRhc2sgbmFtZTonO1xuICAgICAgICBuZXdTdWJUYXNrTGFiZWwuYXBwZW5kQ2hpbGQobmV3U3ViVGFza1RpdGxlKTtcbiAgICAgICAgYWRkU3ViVGFza0J1dHRvbi5iZWZvcmUobmV3U3ViVGFza0xhYmVsKTtcbiAgICAgICAgbmV3U3ViVGFza0R1ZURhdGUudHlwZSA9ICdkYXRlJztcbiAgICAgICAgbmV3U3ViVGFza0R1ZURhdGUuaWQgPSAnc3VidGFzay1kdWUtZGF0ZSc7XG4gICAgICAgIG5ld1N1YlRhc2tEdWVEYXRlLm5hbWUgPSAnc3VidGFzay1kdWUtZGF0ZSc7XG4gICAgICAgIG5ld1N1YlRhc2tEdWVEYXRlLm1pbiA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1jYScpO1xuICAgICAgICBuZXdTdWJUYXNrRHVlRGF0ZS5tYXggPSBcIjIxMDAtMDEtMDFcIjtcbiAgICAgICAgbmV3U3ViVGFza0RhdGVMYWJlbC5pbm5lckhUTUwgPSAnU3VidGFzayBkdWUgZGF0ZTonO1xuICAgICAgICBuZXdTdWJUYXNrRGF0ZUxhYmVsLmFwcGVuZENoaWxkKG5ld1N1YlRhc2tEdWVEYXRlKTtcbiAgICAgICAgYWRkU3ViVGFza0J1dHRvbi5iZWZvcmUobmV3U3ViVGFza0RhdGVMYWJlbCk7XG4gICAgfSlcblxuICAgIC8vZG9kYXdhbmllIG5vd3ljaCB0YXNrw7N3XG5cbiAgICBjb25zdCBjb25maXJtVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb25maXJtLXRhc2stYnV0dG9uJyk7XG5cbiAgICBjb25maXJtVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgdGFza05hbWVWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLW5hbWUnKS52YWx1ZTtcbiAgICAgICAgbGV0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2stZHVlLWRhdGUnKS52YWx1ZTtcblxuICAgICAgICBpZiAodGFza05hbWVWYWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiU29ycnksIHRhc2tzIG11c3QgaGF2ZSBhIG5hbWUuXCIpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGFjdHVhbFByb2plY3QuYWRkVGFzayh0YXNrTmFtZVZhbHVlLCB0YXNrRHVlRGF0ZSk7XG5cbiAgICAgICAgY29uc3Qgc3ViVGFza1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zdWItZm9ybV0nKS5lbGVtZW50cztcbiAgICAgICAgY29uc3QgYWRkZWRUYXNrSW5kZXggPSBhY3R1YWxQcm9qZWN0LnRhc2tzLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8c3ViVGFza1NlY3Rpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzdWJUYXNrU2VjdGlvbltpXS50eXBlID09PSAndGV4dCcgJiYgc3ViVGFza1NlY3Rpb25baV0udmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgYWN0dWFsUHJvamVjdC50YXNrc1thZGRlZFRhc2tJbmRleF0uYWRkU3VidGFzayhzdWJUYXNrU2VjdGlvbltpXS52YWx1ZSwgc3ViVGFza1NlY3Rpb25baSsxXS52YWx1ZSlcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViVGFza1NlY3Rpb25baV0udHlwZSA9PT0gJ3RleHQnICYmIHN1YlRhc2tTZWN0aW9uW2ldLnZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiU29ycnksIHRhc2tzIG11c3QgaGF2ZSBhIG5hbWUuXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsb2FkVGFza3MoKTtcbiAgICAgICAgYWRkVG9kb0Zvcm0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgIGZvcm1PdmVybGF5LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgIH0pXG4gICBcblxuXG5cbmV4cG9ydCB7IGluaXRpYWxpemVXZWJQYWdlIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBpbml0aWFsaXplV2ViUGFnZSB9IGZyb20gXCIuL21vZHVsZXMvdWlcIjtcblxuaW5pdGlhbGl6ZVdlYlBhZ2UoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==