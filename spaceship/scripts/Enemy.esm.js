export class Enemy {
    constructor(container, speed, enemyType, explosionClass, lives = 1) {
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

    hit() {
        this.lives--;
        if (!this.lives) {
            this.explode();
        }
    }

    explode() {
        this.element.classList.remove(this.enemyType);
        this.element.classList.add(this.explosionClass);
        clearInterval(this.positionInterval);

        const animationTime = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue('--explosions-animation-time'), 10);

        setTimeout(() => {
            this.element.remove();
        }, animationTime);
    }
}