const Task = (name, dueDate) => {

    let subtasks = [];

    const getName = () => name;
    const getDate = () => dueDate;
    const addSubtask = (name, dueDate) => {
        if (dueDate === '') {
            dueDate = 'no date';
        }
        subtasks.push({name, dueDate});
    }

    return { subtasks, getName, getDate, addSubtask }
};



export default Task;