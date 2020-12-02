import { Common, VISIBLE_SCREEN } from './Common.esm.js';
import {
    EMPTY_BLOCK,
    gameLevels,
    GAME_BOARD_X_OFFSET,
    GAME_BOARD_Y_OFFSET
} from './gameLevels.esm.js';

import { DATALOADED_EVENT_NAME } from './Loading.esm.js';
import { canvas } from './Canvas.esm.js';
import { media } from './Media.esm.js';
import { GameState } from './GameState.esm.js';
import { mouseController } from './MouseController.esm.js';
import { DIAMOND_SIZE, NUMBER_OF_DIAMONDS_TYPES } from './Diamonds.esm.js';
import { resultScreen } from './ResultScreen.esm.js';
import { userData } from './UserData.esm.js';

const DIAMONDS_ARRAY_WIDTH = 8;
const DIAMONDS_ARRAY_HEIGHT = DIAMONDS_ARRAY_WIDTH + 1 // with invisible first line
const LAST_ELEMENT_DIAMONDS_ARRAY = DIAMONDS_ARRAY_WIDTH * DIAMONDS_ARRAY_HEIGHT - 1;
const SWAPING_SPEED = 8;
const TRANSPARENCY_SPEED = 10;

class Game extends Common {
    constructor() {
        super();
    }

    playLevel(level) {
        const { numberOfMovements, pointsToWin, board } = gameLevels[level - 1];
        window.removeEventListener(DATALOADED_EVENT_NAME, this.playLevel);
        this.gameState = new GameState(level, numberOfMovements, pointsToWin, board, media.diamondsSprite);
        this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);
        this.animate();
    }

    animate() {
        this.handleMouseState();
        this.handleMouseClick();
        this.findMatches();
        this.moveDiamonds();
        this.hideAnimation()
        this.countScores();
        this.revertSwap();
        this.clearMatched();
        canvas.drawGameOnCanvas(this.gameState);
        this.gameState.getGameBoard().forEach(diamond => diamond.draw());
        this.checkEndOfGame();
    }

    handleMouseState() {
        const isSwaping = !this.gameState.getIsSwaping();
        const isMoving = !this.gameState.getIsMoving();

        if (mouseController.clicked && isSwaping && isMoving) {
            mouseController.state++;
        }
    }

    handleMouseClick() {
        if (!mouseController.clicked) {
            return;
        }

        const xClicked = Math.floor((mouseController.x - GAME_BOARD_X_OFFSET) / DIAMOND_SIZE);
        const yClicked = Math.floor((mouseController.y - GAME_BOARD_Y_OFFSET) / DIAMOND_SIZE);

        // we click on diamond ? 
        if (xClicked >= DIAMONDS_ARRAY_WIDTH || yClicked >= DIAMONDS_ARRAY_HEIGHT || xClicked < 0 || !yClicked) {
            mouseController.state = 0;
            return;
        }

        if (mouseController.state === 1) {
            mouseController.firstClick = {
                x: xClicked,
                y: yClicked,
            }
        } else if (mouseController.state === 2) {
            mouseController.secondClick = {
                x: xClicked,
                y: yClicked,
            }

            mouseController.state = 0;

            if (
                Math.abs(mouseController.firstClick.x - mouseController.secondClick.x) +
                Math.abs(mouseController.firstClick.y - mouseController.secondClick.y) !==
                1
            ) {
                return;
            }

            this.swapDiamonds();
            this.gameState.setIsSwaping(true);
            this.gameState.decreasePointsMovement();
            mouseController.state = 0;
        }
        mouseController.clicked = false;
    }



    findMatches() {
        this.gameState.getGameBoard().forEach((diamond, index, diamonds) => {
            if (diamond.kind === EMPTY_BLOCK || index < DIAMONDS_ARRAY_WIDTH || index === LAST_ELEMENT_DIAMONDS_ARRAY) {
                return;
            }

            if (
                diamonds[index - 1].kind === diamond.kind
                && diamonds[index + 1].kind === diamond.kind
            ) {

                if (Math.floor((index - 1) / DIAMONDS_ARRAY_WIDTH) === Math.floor((index + 1) / DIAMONDS_ARRAY_WIDTH)) {
                    for (let i = -1; i <= 1; i++) {
                        diamonds[index + i].match++;
                    }
                }
            }

            if (
                index >= DIAMONDS_ARRAY_WIDTH
                && index < LAST_ELEMENT_DIAMONDS_ARRAY - DIAMONDS_ARRAY_WIDTH + 1
                && diamonds[index - DIAMONDS_ARRAY_WIDTH].kind === diamond.kind
                && diamonds[index + DIAMONDS_ARRAY_WIDTH].kind === diamond.kind
            ) {
                if ((index - DIAMONDS_ARRAY_WIDTH) % DIAMONDS_ARRAY_WIDTH === (index + DIAMONDS_ARRAY_WIDTH) % DIAMONDS_ARRAY_WIDTH) {
                    // in this place - is necessary
                    for (let i = -DIAMONDS_ARRAY_WIDTH; i <= DIAMONDS_ARRAY_WIDTH; i += DIAMONDS_ARRAY_WIDTH) {
                        diamonds[index + i].match++;
                    }
                }
            }
        });
    }



    moveDiamonds() {
        this.gameState.setIsMoving(false);
        this.gameState.getGameBoard().forEach(diamond => {
            let dx;
            let dy;

            for (let speedSwap = 0; speedSwap < SWAPING_SPEED; speedSwap++) {
                dx = diamond.x - diamond.row * DIAMOND_SIZE;
                dy = diamond.y - diamond.column * DIAMOND_SIZE;
                if (dx) {
                    diamond.x -= dx / Math.abs(dx);
                }
                if (dy) {
                    diamond.y -= dy / Math.abs(dy);
                }
            }

            if (dx || dy) {
                this.gameState.setIsMoving(true);
            }
        });
    }

    hideAnimation() {
        if (this.gameState.getIsMoving()) { return; }
        this.gameState.getGameBoard().forEach(diamond => {
            if (diamond.match && diamond.alpha > 10) {
                diamond.alpha -= TRANSPARENCY_SPEED;
                this.gameState.setIsMoving(true);
            }
        })
    }

    countScores() {
        this.scores = 0;
        this.gameState.getGameBoard().forEach(diamond => this.scores += diamond.match);

        if (!this.gameState.getIsMoving() && this.scores) {
            this.gameState.increasePlayerPoints(this.scores);
        }
    }



    swapDiamonds() {
        const firstDiamond = mouseController.firstClick.y * DIAMONDS_ARRAY_WIDTH + mouseController.firstClick.x;
        const secondDiamond = mouseController.secondClick.y * DIAMONDS_ARRAY_WIDTH + mouseController.secondClick.x;

        this.swap(this.gameState.getGameBoard()[firstDiamond], this.gameState.getGameBoard()[secondDiamond]);
    }
    // mouseController.firstClick.y * DIAMONDS_ARRAY_WIDTH; - we reach a specific row - first row - 8 diamond,  second row - 16 diamond etc..



    revertSwap() {
        if (this.gameState.getIsSwaping() && !this.gameState.getIsMoving()) {

            if (!this.scores) {
                this.swapDiamonds();
                this.gameState.increasePointsMovement();
            }
            // no points.
            this.gameState.setIsSwaping(false);
        }
    }

    clearMatched() {
        if (this.gameState.getIsMoving()) {
            return;
        }

        // now table is checked from bottom to top.
        this.gameState.getGameBoard().forEach((_, idx, diamonds) => {
            const index = diamonds.length - 1 - idx;
            const column = Math.floor(index / DIAMONDS_ARRAY_WIDTH);
            const row = Math.floor(index % DIAMONDS_ARRAY_WIDTH);

            // zrzucanie diamentów w dół.
            if (diamonds[index].match) {
                for (let counter = column; counter >= 0; counter--) {
                    // checking for match in specific place

                    // if is correct when math is equal to zero
                    if (!diamonds[counter * DIAMONDS_ARRAY_WIDTH + row].match) {
                        this.swap(diamonds[counter * DIAMONDS_ARRAY_WIDTH + row], diamonds[index]);
                        break;
                    }
                }
            }
        });

        // wymiana wyrzuconych klocków na nowe.
        this.gameState.getGameBoard().forEach((diamond, index) => {
            const row = Math.floor(index % DIAMONDS_ARRAY_WIDTH) * DIAMOND_SIZE;

            if (index < DIAMONDS_ARRAY_WIDTH) {
                diamond.kind = EMPTY_BLOCK;
                diamond.match = 0;
            } else if (diamond.match || diamond.kind === EMPTY_BLOCK) {
                diamond.kind = Math.floor(Math.random() * NUMBER_OF_DIAMONDS_TYPES);
                diamond.y = 0;
                diamond.x = row;
                diamond.match = 0;
                diamond.alpha = 255;
            }

        });
    }

    checkEndOfGame() {
        if (!this.gameState.getLeftMovement() && !this.gameState.getIsMoving() && !this.gameState.getIsSwaping()) {
            const isPlayerWinner = this.gameState.isPlayerWinner();
            const currentLevel = Number(this.gameState.level);

            if (isPlayerWinner && gameLevels[currentLevel]) {
                if (!userData.checkAvailabilityLevel(currentLevel + 1)) {
                    userData.addNewLevel(currentLevel + 1);
                }
            }

            if (userData.getHighScores(currentLevel) < this.gameState.getPlayerPoints()) {
                userData.setHighScore(currentLevel, this.gameState.getPlayerPoints());
            }

            resultScreen.viewResultScreen(isPlayerWinner, this.gameState.getPlayerPoints(), currentLevel);
        } else {
            this.animationFrame = window.requestAnimationFrame(() => this.animate());
        }
    }

    // it's reference. We change the original table
    swap(firstDiamond, secondDiamond) {
        [
            firstDiamond.kind,
            firstDiamond.alpha,
            firstDiamond.match,
            firstDiamond.x,
            firstDiamond.y,

            secondDiamond.kind,
            secondDiamond.alpha,
            secondDiamond.match,
            secondDiamond.x,
            secondDiamond.y,
        ] = [
                secondDiamond.kind,
                secondDiamond.alpha,
                secondDiamond.match,
                secondDiamond.x,
                secondDiamond.y,

                firstDiamond.kind,
                firstDiamond.alpha,
                firstDiamond.match,
                firstDiamond.x,
                firstDiamond.y,
            ];
        // Pause game until the diamonds change places
        this.gameState.setIsMoving(true);
    }
}

export const game = new Game();







 // comm1 ---> checking if diamonds are not adjacent to each other on the x or y axis