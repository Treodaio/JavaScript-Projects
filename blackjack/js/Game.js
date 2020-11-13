// import { Card } from './Card.js';
import { Deck } from './Deck.js';
import { Player } from './Player.js';
import { Table } from './Table.js';


class Game {
    constructor(
        { player, table }
    ) {
        this.player = player;
        this.dealer = new Player('Krupier');
        this.deck = new Deck();
        this.deck.shuffle();
        this.table = table;
    }
    run() {
        this.dealCards();
    }

    dealCards() {
        for (let n = 0; n < 2; n++) {
            let cardOne = this.deck.pickOne();
            this.player.hand.addCard(cardOne);
            this.table.showPlayersCard(cardOne.render());


            let cardTwo = this.deck.pickOne();
            this.dealer.hand.addCard(cardTwo);
            this.table.showDealersCard(cardTwo.render());
        }
    }

}
const table = new Table(
    document.getElementById('dealersCards'),
    document.getElementById('playersCards')
);

const player = new Player('Slawek');
const game = new Game(
    { player, table }
);
game.run();