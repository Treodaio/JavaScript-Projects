import { Spaceship } from './Spaceship.esm.js';
import { Enemy } from './Enemy.esm.js';
class Game {
    #htmlElements = {
        spaceship: document.querySelector('[data-spaceship]'),
        container: document.querySelector('[data-container]'),
    }

    #ship = new Spaceship(this.#htmlElements.spaceship, this.#htmlElements.container);
    #enemies = [];
    #enemySpeed = null;

    #checkPositionInterval = null;
    #createEnemyInterval = null;
    #checkEnemyPositionInterval = null;

    init() {
        this.#ship.init();
        this.#newGame();
    }
    // how interval can be replace? It's not best solution from optimize wiev;
    // clear intervals at end of game.
    #newGame() {
        this.#checkPositionInterval = setInterval(() => this.#checkPosition(), 1);
        this.#createEnemyInterval = setInterval(() => this.#generateEnemyType(), 1000);
        this.#enemySpeed = 50;
    }

    #generateEnemyType() {
        const randomNumber = Math.floor(Math.random() * 5) + 1;
        randomNumber % 5 ? this.#createNewEnemy(this.#htmlElements.container, this.#enemySpeed, 'enemy', 'explosion') :
            this.#createNewEnemy(this.#htmlElements.container, this.#enemySpeed * 2, 'enemy--big', 'explosion-big', 3);
    }
    // can be improved
    #checkPosition() {
        this.#enemies.forEach((enemy, enemyIndex, enemiesArray) => {
            const enemyPosition = {
                // !!!  top is not a offset top
                top: enemy.element.offsetTop,
                left: enemy.element.offsetLeft,
                bottom: enemy.element.offsetTop + enemy.element.offsetHeight,
                right: enemy.element.offsetLeft + enemy.element.offsetWidth,
            }

            if (enemyPosition.top > window.innerHeight) {
                enemy.remove();
                enemiesArray.splice(enemyIndex, 1);
            }

            this.#ship.missiles.forEach((missile, missileIndex, missileArray) => {
                const missilePosition = {
                    top: missile.element.offsetTop,
                    left: missile.element.offsetLeft,
                    bottom: missile.element.offsetTop + missile.element.offsetHeight,
                    right: missile.element.offsetLeft + missile.element.offsetWidth,
                }

                if (missilePosition.bottom >= enemyPosition.top && missilePosition.top <= enemyPosition.bottom) {
                    // check if the edges of the missile and enemy ship's touched.
                }

                if (missilePosition.bottom < 0) {
                    missile.remove();
                    missileArray.splice(missileIndex, 1);
                }

            });
        });


    }


    #createNewEnemy(...params) {
        // debugger;
        const enemy = new Enemy(...params);
        this.#enemies.push(enemy);
    }



}



window.onload = function () {
    const game = new Game();
    game.init();
}