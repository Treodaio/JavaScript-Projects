
export class Hand {
    constructor() {
        this.cards = [];
    }
    addCard(card) {
        this.cards.push(card);
    }

    countCardsByWeights(weight) {
        return this.cards.filter(card => card.weight == weight).length;
    }

    getStrength() {
        if (this.countCardsByWeights('A') == 2 && this.cards.length == 2) {
            return 21;
        }

        const cards = this.cards.map(card => {
            if (['K', 'Q', 'J'].includes(card.weight)) {
                return 10;
            }

            if (this.cards.length == 2 && card.weight == 'A') {
                return 11;
            }
            if (this.cards.length > 2 && card.weight == 'A') {
                return 1;
            }
            return parseInt(card.weight);
        })

        // w tym zastosowaniu reduce sumuje wartość wszystkich tych kart.
        return cards.reduce(function (sum, weight) {
            return parseInt(sum) + parseInt(weight);
        })
    }

}