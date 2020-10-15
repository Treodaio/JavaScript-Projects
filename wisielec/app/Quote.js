export class Quote {
    constructor(slowo) {
        this.slowo = slowo;
        this.guessed = [];
    }

    getContent() {
        let content = '';
        // pętla for of
        for (const char of this.slowo) {
            if (char === ' ' || this.guessed.includes(char)) {
                content += char;
            } else {
                content += '_';
            }
        }
        return content;
    }




    zgadywanie(letter) {
        if (!this.slowo.includes(letter)) return false;
        else {
            this.guessed.push(letter);
            return true;
        }
    }
}