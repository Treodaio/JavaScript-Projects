import { Spaceship } from './Spaceship.esm.js';
import { Enemy } from './Enemy.esm.js';
class Game {
    #htmlElements = {
        spaceship: document.querySelector('[data-spaceship]'),
        container: document.querySelector('[data-container]'),
        score: document.querySelector('[data-score]'),
        lives: document.querySelector('[data-lives]'),
        modal: document.querySelector('[data-modal]'),
        scoreInfo: document.querySelector('[data-scoreInfo]'),
        endButton: document.querySelector('[data-endButton]'),
    }

    #ship = new Spaceship(this.#htmlElements.spaceship, this.#htmlElements.container);
    #enemies = [];
    #enemySpeed = null;
    #lives = 0;
    #score = 0;

    #checkPositionInterval = null;
    #createEnemyInterval = null;

    // how interval can be replace? It's not best solution from optimize wiev;
    // clear intervals at end of game.
    newGame() {
        this.#ship.init();
        this.#htmlElements.endButton.addEventListener('click', () => { this.newGame(); })

        if (!this.#htmlElements.modal.classList.contains('hide')) {
            this.#htmlElements.modal.classList.add('hide');
        }
        this.#checkPositionInterval = setInterval(() => this.#checkPosition(), 1);
        this.#createEnemyInterval = setInterval(() => this.#generateEnemyType(), 1000);

        this.#enemySpeed = 5;
        if (this.#lives !== 3) { this.#lives = 3; }
        if (this.#score) { this.#score = 0; }

        this.#updateScoreText();
        this.#updateLivesText();
        this.#ship.setPosition();
    }

    #generateEnemyType() {
        const randomNumber = Math.floor(Math.random() * 5) + 1;
        randomNumber % 5 ? this.#createNewEnemy(this.#htmlElements.container, this.#enemySpeed, 'enemy', 'explosion') :
            this.#createNewEnemy(this.#htmlElements.container, this.#enemySpeed * 2, 'enemy--big', 'explosion--big', 3);
    }
    // can be improved
    #checkPosition() {
        this.#enemies.forEach((enemy, enemyIndex) => {
            const enemyPosition = {
                // !!!  top is not a offset top
                top: enemy.element.offsetTop,
                left: enemy.element.offsetLeft,
                bottom: enemy.element.offsetTop + enemy.element.offsetHeight,
                right: enemy.element.offsetLeft + enemy.element.offsetWidth,
            }

            if (enemyPosition.top > window.innerHeight) {
                enemy.explode();
                this.#enemies.splice(enemyIndex, 1);
                this.#updateLives();
            }

            this.#ship.missiles.forEach((missile, missileIndex, missileArray) => {
                const missilePosition = {
                    top: missile.element.offsetTop,
                    left: missile.element.offsetLeft,
                    bottom: missile.element.offsetTop + missile.element.offsetHeight,
                    right: missile.element.offsetLeft + missile.element.offsetWidth,
                }

                if (missilePosition.bottom >= enemyPosition.top
                    && missilePosition.top <= enemyPosition.bottom
                    && missilePosition.right >= enemyPosition.left
                    && missilePosition.left <= enemyPosition.right
                ) {
                    enemy.hit();
                    if (!enemy.lives) {
                        this.#enemies.splice(enemyIndex, 1);
                    }
                    missile.remove();
                    missileArray.splice(missileIndex, 1);
                    this.#updateScore();
                }

                if (missilePosition.bottom < 0) {
                    missile.remove();
                    missileArray.splice(missileIndex, 1);
                }
            });
        });
    }

    #createNewEnemy(...params) {
        const enemy = new Enemy(...params);
        this.#enemies.push(enemy);
    }

    #updateScore() {
        this.#score++;
        if (!(this.#score % 5)) { this.#createEnemyInterval--; }
        this.#updateScoreText();
    }

    #updateLives() {
        this.#lives--;
        this.#updateLivesText();
        this.#htmlElements.container.classList.add('hit');
        setTimeout(() => { this.#htmlElements.container.classList.remove('hit') }, 100);
        if (!this.#lives) {
            this.#endGame();
        }
    }

    #updateScoreText() {
        this.#htmlElements.score.textContent = `Score: ${this.#score}`;
    }

    #updateLivesText() {
        this.#htmlElements.lives.textContent = `Lives: ${this.#lives}`
    }
    // check if any timers are active;
    #endGame() {
        this.#htmlElements.modal.classList.remove('hide');
        this.#htmlElements.scoreInfo.textContent = `End game! You're score: ${this.#score}`;

        this.#enemies.forEach(enemy => enemy.explode());
        this.#enemies.length = 0;

        clearInterval(this.#createEnemyInterval);
        clearInterval(this.#checkPositionInterval);

        this.#ship.missiles.forEach(missile => missile.remove());
        this.#ship.missiles.length = 0;

        document.removeEventListener('keydown', this.#ship.keyDown);
        document.removeEventListener('keyup', this.#ship.keyUp);
        document.removeEventListener('click', this.#ship.click);

        window.cancelAnimationFrame(this.#ship.keyAnimationFrame);
    }
}



window.onload = function () {
    const game = new Game();
    game.newGame();
}

