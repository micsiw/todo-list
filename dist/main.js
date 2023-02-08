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

        todoDate.innerHTML = 'Date placeholder'
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

        for (let i = 0; i < 5; i++){
            const subtaskPosition = document.createElement('div');
            subtaskPosition.classList.add('subtask-position');
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
            subtaskName.innerHTML = 'typical subtask';
            subtaskLabel.appendChild(subtaskName);
            const subtaskDate = document.createElement('p');
            subtaskDate.classList.add('subtask-date');
            subtaskDate.innerHTML = 'date placeholder';
            subtaskPosition.appendChild(subtaskDate);
            const subtaskRemove = document.createElement('button');
            subtaskRemove.type = 'button';
            subtaskRemove.classList.add('subtask-remove');
            subtaskRemove.innerHTML = '&times;';
            subtaskPosition.appendChild(subtaskRemove);
        }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNpQzs7QUFFakM7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxtQkFBbUIscURBQU87QUFDMUI7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7O0FBSUE7O0FBRUE7QUFDQTs7OztBQUlBLGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDekN2QjtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiOztBQUVBLGlFQUFlLElBQUk7Ozs7Ozs7Ozs7Ozs7OztBQ1BjO0FBQ0s7O0FBRXRDO0FBQ0E7O0FBRUEsb0JBQW9CLGtEQUFXOztBQUUvQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLG9EQUFhLENBQUMscURBQU87QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLHVEQUFnQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSx3QkFBd0IsT0FBTztBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsK0NBQVE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7VUM3TUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05pRDs7QUFFakQsOERBQWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvdWkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IG5ld1Rhc2sgZnJvbSAnLi90YXNrcy5qcyc7XG5cbmxldCBwcm9qZWN0cyA9IFtdO1xuXG5jb25zdCBQcm9qZWN0ID0gKG5hbWUpID0+IHtcblxuICAgIGNvbnN0IGdldE5hbWUgPSAoKSA9PiBuYW1lO1xuXG4gICAgbGV0IHRhc2tzID0gW107XG5cbiAgICBjb25zdCBhZGRUYXNrID0gKG5hbWUsIGR1ZURhdGUgPSAnbm8gZGF0ZScpID0+IHtcbiAgICAgICAgdGFza3MucHVzaChuZXdUYXNrKG5hbWUsIGR1ZURhdGUpKTtcbiAgICB9O1xuICAgIFxuICAgIHJldHVybiB7IGdldE5hbWUsIGFkZFRhc2ssIHRhc2tzIH07XG59O1xuXG5jb25zdCBkZWZhdWx0UHJvamVjdCA9IFByb2plY3QoJ0RlZmF1bHQnKTtcbmNvbnN0IHRlc3RQcm9qZWN0ID0gUHJvamVjdCgnVGVzdCcpO1xuY29uc3Qgc2Nob29sUHJvamVjdCA9IFByb2plY3QoJ1NjaG9vbCcpO1xuXG5wcm9qZWN0cy5wdXNoKGRlZmF1bHRQcm9qZWN0LCB0ZXN0UHJvamVjdCwgc2Nob29sUHJvamVjdCk7XG5cbmRlZmF1bHRQcm9qZWN0LmFkZFRhc2soJ2ZpcnN0IHRhc2snKTtcbmRlZmF1bHRQcm9qZWN0LmFkZFRhc2soJ3NlY29uZCB0YXNrJyk7XG5kZWZhdWx0UHJvamVjdC5hZGRUYXNrKCd0aGlyZCB0YXNrJyk7XG5cbnRlc3RQcm9qZWN0LmFkZFRhc2soJ2ZvdXJ0aCB0YXNrJyk7XG5cbnNjaG9vbFByb2plY3QuYWRkVGFzaygnZmlmdGggdGFzaycpO1xuXG5cblxuLy9jb25zb2xlLmxvZygnUHJvamVjdCBsaXN0OiAnICsgcHJvamVjdHMpXG5cbi8vIGNvbnNvbGUubG9nKGRlZmF1bHRQcm9qZWN0LnRhc2tzWzBdLmdldE5hbWUoKSlcbi8vIGNvbnNvbGUubG9nKGRlZmF1bHRQcm9qZWN0LnRhc2tzWzBdLmdldERhdGUoKSlcblxuXG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3Q7XG5leHBvcnQgeyBwcm9qZWN0cyB9OyIsImNvbnN0IFRhc2sgPSAobmFtZSwgZHVlRGF0ZSkgPT4ge1xuICAgIGNvbnN0IGdldE5hbWUgPSAoKSA9PiBuYW1lO1xuICAgIGNvbnN0IGdldERhdGUgPSAoKSA9PiBkdWVEYXRlO1xuXG4gICAgcmV0dXJuIHsgZ2V0TmFtZSwgZ2V0RGF0ZSB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUYXNrOyIsImltcG9ydCBQcm9qZWN0IGZyb20gJy4vcHJvamVjdHMnO1xuaW1wb3J0IHsgcHJvamVjdHMgfSBmcm9tICcuL3Byb2plY3RzJztcblxuY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtcHJvamVjdCcpO1xuY29uc3QgaGVhZGVyUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXItcHJvamVjdC1saXN0Jyk7XG5cbmxldCBhY3R1YWxQcm9qZWN0ID0gcHJvamVjdHNbMF1cblxuLy/FgmFkb3dhbmllIHN0cm9ueVxuXG5mdW5jdGlvbiBpbml0aWFsaXplV2ViUGFnZSgpIHtcbiAgICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaW5pdGlhbGl6ZU5ld1Byb2plY3QpO1xuXG4gICAgdXBkYXRlUHJvamVjdExpc3QoKTtcbiAgICBsb2FkVGFza3MoKTtcbn07XG5cbi8vZG9kYXdhbmllIG5vd2VnbyBwcm9qZWt0dVxuXG5mdW5jdGlvbiBpbml0aWFsaXplTmV3UHJvamVjdCgpIHtcblxuICAgIGFkZFByb2plY3RCdXR0b24ucmVtb3ZlKCk7O1xuICAgIGNvbnN0IGFkZFByb2plY3RGb3JtSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGFkZFByb2plY3RGb3JtSW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICBhZGRQcm9qZWN0Rm9ybUlucHV0LnBsYWNlaG9sZGVyID0gJ3Byb2plY3QgbmFtZSdcbiAgICBhZGRQcm9qZWN0Rm9ybUlucHV0LnJlcXVpcmVkID0gdHJ1ZTtcbiAgICBoZWFkZXJQcm9qZWN0LmFwcGVuZENoaWxkKGFkZFByb2plY3RGb3JtSW5wdXQpO1xuICAgIGNvbnN0IGFkZFByb2plY3RGb3JtQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYWRkUHJvamVjdEZvcm1CdXR0b24ub25jbGljayA9IGdldFByb2plY3ROYW1lO1xuICAgIGFkZFByb2plY3RGb3JtQnV0dG9uLmlubmVySFRNTCA9ICdjb25maXJtJ1xuICAgIGFkZFByb2plY3RGb3JtQnV0dG9uLmlkID0gJ2J1dHRvbi1wcm9qZWN0LWFjY2VwdCc7XG4gICAgaGVhZGVyUHJvamVjdC5hcHBlbmRDaGlsZChhZGRQcm9qZWN0Rm9ybUJ1dHRvbik7XG5cbiAgICBmdW5jdGlvbiBnZXRQcm9qZWN0TmFtZSgpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBhZGRQcm9qZWN0Rm9ybUlucHV0LnZhbHVlXG5cbiAgICAgICAgaWYgKHByb2plY3ROYW1lID09PSAnJykge1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2plY3QgbXVzdCBiZSBuYW1lZCcpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZygnTmV3IHByb2plY3QgbmFtZSBpcyAnICsgcHJvamVjdE5hbWUpXG4gICAgICAgIHByb2plY3RzLnB1c2goUHJvamVjdChwcm9qZWN0TmFtZSkpO1xuICAgICAgICBhZGRQcm9qZWN0Rm9ybUlucHV0LnJlbW92ZSgpO1xuICAgICAgICBhZGRQcm9qZWN0Rm9ybUJ1dHRvbi5yZW1vdmUoKTtcbiAgICAgICAgaGVhZGVyUHJvamVjdC5hcHBlbmRDaGlsZChhZGRQcm9qZWN0QnV0dG9uKTtcbiAgICAgICAgaW5pdGlhbGl6ZVdlYlBhZ2UoKTtcbiAgICB9O1xufTtcblxuLy9ha3R1YWxpemFjamEgbGlzdHkgYWt0eXdueWNoIHByb2pla3TDs3dcblxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdExpc3QoKSB7XG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1saXN0Jyk7XG4gICAgcHJvamVjdExpc3QuaW5uZXJIVE1MID0gJyc7XG5cbiAgICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0LCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9qZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgIHByb2plY3RPcHRpb24uZGF0YXNldC5pZCA9IGluZGV4O1xuICAgICAgICBwcm9qZWN0T3B0aW9uLnZhbHVlID0gcHJvamVjdC5nZXROYW1lKCk7XG4gICAgICAgIHByb2plY3RPcHRpb24uaW5uZXJIVE1MID0gcHJvamVjdC5nZXROYW1lKCk7XG4gICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKHByb2plY3RPcHRpb24pO1xuICAgIH0pXG59XG5cbi8vxYJhZG93YW5pZSB0YXNrw7N3IG5hIHN0cm9uxJlcblxuZnVuY3Rpb24gbG9hZFRhc2tzKCkge1xuICAgIGNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdCcpO1xuICAgIHRvZG9MaXN0LmlubmVySFRNTCA9ICcnO1xuXG4gICAgYWN0dWFsUHJvamVjdC50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RvZG8tY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IGJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJsb2NrLmNsYXNzTGlzdC5hZGQoJ3RvZG8tYmxvY2snKTtcbiAgICAgICAgY29uc3QgdG9kb0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0b2RvSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3RvZG8taGVhZGVyJyk7XG5cbiAgICAgICAgY29uc3QgdG9kb1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBjb25zdCB0b2RvRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblxuICAgICAgICB0b2RvVGl0bGUuaW5uZXJIVE1MID0gdGFzay5nZXROYW1lKCk7XG4gICAgICAgIHRvZG9UaXRsZS5jbGFzc0xpc3QuYWRkKCd0b2RvLXRpdGxlJylcblxuICAgICAgICB0b2RvRGF0ZS5pbm5lckhUTUwgPSAnRGF0ZSBwbGFjZWhvbGRlcidcbiAgICAgICAgdG9kb0RhdGUuY2xhc3NMaXN0LmFkZCgndG9kby1kYXRlJyk7XG5cbiAgICAgICAgdG9kb0hlYWRlci5hcHBlbmQodG9kb1RpdGxlLCB0b2RvRGF0ZSk7XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKHRvZG9IZWFkZXIpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYmxvY2spO1xuICAgICAgICB0b2RvTGlzdC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgICAgICBibG9jay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGJsb2NrLmNsYXNzTGlzdC50b2dnbGUoJ2V4cGFuZCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzdWJ0YXNrQmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3VidGFza0Jsb2NrLmNsYXNzTGlzdC5hZGQoJ3N1YnRhc2stYmxvY2snKTtcbiAgICAgICAgYmxvY2suYXBwZW5kQ2hpbGQoc3VidGFza0Jsb2NrKVxuXG4gICAgICAgIGNvbnN0IHN1YnRhc2tCbG9ja1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcbiAgICAgICAgc3VidGFza0Jsb2NrVGl0bGUuY2xhc3NMaXN0LmFkZCgnc3VidGFzay1ibG9jay10aXRsZScpO1xuICAgICAgICBzdWJ0YXNrQmxvY2tUaXRsZS5pbm5lckhUTUwgPSAnc3VidGFzayBsaXN0JztcbiAgICAgICAgc3VidGFza0Jsb2NrLmFwcGVuZENoaWxkKHN1YnRhc2tCbG9ja1RpdGxlKTtcblxuICAgICAgICAvL3R1dGFqIGdlbmVyb3dhbmllIHN1YnRhc2vDs3cgdyB0YXNrdVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKXtcbiAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tQb3NpdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgc3VidGFza1Bvc2l0aW9uLmNsYXNzTGlzdC5hZGQoJ3N1YnRhc2stcG9zaXRpb24nKTtcbiAgICAgICAgICAgIHN1YnRhc2tCbG9jay5hcHBlbmRDaGlsZChzdWJ0YXNrUG9zaXRpb24pO1xuXG4gICAgICAgICAgICBjb25zdCBzdWJ0YXNrTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgc3VidGFza0xhYmVsLmZvciA9ICdzdWJ0YXNrJztcbiAgICAgICAgICAgIHN1YnRhc2tQb3NpdGlvbi5hcHBlbmRDaGlsZChzdWJ0YXNrTGFiZWwpXG4gICAgICAgICAgICBjb25zdCBzdWJ0YXNrQ2hlY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgc3VidGFza0NoZWNrLnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICAgICAgc3VidGFza0NoZWNrLmlkID0gJ3N1YnRhc2snXG4gICAgICAgICAgICBzdWJ0YXNrTGFiZWwuYXBwZW5kQ2hpbGQoc3VidGFza0NoZWNrKTtcbiAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgc3VidGFza05hbWUuY2xhc3NMaXN0LmFkZCgnc3VidGFzay1uYW1lJyk7XG4gICAgICAgICAgICBzdWJ0YXNrTmFtZS5pbm5lckhUTUwgPSAndHlwaWNhbCBzdWJ0YXNrJztcbiAgICAgICAgICAgIHN1YnRhc2tMYWJlbC5hcHBlbmRDaGlsZChzdWJ0YXNrTmFtZSk7XG4gICAgICAgICAgICBjb25zdCBzdWJ0YXNrRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIHN1YnRhc2tEYXRlLmNsYXNzTGlzdC5hZGQoJ3N1YnRhc2stZGF0ZScpO1xuICAgICAgICAgICAgc3VidGFza0RhdGUuaW5uZXJIVE1MID0gJ2RhdGUgcGxhY2Vob2xkZXInO1xuICAgICAgICAgICAgc3VidGFza1Bvc2l0aW9uLmFwcGVuZENoaWxkKHN1YnRhc2tEYXRlKTtcbiAgICAgICAgICAgIGNvbnN0IHN1YnRhc2tSZW1vdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIHN1YnRhc2tSZW1vdmUudHlwZSA9ICdidXR0b24nO1xuICAgICAgICAgICAgc3VidGFza1JlbW92ZS5jbGFzc0xpc3QuYWRkKCdzdWJ0YXNrLXJlbW92ZScpO1xuICAgICAgICAgICAgc3VidGFza1JlbW92ZS5pbm5lckhUTUwgPSAnJnRpbWVzOyc7XG4gICAgICAgICAgICBzdWJ0YXNrUG9zaXRpb24uYXBwZW5kQ2hpbGQoc3VidGFza1JlbW92ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXdTdWJUYXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIG5ld1N1YlRhc2tCdXR0b24uaWQgPSAnYWRkLXN1YnRhc2stYmxvY2snO1xuICAgICAgICBuZXdTdWJUYXNrQnV0dG9uLmlubmVySFRNTCA9ICcmcGx1czsnO1xuICAgICAgICBuZXdTdWJUYXNrQnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgc3VidGFza0Jsb2NrLmFwcGVuZENoaWxkKG5ld1N1YlRhc2tCdXR0b24pO1xuXG4gICAgICAgIGNvbnN0IHJlbW92ZVRvZG9CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgcmVtb3ZlVG9kb0J1dHRvbi5pZCA9ICdyZW1vdmUtdG9kbyc7XG4gICAgICAgIHJlbW92ZVRvZG9CdXR0b24uaW5uZXJIVE1MID0gJ1JlbW92ZSc7XG4gICAgICAgIHJlbW92ZVRvZG9CdXR0b24udHlwZSA9ICdidXR0b24nO1xuICAgICAgICBibG9jay5hcHBlbmRDaGlsZChyZW1vdmVUb2RvQnV0dG9uKTtcbiAgICB9KVxufVxuXG4vL8WCYWRvd2FuaWUgbm93ZWdvIHByb2pla3R1IG5hIHN0cm9uxJkgaSB6bWlhbmEgYWN0dWFsUHJvamVjdFxuXG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1saXN0Jyk7XG4gICAgY29uc3QgcHJvamVjdEluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyLXByb2plY3QtaW5mbycpO1xuICAgIHByb2plY3RJbmZvLmlubmVySFRNTCA9ICdBY3R1YWwgcHJvamVjdDogJyArIGFjdHVhbFByb2plY3QuZ2V0TmFtZSgpO1xuXG4gICAgcHJvamVjdExpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RlZE9wdGlvbiA9IHByb2plY3RMaXN0Lm9wdGlvbnNbcHJvamVjdExpc3Quc2VsZWN0ZWRJbmRleF1cbiAgICAgICAgYWN0dWFsUHJvamVjdCA9IHByb2plY3RzW3NlbGVjdGVkT3B0aW9uLmRhdGFzZXQuaWRdXG4gICAgICAgIHByb2plY3RJbmZvLmlubmVySFRNTCA9ICdBY3R1YWwgcHJvamVjdDogJyArIGFjdHVhbFByb2plY3QuZ2V0TmFtZSgpO1xuICAgICAgICBjb25zb2xlLmxvZygnQWN0dWFsIHByb2plY3Q6ICcgKyBhY3R1YWxQcm9qZWN0KVxuICAgICAgICBjb25zb2xlLmxvZyhzZWxlY3RlZE9wdGlvbi5kYXRhc2V0LmlkKVxuICAgICAgICBsb2FkVGFza3MoKTtcbiAgICB9KTtcblxuLy90d29yemVuaWUgbm93eWNoIHRhc2vDs3cgXG5cbiAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10b2RvJyk7XG4gICAgY29uc3QgYWRkVG9kb0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRvZG8tZm9ybScpO1xuICAgIGNvbnN0IGZvcm1PdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm0tb3ZlcmxheScpO1xuICAgIGNvbnN0IGNhbmNlbEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FuY2VsLWZvcm0nKTtcbiAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBhZGRUb2RvRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgICAgZm9ybU92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgfSlcbiAgICBjYW5jZWxGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBhZGRUb2RvRm9ybS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKTtcbiAgICAgICAgZm9ybU92ZXJsYXkuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgfSlcblxuICAgIGNvbnN0IGR1ZURhdGVGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZHVlLWRhdGUnKTtcbiAgICBkdWVEYXRlRm9ybS5taW4gPSBuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tY2EnKTtcbiAgICBkdWVEYXRlRm9ybS5tYXggPSBcIjIxMDAtMDEtMDFcIjtcblxuICAgIGNvbnN0IGFkZFN1YlRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXN1YnRhc2stZm9ybScpO1xuXG4gICAgYWRkU3ViVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3U3ViVGFza0xhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgY29uc3QgbmV3U3ViVGFza1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgY29uc3QgbmV3U3ViVGFza0RhdGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGNvbnN0IG5ld1N1YlRhc2tEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgbmV3U3ViVGFza1RpdGxlLnR5cGUgPSAndGV4dCc7XG4gICAgICAgIG5ld1N1YlRhc2tUaXRsZS5pZCA9ICdzdWJ0YXNrLW5hbWUnO1xuICAgICAgICBuZXdTdWJUYXNrVGl0bGUubmFtZSA9ICdzdWJ0YXNrLW5hbWUnO1xuICAgICAgICBuZXdTdWJUYXNrTGFiZWwuZm9yID0gbmV3U3ViVGFza1RpdGxlLmlkO1xuICAgICAgICBuZXdTdWJUYXNrTGFiZWwuaW5uZXJIVE1MID0gJ1N1YnRhc2sgbmFtZTonO1xuICAgICAgICBuZXdTdWJUYXNrTGFiZWwuYXBwZW5kQ2hpbGQobmV3U3ViVGFza1RpdGxlKTtcbiAgICAgICAgYWRkU3ViVGFza0J1dHRvbi5iZWZvcmUobmV3U3ViVGFza0xhYmVsKTtcbiAgICAgICAgbmV3U3ViVGFza0R1ZURhdGUudHlwZSA9ICdkYXRlJztcbiAgICAgICAgbmV3U3ViVGFza0R1ZURhdGUuaWQgPSAnc3VidGFzay1kdWUtZGF0ZSc7XG4gICAgICAgIG5ld1N1YlRhc2tEdWVEYXRlLm5hbWUgPSAnc3VidGFzay1kdWUtZGF0ZSc7XG4gICAgICAgIG5ld1N1YlRhc2tEdWVEYXRlLm1pbiA9IG5ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1jYScpO1xuICAgICAgICBuZXdTdWJUYXNrRHVlRGF0ZS5tYXggPSBcIjIxMDAtMDEtMDFcIjtcbiAgICAgICAgbmV3U3ViVGFza0RhdGVMYWJlbC5pbm5lckhUTUwgPSAnU3VidGFzayBkdWUgZGF0ZTonO1xuICAgICAgICBuZXdTdWJUYXNrRGF0ZUxhYmVsLmFwcGVuZENoaWxkKG5ld1N1YlRhc2tEdWVEYXRlKTtcbiAgICAgICAgYWRkU3ViVGFza0J1dHRvbi5iZWZvcmUobmV3U3ViVGFza0RhdGVMYWJlbCk7XG4gICAgfSlcbiAgIFxuXG5cblxuZXhwb3J0IHsgaW5pdGlhbGl6ZVdlYlBhZ2UgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGluaXRpYWxpemVXZWJQYWdlIH0gZnJvbSBcIi4vbW9kdWxlcy91aVwiO1xuXG5pbml0aWFsaXplV2ViUGFnZSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9