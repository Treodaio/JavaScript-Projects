const typedText = document.querySelector('label:nth-child(1) input');
const searchText = document.querySelector('label:nth-child(2) input');

const btn = document.querySelector('button.add');
const ul = document.querySelector('ul');
const li = document.getElementsByClassName('improved');
let tasksCounter = document.querySelector('h1 span');


const removeTask = (e) => {

    e.target.parentNode.remove();
    tasksCounter.innerHTML = li.length;
}


let results = [];

const addTask = (e) => {
    e.preventDefault();
    const newTask = typedText.value;
    if (newTask === "") return;
    const liItem = document.createElement('li');
    liItem.innerHTML = newTask + "<button>Usuń</button>";
    liItem.querySelector('button').classList.add('remove_button');
    liItem.classList.add('improved');
    ul.appendChild(liItem);
    tasksCounter.innerHTML = li.length;
    typedText.value = "";
    liItem.querySelector('button').addEventListener('click', removeTask);
}


const search = (e) => {
    const userType = e.target.value.toLowerCase();
    const liElements = [...li];
    results = liElements.filter((item) => item.textContent.toLowerCase().includes(userType));
    ul.innerHTML = "";
    results.forEach(item => ul.appendChild(item));
}




searchText.addEventListener('input', search);
btn.addEventListener('click', addTask);