let projects = ['default', 'test', 'school'];

const newProject = (name) => {

    const getName = () => name;
    const create = (name) => {
        projects.push(name);
    }

    return { getName, create };
};

export default newProject();
export { projects };