import { format, parseISO } from "date-fns";
import newSubtask from "./subtasks";

const Task = (name, dueDate) => {
  const subtasks = [];

  const getName = () => name;
  const getRawDate = () => dueDate;
  const getDate = () => {
    if (dueDate === "") {
      return "no deadline";
    } 
      return format(parseISO(dueDate), "d/MM/y");
    
  };
  const setDate = (newDate) => {
    if (newDate === "") {
      dueDate = "";
    } else {
      dueDate = newDate;
    }
  };
  const addSubtask = (name, dueDate, status) => {
    subtasks.push(newSubtask(name, dueDate, status));
  };

  return {
    subtasks,
    getName,
    getDate,
    getRawDate,
    setDate,
    addSubtask,
    name,
    dueDate,
  };
};

export default Task;
