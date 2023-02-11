import { format, parseISO } from 'date-fns';

const Subtask = (name, dueDate, status = false) => {

    const getName = () => name;
    const getDate = () => {
        if (dueDate === '') {
            return 'no deadline'
        } else {
            return format(parseISO(dueDate), 'd/MM/y')
        }
    }
    const getStatus = () => status;
    const changeStatus = () => {
        if (status === true) {
            status = false;
        } else {
            status = true;
        }
    }

    return { getName, getDate, getStatus, changeStatus }

}

export default Subtask;