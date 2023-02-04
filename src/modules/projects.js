
import newTask from './tasks.js';

let projects = [];

const Project = (name) => {

    const getName = () => name;

    let tasks = [];

    const addTask = (name, dueDate = 'no date') => {
        tasks.push(newTask(name, dueDate));
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



export default Project;
export { projects };