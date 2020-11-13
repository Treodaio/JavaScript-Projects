import { Card, Types, Weights } from './Card.js';

export class Deck {
    cards = [];
    constructor() {
        Types.forEach(type => {
            Weights.forEach(weight => {
                this.cards.push(new Card(weight, type))
            })
        })
    }
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const newPlace = Math.floor(Math.random() * i);
            const temp = this.cards[i];
            this.cards[i] = this.cards[newPlace];
            this.cards[newPlace] = temp;
        }

        return this.cards;
    }

    pickOne() {
        return this.cards.pop();
    }
}
