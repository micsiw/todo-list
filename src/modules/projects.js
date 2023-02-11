import newTask from './tasks.js';

let projects = [];

const Project = (name) => {

    const getName = () => name;

    let tasks = [];

    const addTask = (name, dueDate) => {
        tasks.push(newTask(name, dueDate));
    };
    
    return { getName, addTask, tasks };
};

//Manually adding test tasks and projects.

const defaultProject = Project('Personal');
const testProject = Project('Test');
const schoolProject = Project('School');

projects.push(defaultProject, testProject, schoolProject);

defaultProject.addTask('first task', '2023-10-03');
defaultProject.addTask('second task', '');
defaultProject.addTask('third task', '2023-12-12');

testProject.addTask('fourth task', '');
schoolProject.addTask('fifth task', '');

defaultProject.tasks[0].addSubtask('first sub', '', true);
defaultProject.tasks[0].addSubtask('second sub', '', false);
defaultProject.tasks[2].addSubtask('third sub', '', true);

export default Project;
export { projects };