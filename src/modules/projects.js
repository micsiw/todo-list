import newTask from './tasks.js';

const Project = (name) => {

    const getName = () => name;

    let tasks = [];

    const addTask = (name, dueDate) => {
        tasks.push(newTask(name, dueDate));
    };
    
    return { getName, addTask, tasks, name};
};

export default Project;
