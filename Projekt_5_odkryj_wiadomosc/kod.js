const input = document.getElementById('pass');
const password = "user";
const div = document.querySelector('.message');
const greatMessage = `Wygrałeś 1000$!`;



input.addEventListener('input', function (event) {
    // console.log(this.value);

    console.log(event.target.value);
    if (password === event.target.value) {
        div.textContent = greatMessage;
        event.target.value = "";
    }
    else {
        div.textContent = "";
    }
})

//TARGET CZYLI OBIEKT NA KTORYM JEST ZDARZENIE
input.addEventListener('focus', (event) => {
    event.target.classList.add('active');
})

input.addEventListener('blur', (e) => {
    e.target.classList.remove('active');
})