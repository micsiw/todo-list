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

    const addTask = (name, dueDate = 'no date') => {
        tasks.push((0,_tasks_js__WEBPACK_IMPORTED_MODULE_0__["default"])(name, dueDate));
    };
    
    return { getName, addTask, tasks };
};

const defaultProject = Project('Default');
const testProject = Project('Test');
const schoolProject = Project('School');

projects.push(defaultProject, testProject, schoolProject);

defaultProject.addTask('first task');
defaultProject.addTask('second task');
defaultProject.addTask('third task');

testProject.addTask('fourth task');

schoolProject.addTask('fifth task');



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
    const getName = () => name;
    const getDate = () => dueDate;

    return { getName, getDate }
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
        actualProject = _projects__WEBPACK_IMPORTED_MODULE_0__.projects[selectedOption.dataset.id]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNpQzs7QUFFakM7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxtQkFBbUIscURBQU87QUFDMUI7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7O0FBSUE7O0FBRUE7QUFDQTs7OztBQUlBLGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDekN2QjtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiOztBQUVBLGlFQUFlLElBQUk7Ozs7Ozs7Ozs7Ozs7OztBQ1BjO0FBQ0s7O0FBRXRDO0FBQ0E7O0FBRUEsb0JBQW9CLGtEQUFXOztBQUUvQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLG9EQUFhLENBQUMscURBQU87QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLHVEQUFnQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QiwrQ0FBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7OztVQ2xKQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmlEOztBQUVqRCw4REFBaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90YXNrcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy91aS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgbmV3VGFzayBmcm9tICcuL3Rhc2tzLmpzJztcblxubGV0IHByb2plY3RzID0gW107XG5cbmNvbnN0IFByb2plY3QgPSAobmFtZSkgPT4ge1xuXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG5cbiAgICBsZXQgdGFza3MgPSBbXTtcblxuICAgIGNvbnN0IGFkZFRhc2sgPSAobmFtZSwgZHVlRGF0ZSA9ICdubyBkYXRlJykgPT4ge1xuICAgICAgICB0YXNrcy5wdXNoKG5ld1Rhc2sobmFtZSwgZHVlRGF0ZSkpO1xuICAgIH07XG4gICAgXG4gICAgcmV0dXJuIHsgZ2V0TmFtZSwgYWRkVGFzaywgdGFza3MgfTtcbn07XG5cbmNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gUHJvamVjdCgnRGVmYXVsdCcpO1xuY29uc3QgdGVzdFByb2plY3QgPSBQcm9qZWN0KCdUZXN0Jyk7XG5jb25zdCBzY2hvb2xQcm9qZWN0ID0gUHJvamVjdCgnU2Nob29sJyk7XG5cbnByb2plY3RzLnB1c2goZGVmYXVsdFByb2plY3QsIHRlc3RQcm9qZWN0LCBzY2hvb2xQcm9qZWN0KTtcblxuZGVmYXVsdFByb2plY3QuYWRkVGFzaygnZmlyc3QgdGFzaycpO1xuZGVmYXVsdFByb2plY3QuYWRkVGFzaygnc2Vjb25kIHRhc2snKTtcbmRlZmF1bHRQcm9qZWN0LmFkZFRhc2soJ3RoaXJkIHRhc2snKTtcblxudGVzdFByb2plY3QuYWRkVGFzaygnZm91cnRoIHRhc2snKTtcblxuc2Nob29sUHJvamVjdC5hZGRUYXNrKCdmaWZ0aCB0YXNrJyk7XG5cblxuXG4vL2NvbnNvbGUubG9nKCdQcm9qZWN0IGxpc3Q6ICcgKyBwcm9qZWN0cylcblxuLy8gY29uc29sZS5sb2coZGVmYXVsdFByb2plY3QudGFza3NbMF0uZ2V0TmFtZSgpKVxuLy8gY29uc29sZS5sb2coZGVmYXVsdFByb2plY3QudGFza3NbMF0uZ2V0RGF0ZSgpKVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdDtcbmV4cG9ydCB7IHByb2plY3RzIH07IiwiY29uc3QgVGFzayA9IChuYW1lLCBkdWVEYXRlKSA9PiB7XG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG4gICAgY29uc3QgZ2V0RGF0ZSA9ICgpID0+IGR1ZURhdGU7XG5cbiAgICByZXR1cm4geyBnZXROYW1lLCBnZXREYXRlIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRhc2s7IiwiaW1wb3J0IFByb2plY3QgZnJvbSAnLi9wcm9qZWN0cyc7XG5pbXBvcnQgeyBwcm9qZWN0cyB9IGZyb20gJy4vcHJvamVjdHMnO1xuXG5jb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0Jyk7XG5jb25zdCBoZWFkZXJQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlci1wcm9qZWN0LWxpc3QnKTtcblxubGV0IGFjdHVhbFByb2plY3QgPSBwcm9qZWN0c1swXVxuXG4vL8WCYWRvd2FuaWUgc3Ryb255XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVXZWJQYWdlKCkge1xuICAgIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpbml0aWFsaXplTmV3UHJvamVjdCk7XG5cbiAgICB1cGRhdGVQcm9qZWN0TGlzdCgpO1xuICAgIGxvYWRUYXNrcygpO1xufTtcblxuLy9kb2Rhd2FuaWUgbm93ZWdvIHByb2pla3R1XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVOZXdQcm9qZWN0KCkge1xuXG4gICAgYWRkUHJvamVjdEJ1dHRvbi5yZW1vdmUoKTs7XG4gICAgY29uc3QgYWRkUHJvamVjdEZvcm1JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgYWRkUHJvamVjdEZvcm1JbnB1dC50eXBlID0gJ3RleHQnO1xuICAgIGFkZFByb2plY3RGb3JtSW5wdXQucGxhY2Vob2xkZXIgPSAncHJvamVjdCBuYW1lJ1xuICAgIGFkZFByb2plY3RGb3JtSW5wdXQucmVxdWlyZWQgPSB0cnVlO1xuICAgIGhlYWRlclByb2plY3QuYXBwZW5kQ2hpbGQoYWRkUHJvamVjdEZvcm1JbnB1dCk7XG4gICAgY29uc3QgYWRkUHJvamVjdEZvcm1CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBhZGRQcm9qZWN0Rm9ybUJ1dHRvbi5vbmNsaWNrID0gZ2V0UHJvamVjdE5hbWU7XG4gICAgYWRkUHJvamVjdEZvcm1CdXR0b24uaW5uZXJIVE1MID0gJ2NvbmZpcm0nXG4gICAgYWRkUHJvamVjdEZvcm1CdXR0b24uaWQgPSAnYnV0dG9uLXByb2plY3QtYWNjZXB0JztcbiAgICBoZWFkZXJQcm9qZWN0LmFwcGVuZENoaWxkKGFkZFByb2plY3RGb3JtQnV0dG9uKTtcblxuICAgIGZ1bmN0aW9uIGdldFByb2plY3ROYW1lKCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGFkZFByb2plY3RGb3JtSW5wdXQudmFsdWVcblxuICAgICAgICBpZiAocHJvamVjdE5hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICBhbGVydCgnUHJvamVjdCBtdXN0IGJlIG5hbWVkJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKCdOZXcgcHJvamVjdCBuYW1lIGlzICcgKyBwcm9qZWN0TmFtZSlcbiAgICAgICAgcHJvamVjdHMucHVzaChQcm9qZWN0KHByb2plY3ROYW1lKSk7XG4gICAgICAgIGFkZFByb2plY3RGb3JtSW5wdXQucmVtb3ZlKCk7XG4gICAgICAgIGFkZFByb2plY3RGb3JtQnV0dG9uLnJlbW92ZSgpO1xuICAgICAgICBoZWFkZXJQcm9qZWN0LmFwcGVuZENoaWxkKGFkZFByb2plY3RCdXR0b24pO1xuICAgICAgICBpbml0aWFsaXplV2ViUGFnZSgpO1xuICAgIH07XG59O1xuXG4vL2FrdHVhbGl6YWNqYSBsaXN0eSBha3R5d255Y2ggcHJvamVrdMOzd1xuXG5mdW5jdGlvbiB1cGRhdGVQcm9qZWN0TGlzdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWxpc3QnKTtcbiAgICBwcm9qZWN0TGlzdC5pbm5lckhUTUwgPSAnJztcblxuICAgIHByb2plY3RzLmZvckVhY2goKHByb2plY3QsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgcHJvamVjdE9wdGlvbi5kYXRhc2V0LmlkID0gaW5kZXg7XG4gICAgICAgIHByb2plY3RPcHRpb24udmFsdWUgPSBwcm9qZWN0LmdldE5hbWUoKTtcbiAgICAgICAgcHJvamVjdE9wdGlvbi5pbm5lckhUTUwgPSBwcm9qZWN0LmdldE5hbWUoKTtcbiAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQocHJvamVjdE9wdGlvbik7XG4gICAgfSlcbn1cblxuLy/FgmFkb3dhbmllIHRhc2vDs3cgbmEgc3Ryb27EmVxuXG5mdW5jdGlvbiBsb2FkVGFza3MoKSB7XG4gICAgY29uc3QgdG9kb0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0Jyk7XG4gICAgY29uc3QgYmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1ibG9jaycpO1xuICAgIHRvZG9MaXN0LmlubmVySFRNTCA9ICcnO1xuXG4gICAgYWN0dWFsUHJvamVjdC50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RvZG8tY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IGJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJsb2NrLmNsYXNzTGlzdC5hZGQoJ3RvZG8tYmxvY2snKTtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIHRpdGxlLmlubmVySFRNTCA9IHRhc2suZ2V0TmFtZSgpO1xuICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCd0b2RvLXRpdGxlJyk7XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJsb2NrKTtcbiAgICAgICAgdG9kb0xpc3QuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgYmxvY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBibG9jay5jbGFzc0xpc3QudG9nZ2xlKCdleHBhbmQnKTtcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG4vL8WCYWRvd2FuaWUgbm93ZWdvIHByb2pla3R1IG5hIHN0cm9uxJkgaSB6bWlhbmEgYWN0dWFsUHJvamVjdFxuXG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1saXN0Jyk7XG4gICAgY29uc3QgcHJvamVjdEluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyLXByb2plY3QtaW5mbycpO1xuICAgIHByb2plY3RJbmZvLmlubmVySFRNTCA9ICdBY3R1YWwgcHJvamVjdDogJyArIGFjdHVhbFByb2plY3QuZ2V0TmFtZSgpO1xuXG4gICAgcHJvamVjdExpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IHByb2plY3RMaXN0Lm9wdGlvbnNbcHJvamVjdExpc3Quc2VsZWN0ZWRJbmRleF1cbiAgICAgICAgYWN0dWFsUHJvamVjdCA9IHByb2plY3RzW3NlbGVjdGVkT3B0aW9uLmRhdGFzZXQuaWRdXG4gICAgICAgIHByb2plY3RJbmZvLmlubmVySFRNTCA9ICdBY3R1YWwgcHJvamVjdDogJyArIGFjdHVhbFByb2plY3QuZ2V0TmFtZSgpO1xuICAgICAgICBjb25zb2xlLmxvZygnQWN0dWFsIHByb2plY3Q6ICcgKyBhY3R1YWxQcm9qZWN0KVxuICAgICAgICBjb25zb2xlLmxvZyhzZWxlY3RlZE9wdGlvbi5kYXRhc2V0LmlkKVxuICAgICAgICBsb2FkVGFza3MoKTtcbiAgICB9KTtcblxuLy90d29yemVuaWUgbm93eWNoIHRhc2vDs3cgXG5cbiAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10b2RvJyk7XG4gICAgY29uc3QgYWRkVG9kb0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRvZG8tZm9ybScpO1xuICAgIGNvbnN0IGZvcm1PdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm0tb3ZlcmxheScpO1xuICAgIGNvbnN0IGNhbmNlbEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FuY2VsLWZvcm0nKTtcbiAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBhZGRUb2RvRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgICAgZm9ybU92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgfSlcbiAgICBjYW5jZWxGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBhZGRUb2RvRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgICAgZm9ybU92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgfSlcblxuICAgIGNvbnN0IGR1ZURhdGVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZHVlLWRhdGUnKTtcbiAgICBkdWVEYXRlRm9ybS5taW4gPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tY2EnKTtcbiAgICBkdWVEYXRlRm9ybS5tYXggPSBcIjIxMDAtMDEtMDFcIjtcblxuICAgIGNvbnN0IGFkZFN1YlRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXN1YnRhc2snKTtcblxuICAgIGFkZFN1YlRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1N1YlRhc2tMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGNvbnN0IG5ld1N1YlRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGNvbnN0IG5ld1N1YlRhc2tEYXRlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICBjb25zdCBuZXdTdWJUYXNrRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIG5ld1N1YlRhc2tUaXRsZS50eXBlID0gJ3RleHQnO1xuICAgICAgICBuZXdTdWJUYXNrVGl0bGUuaWQgPSAnc3VidGFzay1uYW1lJztcbiAgICAgICAgbmV3U3ViVGFza1RpdGxlLm5hbWUgPSAnc3VidGFzay1uYW1lJztcbiAgICAgICAgbmV3U3ViVGFza0xhYmVsLmZvciA9IG5ld1N1YlRhc2tUaXRsZS5pZDtcbiAgICAgICAgbmV3U3ViVGFza0xhYmVsLmlubmVySFRNTCA9ICdTdWJ0YXNrIG5hbWU6JztcbiAgICAgICAgbmV3U3ViVGFza0xhYmVsLmFwcGVuZENoaWxkKG5ld1N1YlRhc2tUaXRsZSk7XG4gICAgICAgIGFkZFN1YlRhc2tCdXR0b24uYmVmb3JlKG5ld1N1YlRhc2tMYWJlbCk7XG4gICAgICAgIG5ld1N1YlRhc2tEdWVEYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgICAgIG5ld1N1YlRhc2tEdWVEYXRlLmlkID0gJ3N1YnRhc2stZHVlLWRhdGUnO1xuICAgICAgICBuZXdTdWJUYXNrRHVlRGF0ZS5uYW1lID0gJ3N1YnRhc2stZHVlLWRhdGUnO1xuICAgICAgICBuZXdTdWJUYXNrRHVlRGF0ZS5taW4gPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tY2EnKTtcbiAgICAgICAgbmV3U3ViVGFza0R1ZURhdGUubWF4ID0gXCIyMTAwLTAxLTAxXCI7XG4gICAgICAgIG5ld1N1YlRhc2tEYXRlTGFiZWwuaW5uZXJIVE1MID0gJ1N1YnRhc2sgZHVlIGRhdGU6JztcbiAgICAgICAgbmV3U3ViVGFza0RhdGVMYWJlbC5hcHBlbmRDaGlsZChuZXdTdWJUYXNrRHVlRGF0ZSk7XG4gICAgICAgIGFkZFN1YlRhc2tCdXR0b24uYmVmb3JlKG5ld1N1YlRhc2tEYXRlTGFiZWwpO1xuICAgIH0pXG4gICBcblxuXG5cbmV4cG9ydCB7IGluaXRpYWxpemVXZWJQYWdlIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBpbml0aWFsaXplV2ViUGFnZSB9IGZyb20gXCIuL21vZHVsZXMvdWlcIjtcblxuaW5pdGlhbGl6ZVdlYlBhZ2UoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==