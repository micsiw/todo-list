
import newTask from './tasks.js';

let projects = [];

const Project = (name) => {

    const getName = () => name;

    let tasks = [];

    const addTask = (name, dueDate) => {
        if (dueDate === '') {
            dueDate = 'no date';
        }
        tasks.push(newTask(name, dueDate));
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



export default Project;
export { projects };