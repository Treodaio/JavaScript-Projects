const typedText = document.querySelector('label:nth-child(1) input');
const searchText = document.querySelector('label:nth-child(2) input');

const btn = document.querySelector('button.add');
const ul = document.querySelector('ul');
const li = document.getElementsByClassName('improved');
let tasksCounter = document.querySelector('h1 span');
//liItem === task
let searchList = [];
const toDoList = [];



const stylingEffects = (liItem) => {
    liItem.querySelector('button').addEventListener('mouseover', (e) => {
        e.target.classList.add('remove_button_on_hover');
    });
    liItem.querySelector('button').addEventListener('mouseout', (e) => {
        e.target.classList.remove('remove_button_on_hover');
    });
}


const refreshTasks = () => {
    ul.textContent = "";
    toDoList.forEach((task, taskNumber) => {
        task.dataset.key = taskNumber;
        ul.appendChild(task);
    })
    tasksCounter.textContent = li.length;
}

const removeTask = (e) => {
    taskNumber = e.target.parentNode.dataset.key;
    toDoList.splice(taskNumber, 1);

    refreshTasks();
}



const addTask = (e) => {
    e.preventDefault();
    const newTask = typedText.value;
    if (newTask === "") return;
    const liItem = document.createElement('li');
    liItem.innerHTML = newTask + "<button>Usuń</button>";
    liItem.querySelector('button').classList.add('remove_button');
    liItem.classList.add('improved');
    toDoList.push(liItem);
    refreshTasks();
    // tasksCounter.innerHTML = li.length;
    liItem.querySelector('button').addEventListener('click', removeTask);

    stylingEffects(liItem);

    typedText.value = "";
}


const search = (e) => {
    const userType = e.target.value.toLowerCase();
    searchList = toDoList.filter((item) => item.textContent.toLowerCase().includes(userType));
    ul.textContent = "";
    searchList.forEach(item => ul.appendChild(item));

}



searchText.addEventListener('input', search);
btn.addEventListener('click', addTask);