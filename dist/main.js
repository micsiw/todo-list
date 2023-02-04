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



console.log('Project list: ' + projects)

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
const block = document.querySelectorAll('.todo-block');

let actualProject = _projects__WEBPACK_IMPORTED_MODULE_0__.projects[0]

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
        _projects__WEBPACK_IMPORTED_MODULE_0__.projects.push((0,_projects__WEBPACK_IMPORTED_MODULE_0__["default"])(projectName));
        addProjectFormInput.remove();
        addProjectFormButton.remove();
        headerProject.appendChild(addProjectButton);
        initializeWebPage();
    };
};

function updateProjectList() {
    const projectList = document.querySelector('#project-list');
    projectList.innerHTML = '';

    _projects__WEBPACK_IMPORTED_MODULE_0__.projects.forEach(project => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNpQzs7QUFFakM7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxtQkFBbUIscURBQU87QUFDMUI7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7O0FBSUE7O0FBRUE7QUFDQTs7OztBQUlBLGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDekN2QjtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiOztBQUVBLGlFQUFlLElBQUk7Ozs7Ozs7Ozs7Ozs7OztBQ1BjO0FBQ0s7O0FBRXRDO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0Isa0RBQVc7O0FBRS9CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsb0RBQWEsQ0FBQyxxREFBTztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLElBQUksdURBQWdCO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7Ozs7Ozs7VUNuR0w7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05pRDs7QUFFakQsOERBQWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvdWkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IG5ld1Rhc2sgZnJvbSAnLi90YXNrcy5qcyc7XG5cbmxldCBwcm9qZWN0cyA9IFtdO1xuXG5jb25zdCBQcm9qZWN0ID0gKG5hbWUpID0+IHtcblxuICAgIGNvbnN0IGdldE5hbWUgPSAoKSA9PiBuYW1lO1xuXG4gICAgbGV0IHRhc2tzID0gW107XG5cbiAgICBjb25zdCBhZGRUYXNrID0gKG5hbWUsIGR1ZURhdGUgPSAnbm8gZGF0ZScpID0+IHtcbiAgICAgICAgdGFza3MucHVzaChuZXdUYXNrKG5hbWUsIGR1ZURhdGUpKTtcbiAgICB9O1xuICAgIFxuICAgIHJldHVybiB7IGdldE5hbWUsIGFkZFRhc2ssIHRhc2tzIH07XG59O1xuXG5jb25zdCBkZWZhdWx0UHJvamVjdCA9IFByb2plY3QoJ0RlZmF1bHQnKTtcbmNvbnN0IHRlc3RQcm9qZWN0ID0gUHJvamVjdCgnVGVzdCcpO1xuY29uc3Qgc2Nob29sUHJvamVjdCA9IFByb2plY3QoJ1NjaG9vbCcpO1xuXG5wcm9qZWN0cy5wdXNoKGRlZmF1bHRQcm9qZWN0LCB0ZXN0UHJvamVjdCwgc2Nob29sUHJvamVjdCk7XG5cbmRlZmF1bHRQcm9qZWN0LmFkZFRhc2soJ2ZpcnN0IHRhc2snKTtcbmRlZmF1bHRQcm9qZWN0LmFkZFRhc2soJ3NlY29uZCB0YXNrJyk7XG5kZWZhdWx0UHJvamVjdC5hZGRUYXNrKCd0aGlyZCB0YXNrJyk7XG5cbnRlc3RQcm9qZWN0LmFkZFRhc2soJ2ZvdXJ0aCB0YXNrJyk7XG5cbnNjaG9vbFByb2plY3QuYWRkVGFzaygnZmlmdGggdGFzaycpO1xuXG5cblxuY29uc29sZS5sb2coJ1Byb2plY3QgbGlzdDogJyArIHByb2plY3RzKVxuXG4vLyBjb25zb2xlLmxvZyhkZWZhdWx0UHJvamVjdC50YXNrc1swXS5nZXROYW1lKCkpXG4vLyBjb25zb2xlLmxvZyhkZWZhdWx0UHJvamVjdC50YXNrc1swXS5nZXREYXRlKCkpXG5cblxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0O1xuZXhwb3J0IHsgcHJvamVjdHMgfTsiLCJjb25zdCBUYXNrID0gKG5hbWUsIGR1ZURhdGUpID0+IHtcbiAgICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcbiAgICBjb25zdCBnZXREYXRlID0gKCkgPT4gZHVlRGF0ZTtcblxuICAgIHJldHVybiB7IGdldE5hbWUsIGdldERhdGUgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgVGFzazsiLCJpbXBvcnQgUHJvamVjdCBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCB7IHByb2plY3RzIH0gZnJvbSAnLi9wcm9qZWN0cyc7XG5cbmNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3QnKTtcbmNvbnN0IGhlYWRlclByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyLXByb2plY3QtbGlzdCcpO1xuY29uc3QgYmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1ibG9jaycpO1xuXG5sZXQgYWN0dWFsUHJvamVjdCA9IHByb2plY3RzWzBdXG5cbmZ1bmN0aW9uIGluaXRpYWxpemVXZWJQYWdlKCkge1xuICAgIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpbml0aWFsaXplTmV3UHJvamVjdCk7XG5cbiAgICB1cGRhdGVQcm9qZWN0TGlzdCgpO1xuICAgIGxvYWRUYXNrcygpO1xufTtcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZU5ld1Byb2plY3QoKSB7XG5cbiAgICBhZGRQcm9qZWN0QnV0dG9uLnJlbW92ZSgpOztcbiAgICBjb25zdCBhZGRQcm9qZWN0Rm9ybUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBhZGRQcm9qZWN0Rm9ybUlucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgYWRkUHJvamVjdEZvcm1JbnB1dC5wbGFjZWhvbGRlciA9ICdwcm9qZWN0IG5hbWUnXG4gICAgYWRkUHJvamVjdEZvcm1JbnB1dC5yZXF1aXJlZCA9IHRydWU7XG4gICAgaGVhZGVyUHJvamVjdC5hcHBlbmRDaGlsZChhZGRQcm9qZWN0Rm9ybUlucHV0KTtcbiAgICBjb25zdCBhZGRQcm9qZWN0Rm9ybUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGFkZFByb2plY3RGb3JtQnV0dG9uLm9uY2xpY2sgPSBnZXRQcm9qZWN0TmFtZTtcbiAgICBhZGRQcm9qZWN0Rm9ybUJ1dHRvbi5pbm5lckhUTUwgPSAnY29uZmlybSdcbiAgICBhZGRQcm9qZWN0Rm9ybUJ1dHRvbi5pZCA9ICdidXR0b24tcHJvamVjdC1hY2NlcHQnO1xuICAgIGhlYWRlclByb2plY3QuYXBwZW5kQ2hpbGQoYWRkUHJvamVjdEZvcm1CdXR0b24pO1xuXG4gICAgZnVuY3Rpb24gZ2V0UHJvamVjdE5hbWUoKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gYWRkUHJvamVjdEZvcm1JbnB1dC52YWx1ZVxuXG4gICAgICAgIGlmIChwcm9qZWN0TmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdQcm9qZWN0IG11c3QgYmUgbmFtZWQnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coJ05ldyBwcm9qZWN0IG5hbWUgaXMgJyArIHByb2plY3ROYW1lKVxuICAgICAgICBwcm9qZWN0cy5wdXNoKFByb2plY3QocHJvamVjdE5hbWUpKTtcbiAgICAgICAgYWRkUHJvamVjdEZvcm1JbnB1dC5yZW1vdmUoKTtcbiAgICAgICAgYWRkUHJvamVjdEZvcm1CdXR0b24ucmVtb3ZlKCk7XG4gICAgICAgIGhlYWRlclByb2plY3QuYXBwZW5kQ2hpbGQoYWRkUHJvamVjdEJ1dHRvbik7XG4gICAgICAgIGluaXRpYWxpemVXZWJQYWdlKCk7XG4gICAgfTtcbn07XG5cbmZ1bmN0aW9uIHVwZGF0ZVByb2plY3RMaXN0KCkge1xuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbGlzdCcpO1xuICAgIHByb2plY3RMaXN0LmlubmVySFRNTCA9ICcnO1xuXG4gICAgcHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAvLyBjb25zdCBwcm9qZWN0SUQgPSBwcm9qZWN0LmluZGV4T2YocHJvamVjdC5nZXROYW1lKCkpO1xuICAgICAgICAvLyBwcm9qZWN0T3B0aW9uLmRhdGFzZXQuaWQgPSBwcm9qZWN0SUQ7XG4gICAgICAgIC8vIHpyw7NiIHRhaywgxbxlYnkga2HFvGR5IHByb2pldCBtaWHFgiBpZCBkYXRhc2V0IHBvIGt0w7NyeW0gbW/FvG5hIHVzdGF3acSHIGFrdHVhbG55IHByb2pla3RcbiAgICAgICAgcHJvamVjdE9wdGlvbi52YWx1ZSA9IHByb2plY3QuZ2V0TmFtZSgpO1xuICAgICAgICBwcm9qZWN0T3B0aW9uLmlubmVySFRNTCA9IHByb2plY3QuZ2V0TmFtZSgpO1xuICAgICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0T3B0aW9uKTtcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBsb2FkVGFza3MoKSB7XG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgICBtYWluLmlubmVySFRNTCA9ICcnO1xuXG4gICAgYWN0dWFsUHJvamVjdC50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RvZG8tY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IGJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJsb2NrLmNsYXNzTGlzdC5hZGQoJ3RvZG8tYmxvY2snKTtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIHRpdGxlLmlubmVySFRNTCA9IHRhc2suZ2V0TmFtZSgpO1xuICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCd0b2RvLXRpdGxlJyk7XG4gICAgICAgIGJsb2NrLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJsb2NrKTtcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgIH0pXG59XG5cbi8vb3BjamEgcm96d2luacSZY2lhIHRvZG8gb2tuYVxuXG5ibG9jay5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnZXhwYW5kJyk7XG4gICAgfSlcbn0pXG5cbi8vxYJhZG93YW5pZSBub3dlZ28gcHJvamVrdHUgbmEgc3Ryb27EmSBpIHptaWFuYSBhY3R1YWxQcm9qZWN0XG5cbmNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbGlzdCcpO1xuICAgIGNvbnN0IHByb2plY3RJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlci1wcm9qZWN0LWluZm8nKTtcbiAgICBwcm9qZWN0SW5mby5pbm5lckhUTUwgPSAnQWN0dWFsIHByb2plY3Q6ICcgKyBhY3R1YWxQcm9qZWN0LmdldE5hbWUoKTtcblxuICAgIHByb2plY3RMaXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgICAgYWN0dWFsUHJvamVjdCA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICBwcm9qZWN0SW5mby5pbm5lckhUTUwgPSAnQWN0dWFsIHByb2plY3Q6ICcgKyBhY3R1YWxQcm9qZWN0O1xuICAgICAgICBjb25zb2xlLmxvZygnQWN0dWFsIHByb2plY3Q6ICcgKyBhY3R1YWxQcm9qZWN0KVxuICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldClcbiAgICB9KTtcblxuZXhwb3J0IHsgaW5pdGlhbGl6ZVdlYlBhZ2UgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGluaXRpYWxpemVXZWJQYWdlIH0gZnJvbSBcIi4vbW9kdWxlcy91aVwiO1xuXG5pbml0aWFsaXplV2ViUGFnZSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9