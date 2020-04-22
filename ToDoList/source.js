const typedText = document.querySelector('label:nth-child(1) input');
const btn = document.querySelector('button.add');
const ul = document.querySelector('ul');
const li = document.getElementsByClassName('improved');
let tasksCounter = document.querySelector('h1 span');


const removeTask = (e) => {
    console.log('To zadanie zostanie usunięte');

    e.target.parentNode.remove();
    tasksCounter.innerHTML = li.length;
}




const addTask = (e) => {
    e.preventDefault();
    const newTask = typedText.value;
    if (newTask === "") return;
    const liItem = document.createElement('li');
    liItem.innerHTML = newTask + "<button>Usuń</button>";
    liItem.querySelector('button').classList.add('remove_button');
    liItem.classList.add('improved');
    ul.appendChild(liItem);
    typedText.textContent = "";
    tasksCounter.innerHTML = li.length;

    liItem.querySelector('button').addEventListener('click', removeTask);
}








btn.addEventListener('click', addTask);