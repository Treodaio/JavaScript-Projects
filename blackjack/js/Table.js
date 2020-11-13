
export class Table {
    constructor(dealersCards, playersCards) {
        this.playersCards = playersCards;
        this.dealersCards = dealersCards;
    }
    showPlayersCard(card) {
        this.playersCards.appendChild(card);
    }

    showDealersCard(card) {
        this.dealersCards.appendChild(card);
    }
}