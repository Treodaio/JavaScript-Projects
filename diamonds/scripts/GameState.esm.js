// STAN GRY

import { Diamond } from './Diamonds.esm.js';
import { DIAMONDS_ARRAY_WIDTH, game } from './Game.esm.js';

export class GameState {
    constructor(level, leftMovement, pointsToWin, diamonds, diamondsSpriteImage) {
        let _leftMovement = leftMovement;
        let _playerScores = 0;
        let _isSwaping = false;
        let _isMoving = false;

        // map table with destructuring first parameter
        let _gameBoard = diamonds.map(({ x, y, row, column, kind }) => new Diamond(x, y, row, column, kind, diamondsSpriteImage));

        this._level = level;
        this._pointsToWin = pointsToWin;

        this.getLeftMovement = () => _leftMovement;
        this.getPlayerPoints = () => _playerScores;
        this.getGameBoard = () => _gameBoard;
        this.getIsSwaping = () => _isSwaping;
        this.getIsMoving = () => _isMoving;


        this.setIsSwaping = value => _isSwaping = value;
        this.setIsMoving = value => _isMoving = value;

        this.increasePointsMovement = () => _leftMovement++;
        this.increasePlayerPoints = points => _playerScores += points;
        this.decreasePointsMovement = () => _leftMovement--;
        this.isPlayerWinner = () => _playerScores >= this._pointsToWin;

    }

    get level() {
        return this._level;
    }

    get pointsToWin() {
        return this._pointsToWin;
    }

    mixDiamonds() {
        const mixedDiamonds = _gameBoard.splice(0, DIAMONDS_ARRAY_WIDTH);
        let index = DIAMONDS_ARRAY_WIDTH;

        while (_gameBoard.length) {
            const randomNumber = Math.floor(Math.random() * _gameBoard.length);
            const nextElementToMix = _gameBoard.splice(randomNumber, 1)[0];
            const element = {
                ...nextElementToMix,
                row: index % DIAMONDS_ARRAY_WIDTH,
                column: Math.floor(index / DIAMONDS_ARRAY_WIDTH),
            };
            index++;
            mixedDiamonds.push(element);
        }
        _gameBoard.push(...mixedDiamonds);
    }
}