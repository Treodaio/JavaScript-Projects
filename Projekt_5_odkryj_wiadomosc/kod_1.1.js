const input = document.getElementById('pass');
const passwords = ['user', 'wiosna', 'trzeci'];
const div = document.querySelector('.message');
const greatMessages = ["Wygrałeś 1000 $", "piękna pora roku", 'interesujące!'];



input.addEventListener('input', function (event) {
    div.textContent = " ";
    const text = event.target.value;
    //password to tak naprawdę również index tablicy passwords
    passwords.forEach((password, index) => {
        if (password === text) {
            div.textContent = greatMessages[index];
            event.target.value = "";
        }
    })
})

//TARGET CZYLI OBIEKT NA KTORYM JEST ZDARZENIE
input.addEventListener('focus', (event) => {
    event.target.classList.add('active');
})

input.addEventListener('blur', (e) => {
    e.target.classList.remove('active');
})