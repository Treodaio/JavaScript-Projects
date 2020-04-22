const input = document.querySelector('input');
const passwords = ['JedEn', 'DWa'];
const messages = ['super', 'działa'];

const showMessage = (e) => {

    passwords.forEach((item, i) => {
        if (item.toUpperCase() === e.target.value.toUpperCase())
            document.querySelector('.message').textContent = messages[i];
    })

}

input.addEventListener('input', showMessage);



