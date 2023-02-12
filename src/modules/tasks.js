import newSubtask from './subtasks';
import { format, parseISO } from 'date-fns';

const Task = (name, dueDate) => {

    let subtasks = [];

    const getName = () => name;
    const getRawDate = () => dueDate;
    const getDate = () => {
        if (dueDate === '') {
            return 'no deadline'
        } else {
            return format(parseISO(dueDate), 'd/MM/y')
        }
    }
    const setDate = (newDate) => {
        if (newDate === '') {
            dueDate = ''
        } else {
            dueDate = newDate;
        }
    }
    const addSubtask = (name, dueDate, status) => {
        subtasks.push(newSubtask(name, dueDate, status));
    }

    return { subtasks, getName, getDate, getRawDate, setDate, addSubtask }
};

export default Task;