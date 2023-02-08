const Task = (name, dueDate) => {

    let subtasks = [];

    const getName = () => name;
    const getDate = () => dueDate;

    return { subtasks, getName, getDate }
};

export default Task;