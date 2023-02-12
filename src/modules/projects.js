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

//Adding placeholder tasks and projects.

const defaultProject = Project('Personal');
const testProject = Project('Test');
const schoolProject = Project('School');

projects.push(defaultProject, testProject, schoolProject);

defaultProject.addTask('Cleaning', '');
defaultProject.addTask('Cooking', '');
defaultProject.addTask('Things to fix', '2023-03-02');

testProject.addTask('Test task', '');
schoolProject.addTask('Very important essay', '2023-05-10');

defaultProject.tasks[0].addSubtask('Clean the bathroom', '', true);
defaultProject.tasks[0].addSubtask('Vacuum living room', '', false);
defaultProject.tasks[2].addSubtask('Fix Ubuntu crashing', '2023-03-02', false);

export default Project;
export { projects };