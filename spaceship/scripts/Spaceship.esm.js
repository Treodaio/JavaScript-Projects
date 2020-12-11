import { Missile } from './Missile.esm.js';

export class Spaceship {
    #modifier = 10;
    #leftArrow = false;
    #rightArrow = false;

    click = null;
    keyUp = null;
    keyDown = null;
    keyAnimationFrame = null;
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

    #setEventListeners() {
        const that = this;

        document.addEventListener('keydown', function keyDownListener(event) {
            switch (event.key) {
                case "a":
                case "ArrowLeft": {
                    that.#leftArrow = true;
                    break;
                }

                case "d":
                case "ArrowRight": {
                    that.#rightArrow = true;
                    break;
                }
            }
            that.keyDown = keyDownListener;
        }, false);

        document.addEventListener('keyup', function keyUpListener(event) {
            switch (event.key) {
                case "a":
                case "ArrowLeft": {
                    that.#leftArrow = false;
                    break;
                }
                case "d":
                case "ArrowRight": {
                    that.#rightArrow = false;
                    break;
                }
                case "Enter": {
                    that.#shot();
                    break;
                }
            }
            that.keyUp = keyUpListener;
        }, false);

        document.addEventListener('click', function clickListener() {
            that.#shot();
            that.click = clickListener;
        }, false);


    }

    #gameLoop = () => {
        this.#whatKey();
        this.keyAnimationFrame = requestAnimationFrame(this.#gameLoop);
    }

    #whatKey() {
        console.log('poruszam sied');

        if (this.#leftArrow && this.#getPosition() > 0) {
            this.element.style.left = `${parseInt(this.element.style.left, 10) - this.#modifier}px`;
        }

        if (this.#rightArrow && this.#getPosition() < (window.innerWidth - 12)) {
            this.element.style.left = `${parseInt(this.element.style.left, 10) + this.#modifier
                }px`;
        }
    }

    #shot() {
        console.log('strzelam');

        const missile = new Missile(this.#getPosition(), this.element.offsetTop, this.container);
        missile.init();
        this.missiles.push(missile);
    }


}



// searchList = this.specificTable.filter((item) => item.name.toLowerCase().includes('one'));
// console.log(searchList);

// if (!searchList) {
//     this.specificTable.push(fun);
// }




    // keyDownListener(event) {
    //     switch (event.key) {
    //         case "a":
    //         case "ArrowLeft": {
    //             this.#leftArrow = true;
    //             break;
    //         }

    //         case "d":
    //         case "ArrowRight": {
    //             this.#rightArrow = true;
    //             break;
    //         }
    //     }
    // }


    // keyUpListener(event) {
    //     switch (event.key) {
    //         case "a":
    //         case "ArrowLeft": {
    //             this.#leftArrow = false;
    //             break;
    //         }
    //         case "d":
    //         case "ArrowRight": {
    //             this.#rightArrow = false;
    //             break;
    //         }
    //         case "Enter": {
    //             this.#shot();
    //             break;
    //         }
    //     }
    // }

    // clickListener() {
    //     this.#shot();
    // }
