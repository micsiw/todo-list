const Task = (name, dueDate) => {
    const getName = () => name;
    const getDate = () => dueDate;

    return { getName, getDate }
};

export default Task;