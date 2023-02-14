import newTask from "./tasks";

const Project = (name) => {
  const getName = () => name;

  const tasks = [];

  const addTask = (name, dueDate) => {
    tasks.push(newTask(name, dueDate));
  };

  return { getName, addTask, tasks, name };
};

export default Project;
