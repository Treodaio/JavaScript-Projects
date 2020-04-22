const input = document.querySelector('input');
const passwords = ['JedEn', 'DWa', 'monia'];
const messages = ['super', 'działa', 'Wysyłanie buziaczka :*'];
const div = document.querySelector('.message');
const lowerCasePasswords = passwords.map(password => password.toLowerCase());

const showMessage = (e) => {
    const textInput = e.target.value.toLowerCase();
    for (let i = 0; i < lowerCasePasswords.length; i++) {
        if (textInput === lowerCasePasswords[i]) {
            div.innerHTML = messages[i];
        }
    }

}

input.addEventListener('input', showMessage);



