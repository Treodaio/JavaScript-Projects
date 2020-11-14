
import { Deck } from './Deck.js';
import { Player } from './Player.js';
import { Table } from './Table.js';
import { Message } from './Message.js';


class Game {
    constructor(
        { player, table, hitButton, standButton, dealerPoints, playerPoints, messageBox }
    ) {
        this.player = player;
        this.table = table;
        this.hitButton = hitButton;
        this.standButton = standButton;
        this.dealerPoints = dealerPoints;
        this.playerPoints = playerPoints;
        this.messageBox = messageBox;

        this.dealer = new Player('Krupier');
        this.deck = new Deck();
        this.deck.shuffle();

    }
    run() {
        this.dealCards();
        this.hitButton.addEventListener('click', (event) => this.hitCard())
        this.standButton.addEventListener('click', (event) => this.dealerPlays())
    }

    hitCard() {
        const card = this.deck.pickOne();
        this.player.hand.addCard(card);
        this.table.showPlayersCard(card);
        this.playerPoints.innerHTML = this.player.calculatePoints();
    }

    dealCards() {
        for (let n = 0; n < 2; n++) {
            let cardOne = this.deck.pickOne();
            this.player.hand.addCard(cardOne);
            this.table.showPlayersCard(cardOne);

            let cardTwo = this.deck.pickOne();
            this.dealer.hand.addCard(cardTwo);
            this.table.showDealersCard(cardTwo);
        }

        this.playerPoints.innerHTML = this.player.calculatePoints();
        this.dealerPoints.innerHTML = this.dealer.calculatePoints();
    }
    dealerPlays() {
        while (this.dealer.points <= this.player.points && this.dealer.points <= 21 && this.player.points <= 21) {
            const card = this.deck.pickOne()
            this.dealer.hand.addCard(card);
            this.table.showDealersCard(card);
            this.dealerPoints.innerHTML = this.dealer.calculatePoints();
        }
        this.#endGame();
    }

    #endGame() {
        this.hitButton.removeEventListener('click', (event) => this.hitCard());
        this.standButton.removeEventListener('click', (event) => this.dealerPlays());

        this.hitButton.style.display = 'none';
        this.standButton.style.display = 'none';

        if (this.player.points < 21 && this.player.points == this.dealer.points) {
            this.messageBox.setText('Remis').show();
            return;
        }

        if (this.player.points > 21) {
            this.messageBox.setText('Wygrywa dealer').show();
            return;
        }

        if (this.dealer.points > 21) {
            this.messageBox.setText(`Wygrywa ${this.player.name} !`).show();
            return;
        }

        if (this.player.points < this.dealer.points) {
            this.messageBox.setText('Wygrywa dealer').show();
            return;
        }

    }

}
const player = new Player('Slawek');

const table = new Table(
    document.getElementById('dealersCards'),
    document.getElementById('playersCards')
);

const messageBox = new Message(document.getElementById('message'));

const game = new Game({
    player,
    table,
    hitButton: document.getElementById('hit'),
    standButton: document.getElementById('stand'),
    dealerPoints: document.getElementById('dealerPoints'),
    playerPoints: document.getElementById('playerPoints'),
    messageBox,
});
game.run();