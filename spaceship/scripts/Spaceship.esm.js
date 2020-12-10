import { Missile } from './Missile.esm.js';

export class Spaceship {
    #modifier = 10;
    #leftArrow = false;
    #rightArrow = false;

    #keyDownListener = null;
    #keyUpListener = null;
    #clickListener = null;

    missiles = [];
    constructor(element, container) {
        this.element = element;
        this.container = container;
    }

    init() {
        this.setPosition();
        this.#setEventListeners();
        this.#gameLoop();
    }

    setPosition() {
        this.element.style.bottom = '10px';
        this.element.style.left = `${window.innerWidth / 2 - this.#getPosition()}px`;
    }

    #getPosition() {
        return this.element.offsetLeft + this.element.offsetWidth / 2;
    }
    // between px word cant be space. is's css injection 
    #setEventListeners() {
        this.#keyDownListener = document.addEventListener('keydown', ({ key }) => {

            switch (key) {
                case "a":
                case "ArrowLeft": {
                    this.#leftArrow = true;
                    break;
                }

                case "d":
                case "ArrowRight": {
                    this.#rightArrow = true;
                    break;
                }
            }

        })

        this.#keyUpListener = document.addEventListener('keyup', ({ key }) => {
            switch (key) {
                case "a":
                case "ArrowLeft": {
                    this.#leftArrow = false;
                    break;
                }
                case "d":
                case "ArrowRight": {
                    this.#rightArrow = false;
                    break;
                }
                case "Enter": {
                    this.#shot();
                    break;
                }
            }
        })

        this.#clickListener = document.addEventListener('click', () => {
            this.#shot();
        })

    }

    #gameLoop = () => {
        this.#whatKey();
        requestAnimationFrame(this.#gameLoop);
    }

    #whatKey() {
        if (this.#leftArrow && this.#getPosition() > 0) {
            this.element.style.left = `${parseInt(this.element.style.left, 10) - this.#modifier}px`;
        }

        if (this.#rightArrow && this.#getPosition() < (window.innerWidth - 12)) {
            this.element.style.left = `${parseInt(this.element.style.left, 10) + this.#modifier
                }px`;
        }
    }

    #shot() {
        const missile = new Missile(this.#getPosition(), this.element.offsetTop, this.container);
        missile.init();
        this.missiles.push(missile);
    }

    removeEventListener() {
        document.removeEventListener('keydown', this.#keyDownListener());
        document.removeEventListener('keyup', this.#keyUpListener());
        document.removeEventListener('click', this.#clickListener());
    }

}