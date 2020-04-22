const input = document.getElementById('pass');
const div = document.querySelector('.message');

const messages = ['super', 'działa!', 'NICE!'];
const passwords = ['JedEN', 'DwA', 'trzecie'];
const newPasswords = [];

//wyrzucone poza obręb showMessage aby nie wykonywało się z każdym inputem
passwords.forEach((element, index) => {
    newPasswords[index] = element.toUpperCase();
    // console.log(newPasswords[index]);
})

const showMessage = (event) => {
    const tekst = event.target.value;
    const changed = tekst.toUpperCase();

    newPasswords.forEach(function (element, index) {
        if (element == changed) {
            div.textContent = messages[index];
        }
    })
}

input.addEventListener('input', showMessage)
