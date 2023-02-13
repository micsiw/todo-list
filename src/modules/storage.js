import Project from './projects';

let projects = [];

function loadContent() {

    if (!localStorage.getItem('projects')) {
        loadDefault();
    } else {
        loadData();
    }

    function loadDefault() {
        const defaultProject = Project('Personal');
        const testProject = Project('Test');
        const schoolProject = Project('School');

        projects.push(defaultProject, testProject, schoolProject);

        defaultProject.addTask('Cleaning', '');
        defaultProject.addTask('Cooking', '');
        defaultProject.addTask('Things to fix', '2023-03-02');

        testProject.addTask('Test task', '');
        schoolProject.addTask('Very important essay', '2023-05-10');

        defaultProject.tasks[0].addSubtask('Clean the bathroom', '', true);
        defaultProject.tasks[0].addSubtask('Vacuum living room', '', false);
        defaultProject.tasks[2].addSubtask('Fix Ubuntu crashing', '2023-03-02', false);

        localStorage.setItem('projects', JSON.stringify(projects))
    }

    function loadData() {
        const data = JSON.parse(localStorage.getItem("projects"));
        projects = [];
        data.forEach(project => {
            const restored = Project(project.name);
            project.tasks.forEach((task, index) => {
                restored.addTask(task.name, task.dueDate);
                task.subtasks.forEach(subtask => {
                    restored.tasks[index].addSubtask(subtask.name, subtask.dueDate, subtask.status)
                })
            })
            projects.push(restored)
        })
    }
}

loadContent();

export { projects };

