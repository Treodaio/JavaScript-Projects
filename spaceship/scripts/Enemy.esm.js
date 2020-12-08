export class Enemy {
    constructor(container, speed, enemyType, explosionClass, lives = 1) {
        // debugger;
        this.container = container;
        this.element = document.createElement('div');
        this.enemyType = enemyType;
        this.positionInterval = null;
        this.speed = speed;
        this.explosionClass = explosionClass;
        this.lives = lives;
        this.init();
    }

    init() {
        this.#setEnemy();
        this.#updatePosition();
    }

    #setEnemy() {
        this.element.classList.add(this.enemyType);
        this.container.appendChild(this.element);
        this.element.style.top = '0px';
        this.element.style.left = `${this.#randomPosition()}px`;
    }

    #updatePosition() {
        this.positionInterval = setInterval(() => this.#setNewPosition(), this.speed);
    }

    #setNewPosition() {
        this.element.style.top = `${this.element.offsetTop + 1}px`;
    }

    #randomPosition() {
        return Math.floor(Math.random() * (window.innerWidth - this.element.offsetWidth));
    }

    remove() {
        clearInterval(this.positionInterval);
        this.element.remove();
    }
}