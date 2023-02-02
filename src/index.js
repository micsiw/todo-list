const block = document.querySelectorAll('.todo-block');

block.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.toggle('expand');
    })
})
