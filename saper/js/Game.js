
import { Cell } from './Cell.js';
import { UI } from './UI.js';
import { Counter } from './Counter.js';
import { Timer } from './Timer.js';
import { resetButton } from './resetButton.js';
import { Modal } from './Modal.js';

class Game extends UI {
    #config = {
        easy: {
            rows: 8,
            cols: 8,
            mines: 10,
        },
        normal: {
            rows: 16,
            cols: 16,
            mines: 40,
        },
        expert: {
            rows: 16,
            cols: 30,
            mines: 99,
        }

    }

    //dane potrzebne do funkcjonowania programu
    #numberOfRows = null;
    #numberOfCols = null;
    #numberOfMines = null;

    #cells = [];

    #cellsElements = null;
    #board = null;

    #cellsToReveal = 0;
    #revealedCells = 0;


    #counterObject = new Counter();
    #timerObject = new Timer();
    #modalObject = new Modal();

    #isGameFinished = false;


    #buttons = {
        easy: null,
        medium: null,
        expert: null,
        reset: new resetButton(),
        modal: null,
    }


    initializeGame() {
        this.#handleElements();
        this.#counterObject.init();
        this.#timerObject.init();
        this.#addButtonsEventListeners();
        this.#newGame();
    }




    //
    #setStyles() {
        document.documentElement.style.setProperty('--cells-in-row', this.#numberOfCols);
    }


    #newGame(
        rows = this.#config.easy.rows,
        cols = this.#config.easy.cols,
        mines = this.#config.easy.mines,

    ) {
        this.#numberOfRows = rows;
        this.#numberOfCols = cols;
        this.#numberOfMines = mines;

        this.#isGameFinished = false;
        this.#revealedCells = 0;

        this.#counterObject.setValue(this.#numberOfMines);
        this.#timerObject.resetTimer();

        this.#cellsToReveal = this.#numberOfCols * this.#numberOfRows - this.#numberOfMines;

        this.#setStyles();
        this.#generateCells();
        this.#renderBoard();
        this.#placeMinesInCells();

        this.#cellsElements = this.getElements(this.UiSelectors.cell);
        this.#addCellsEventListeners();
        this.#buttons.reset.changeEmotion('neutral');
    }


    #endGame(isWin) {
        this.#isGameFinished = true;
        this.#timerObject.stopTimer();
        this.#modalObject.buttonText = 'Close';

        // przegrana. pamiętaj że bez return program będzie wykonywał się dalej.
        if (!isWin) {
            this.#revealAllMines();
            this.#modalObject.infoText = 'You lost, try again!';
            this.#buttons.reset.changeEmotion('negative');
            this.#modalObject.setText();
            this.#modalObject.toggleModal();
            return;
        }

        this.#modalObject.infoText = this.#timerObject.numberOfSeconds < this.#timerObject.maxNumberOfSeconds ? `You won, it took you ${this.#timerObject.numberOfSeconds} seconds` : `You spend some time on that game but won,  congrats! `;
        this.#buttons.reset.changeEmotion('positive');
        this.#modalObject.setText();
        this.#modalObject.toggleModal();
    }

    #handleElements() {
        this.#board = this.getElement(this.UiSelectors.board);
        this.#buttons.modal = this.getElement(this.UiSelectors.modalButton);
        this.#buttons.easy = this.getElement(this.UiSelectors.easyButton);
        this.#buttons.normal = this.getElement(this.UiSelectors.normalButton);
        this.#buttons.expert = this.getElement(this.UiSelectors.expertButton);
    }


    #addCellsEventListeners() {
        this.#cellsElements.forEach((element) => {
            element.addEventListener('click', this.#handleCellClick)
            element.addEventListener('contextmenu', this.#handleCellContextMenu)
        })
    }

    #removeCellsEventListeners() {
        this.#cellsElements.forEach((element) => {
            element.removeEventListener('click', this.#handleCellClick);
            element.removeEventListener('contextmenu', this.#handleCellContextMenu);
        })
    }


    #addButtonsEventListeners() {
        this.#buttons.easy.addEventListener('click', () =>
            this.#handleNewGameClick(
                this.#config.easy.rows,
                this.#config.easy.cols,
                this.#config.easy.mines));

        this.#buttons.normal.addEventListener('click', () =>
            this.#handleNewGameClick(
                this.#config.normal.rows,
                this.#config.normal.cols,
                this.#config.normal.mines));



        this.#buttons.expert.addEventListener('click', () =>
            this.#handleNewGameClick(
                this.#config.expert.rows,
                this.#config.expert.cols,
                this.#config.expert.mines));


        this.#buttons.reset.element.addEventListener('click', () =>
            this.#handleNewGameClick());

        this.#buttons.modal.addEventListener('click', () => this.#modalObject.toggleModal())

    }

    #handleNewGameClick(
        row = this.#numberOfRows,
        col = this.#numberOfCols,
        mine = this.#numberOfMines,
    ) {
        this.#removeCellsEventListeners();
        this.#newGame(row, col, mine);
    }


    #handleCellClick = (e) => {
        const target = e.target;
        const rowIndex = parseInt(target.getAttribute('data-y'), 10);
        const colIndex = parseInt(target.getAttribute('data-x'), 10);
        const cell = this.#cells[rowIndex][colIndex];

        this.#checkIt(cell);
    }


    #handleCellContextMenu = (e) => {
        e.preventDefault();

        const target = e.target;
        const rowIndex = parseInt(target.getAttribute('data-y'), 10);
        const colIndex = parseInt(target.getAttribute('data-x'), 10);

        const cell = this.#cells[rowIndex][colIndex];

        if (cell.isReveal || this.#isGameFinished) return;

        if (cell.isFlagged) {
            this.#counterObject.increment();
            cell.toggleFlag();
            return;
        }
        //Flag's left. If value is not equal to zero it gaves true. 
        if (!!this.#counterObject.value) {
            this.#counterObject.decrement();
            cell.toggleFlag();
        }

    };


    // --- X - COLUMNS / Y - ROW -----

    #setCellValue(cell) {
        let minesCount = 0;
        for (let rowIndex = Math.max(cell.y - 1, 0); rowIndex <= Math.min(cell.y + 1, this.#numberOfRows - 1); rowIndex++) {

            for (let colIndex = Math.max(cell.x - 1, 0); colIndex <= Math.min(cell.x + 1, this.#numberOfCols - 1); colIndex++) {
                if (this.#cells[rowIndex][colIndex].isMine) minesCount++;
            }

        }
        cell.value = minesCount;
        cell.revealCell();
        this.#revealedCells++;

        // jeżeli wartość klikniętego pola to false czyli nie ma na nim żadnej miny -rozpocznij wyszukiwanie pustych pól
        if (!cell.value) {
            for (let rowIndex = Math.max(cell.y - 1, 0); rowIndex <= Math.min(cell.y + 1, this.#numberOfRows - 1); rowIndex++) {

                for (let colIndex = Math.max(cell.x - 1, 0); colIndex <= Math.min(cell.x + 1, this.#numberOfCols - 1); colIndex++) {
                    const cell = this.#cells[rowIndex][colIndex];
                    if (!this.#cells[rowIndex][colIndex].isReveal) {
                        this.#checkIt(cell);
                    }
                }

            }
        }
    }



    // przekazany parametr trzeba zapisać do zmiennej , nie da się przesłać tego samego parametru dalej bez zapisania.
    #checkIt(cell) {
        const element = cell;
        if (cell.isMine) {
            this.#endGame(false);
        }
        if (cell.isFlagged || this.#isGameFinished || cell.isReveal) return;


        if (this.#revealedCells === this.#cellsToReveal && !this.#isGameFinished) {
            this.#endGame(true);
        }
        this.#setCellValue(element)


    }

    // skorzystano z DESTRUKTURYZACJI OBIEKTU. W filter funkcja strzałkowa szuka właściwości isMine.
    #revealAllMines() {
        this.#cells.flat().filter(({ isMine }) => isMine).forEach((cell) => cell.revealCell());
    }

    // generuje komórki w pamięci.
    #generateCells() {
        this.#cells.length = 0;
        for (let row = 0; row < this.#numberOfRows; row++) {
            this.#cells[row] = []; //create second table dimension
            for (let col = 0; col < this.#numberOfCols; col++) {
                this.#cells[row].push(new Cell(col, row));
            }
        }
    }
    // create cells and shows on screen
    #renderBoard() {
        //pętla to wydajny zamiennik zapisu  ---------------    this.#board.innerHTML = "";
        while (this.#board.firstChild) {
            this.#board.removeChild(this.#board.lastChild);
        }

        this.#cells.flat().forEach(cell => {
            this.#board.insertAdjacentHTML('beforeend', cell.createElement());
            //przypisujemy wartośc atrybutowi element obiektu cell.
            cell.element = cell.getElement(cell.selector);
        })
    }

    #getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    #placeMinesInCells() {
        let minesToPlace = this.#numberOfMines;

        while (minesToPlace) {
            const rowIndex = this.#getRandomInteger(0, this.#numberOfRows - 1);
            const colIndex = this.#getRandomInteger(0, this.#numberOfCols - 1);

            const cell = this.#cells[rowIndex][colIndex];
            // odwołuje się do property is mine w klasie cell. dla komórki która została właśnie wylosowana.
            const hasCellMine = cell.isMine;
            if (!hasCellMine) {
                cell.addMine();
                minesToPlace--;
            }

        }
    }
    // Właściwości zahaszowane czyli prywatne będą możliwe do ukrycia jedynie w obrębie jednej klasy.
}





window.onload = function () {
    const game = new Game();
    game.initializeGame();
}