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
let projects = ['default', 'test', 'school'];

const newProject = (name) => {

    const getName = () => name;
    const create = (name) => {
        projects.push(name);
    }

    return { getName, create };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (newProject());


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

function initializeWebPage() {
    addProjectButton.addEventListener('click', initializeNewProject);


    block.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.toggle('expand');
        })
    })

    updateProjectList();
    swapProject();

    console.log('Projects array: ' + _projects__WEBPACK_IMPORTED_MODULE_0__.projects)

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
        _projects__WEBPACK_IMPORTED_MODULE_0__["default"].create(addProjectFormInput.value)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7O0FBRUEsaUVBQWUsWUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDWlE7QUFDRTs7QUFFdEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7O0FBRUEscUNBQXFDLCtDQUFROztBQUU3Qzs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLHdEQUFpQjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLElBQUksdURBQWdCO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMOztBQUVBOzs7Ozs7OztVQ3BGQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmlEOzs7O0FBSWpELDhEQUFpQiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3VpLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgcHJvamVjdHMgPSBbJ2RlZmF1bHQnLCAndGVzdCcsICdzY2hvb2wnXTtcblxuY29uc3QgbmV3UHJvamVjdCA9IChuYW1lKSA9PiB7XG5cbiAgICBjb25zdCBnZXROYW1lID0gKCkgPT4gbmFtZTtcbiAgICBjb25zdCBjcmVhdGUgPSAobmFtZSkgPT4ge1xuICAgICAgICBwcm9qZWN0cy5wdXNoKG5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiB7IGdldE5hbWUsIGNyZWF0ZSB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbmV3UHJvamVjdCgpO1xuZXhwb3J0IHsgcHJvamVjdHMgfTsiLCJpbXBvcnQgbmV3UHJvamVjdCBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCB7IHByb2plY3RzIH0gZnJvbSAnLi9wcm9qZWN0cyc7XG5cbmNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXByb2plY3QnKTtcbmNvbnN0IGhlYWRlclByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyLXByb2plY3QtbGlzdCcpO1xuY29uc3QgYmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9kby1ibG9jaycpO1xuXG5mdW5jdGlvbiBpbml0aWFsaXplV2ViUGFnZSgpIHtcbiAgICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaW5pdGlhbGl6ZU5ld1Byb2plY3QpO1xuXG5cbiAgICBibG9jay5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnZXhwYW5kJyk7XG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIHVwZGF0ZVByb2plY3RMaXN0KCk7XG4gICAgc3dhcFByb2plY3QoKTtcblxuICAgIGNvbnNvbGUubG9nKCdQcm9qZWN0cyBhcnJheTogJyArIHByb2plY3RzKVxuXG59O1xuXG5mdW5jdGlvbiBpbml0aWFsaXplTmV3UHJvamVjdCgpIHtcblxuICAgIGxldCBwcm9qZWN0TmFtZTtcblxuICAgIGFkZFByb2plY3RCdXR0b24ucmVtb3ZlKCk7O1xuICAgIGNvbnN0IGFkZFByb2plY3RGb3JtSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGFkZFByb2plY3RGb3JtSW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICBhZGRQcm9qZWN0Rm9ybUlucHV0LnBsYWNlaG9sZGVyID0gJ3Byb2plY3QgbmFtZSdcbiAgICBhZGRQcm9qZWN0Rm9ybUlucHV0LnJlcXVpcmVkID0gdHJ1ZTtcbiAgICBoZWFkZXJQcm9qZWN0LmFwcGVuZENoaWxkKGFkZFByb2plY3RGb3JtSW5wdXQpO1xuICAgIGNvbnN0IGFkZFByb2plY3RGb3JtQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYWRkUHJvamVjdEZvcm1CdXR0b24ub25jbGljayA9IGdldFByb2plY3ROYW1lO1xuICAgIGFkZFByb2plY3RGb3JtQnV0dG9uLmlubmVySFRNTCA9ICdjb25maXJtJ1xuICAgIGFkZFByb2plY3RGb3JtQnV0dG9uLmlkID0gJ2J1dHRvbi1wcm9qZWN0LWFjY2VwdCc7XG4gICAgaGVhZGVyUHJvamVjdC5hcHBlbmRDaGlsZChhZGRQcm9qZWN0Rm9ybUJ1dHRvbik7XG5cbiAgICBmdW5jdGlvbiBnZXRQcm9qZWN0TmFtZSgpIHtcbiAgICAgICAgcHJvamVjdE5hbWUgPSBhZGRQcm9qZWN0Rm9ybUlucHV0LnZhbHVlXG5cbiAgICAgICAgaWYgKHByb2plY3ROYW1lID09PSAnJykge1xuICAgICAgICAgICAgYWxlcnQoJ1Byb2plY3QgbXVzdCBiZSBuYW1lZCcpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZygnTmV3IHByb2plY3QgbmFtZSBpcyAnICsgcHJvamVjdE5hbWUpXG4gICAgICAgIG5ld1Byb2plY3QuY3JlYXRlKGFkZFByb2plY3RGb3JtSW5wdXQudmFsdWUpXG4gICAgICAgIGFkZFByb2plY3RGb3JtSW5wdXQucmVtb3ZlKCk7XG4gICAgICAgIGFkZFByb2plY3RGb3JtQnV0dG9uLnJlbW92ZSgpO1xuICAgICAgICBoZWFkZXJQcm9qZWN0LmFwcGVuZENoaWxkKGFkZFByb2plY3RCdXR0b24pO1xuICAgICAgICBpbml0aWFsaXplV2ViUGFnZSgpO1xuICAgIH07XG59O1xuXG5mdW5jdGlvbiB1cGRhdGVQcm9qZWN0TGlzdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWxpc3QnKTtcbiAgICBwcm9qZWN0TGlzdC5pbm5lckhUTUwgPSAnJztcblxuICAgIHByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgIGNvbnN0IHByb2plY3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgcHJvamVjdE9wdGlvbi52YWx1ZSA9IHByb2plY3Q7XG4gICAgICAgIHByb2plY3RPcHRpb24uaW5uZXJIVE1MID0gcHJvamVjdDtcbiAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQocHJvamVjdE9wdGlvbik7XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gc3dhcFByb2plY3QoKSB7XG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1saXN0JykuY2hpbGROb2RlcztcbiAgICBjb25zdCBwcm9qZWN0SW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXItcHJvamVjdC1pbmZvJyk7XG5cblxuICAgIHByb2plY3RMaXN0LmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3QpXG4gICAgICAgIHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignc2VsZWN0JywgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgcHJvamVjdEluZm8uaW5uZXJIVE1MID0gcHJvamVjdDtcbiAgICAgICAgfSlcbiAgICB9KTtcblxuLy8gWnJvYiB0YSBmdW5rY2plIHRhayB6ZWJ5IHptaWVuaWFsYSBmb2N1cyBwcm9qZWt0dSBuYSBpbm55IDpQXG5cbn1cblxuZXhwb3J0IHsgaW5pdGlhbGl6ZVdlYlBhZ2UgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGluaXRpYWxpemVXZWJQYWdlIH0gZnJvbSBcIi4vbW9kdWxlcy91aVwiO1xuXG5cblxuaW5pdGlhbGl6ZVdlYlBhZ2UoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==