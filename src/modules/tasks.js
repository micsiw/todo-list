const Task = (name, dueDate) => {

    let subtasks = [];

    const getName = () => name;
    const getDate = () => dueDate;
    const setDate = (newDate) => {
        if (newDate === '') {
            dueDate = 'no date'
        } else {
            dueDate = newDate;
        }
    }
    const addSubtask = (name, dueDate) => {
        if (dueDate === '') {
            dueDate = 'no date';
        }
        subtasks.push({name, dueDate});
    }

    return { subtasks, getName, getDate, setDate, addSubtask }
};



export default Task;