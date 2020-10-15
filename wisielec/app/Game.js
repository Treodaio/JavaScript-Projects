import {
    Quote
} from './Quote.js';


class Game {

    currentStep = 0;
    lastStep = 7;

    quotes = [{
        text: 'chrzescijanstwo po prostu',
        category: 'Rozwój duchowy',
    }, {
        text: 'maciej aniserowicz',
        category: 'Książka programistyczna: ',
    }, {
        text: 'dna zywienia',
        category: 'Rozwój dietetyczny',
    }];



    constructor({
        lettersWrapper, //literki na dole
        categoryWrapper, //podpowiedz
        wordWrapper, //odgadywane słowo
        outputWrapper,
    }) {

        this.lettersWrapper = lettersWrapper;
        this.categoryWrapper = categoryWrapper;
        this.wordWrapper = wordWrapper;
        this.outputWrapper = outputWrapper;

        const {
            category,
            text
        } = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        this.categoryWrapper.innerHTML = category;

        //przesłanie wylosowanego tekstu z tablicy do nowego obiektu quotes. quotes został wcześniej zaimportowany.
        this.quote = new Quote(text);

    } // koniec konstruktora

    guess(letter, event) {
        event.target.disabled = true;
        if (this.quote.zgadywanie(letter)) {
            this.drawQuote();

            event.target.style.backgroundColor = "green";
            event.target.style.color = "white";
        } else {
            this.currentStep++;
            document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
            event.target.style.backgroundColor = "green";
            event.target.style.color = "white";
            if (this.currentStep == this.lastStep) {
                this.loosing()
            }
        }

    }

    drawLetters() {
        for (let i = 0; i < 26; i++) {
            const label = (i + 10).toString(36);
            const button = document.createElement('button');
            button.innerHTML = label;
            button.addEventListener('click', (event) => {
                this.guess(label, event);
            })

            this.lettersWrapper.appendChild(button);
        }
    }


    drawQuote() {
        const content = this.quote.getContent();
        this.wordWrapper.innerHTML = content;
        if (!content.includes('_')) {
            this.winning();
        }
    }

    start() {

        this.drawLetters();
        //korzystam z metody klasy quote
        this.drawQuote();
        document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;

    }

    winning() {
        this.wordWrapper.innerHTML = 'Gratulacje wygrana!';
        this.lettersWrapper = "";

    }

    loosing() {
        this.wordWrapper.innerHTML = 'Przegrana. Koniec gry!!';
        this.lettersWrapper = "";
    }

}



const game = new Game({
    lettersWrapper: document.getElementById('letters'),
    categoryWrapper: document.getElementById('category'),
    wordWrapper: document.getElementById('word'),
    outputWrapper: document.getElementById('output'),
});
game.start();