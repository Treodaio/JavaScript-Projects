import { game, DIAMONDS_ARRAY_WIDTH, DIAMONDS_ARRAY_HEIGHT } from './Game.esm.js';
import { EMPTY_BLOCK } from './gameLevels.esm.js';
export class Movement {

    // false -> means you can't do any move. 
    checkPosibilityMovement() {
        if (game.gameState.getIsMoving()) { return; }

        this.isPossibleToMove = game.gameState.getGameBoard().some((diamond, index, diamonds) => {
            if (diamond.kind === EMPTY_BLOCK) {
                return false;
            }
            //  M O V E  R I G H T
            //  => check in row 
            // first condition -> check penultimate diamond or last diamond is pointless
            if (
                index % DIAMONDS_ARRAY_WIDTH < DIAMONDS_ARRAY_WIDTH - 3
                && diamond.kind === diamonds[index + 2].kind
                && diamond.kind === diamonds[index + 3].kind
            ) { return true; }

            // => check is in the middle of the column

            // first condition eliminate hidden row of diamonds.
            //second condition eliminate first visible row because that row is not in the middle.
            // third condition eliminate last visible row. Similar case with second condition
            //  diamonds[index + DIAMONDS_ARRAY_WIDTH - this is diamond UNDER the checked diamond

            if (
                index % DIAMONDS_ARRAY_WIDTH < DIAMONDS_ARRAY_WIDTH - 1
                && Math.floor(index / DIAMONDS_ARRAY_WIDTH) > 1
                && Math.floor(index / DIAMONDS_ARRAY_WIDTH) < DIAMONDS_ARRAY_HEIGHT - 1

                && diamond.kind === diamonds[index - DIAMONDS_ARRAY_WIDTH + 1].kind
                && diamond.kind === diamonds[index + DIAMONDS_ARRAY_WIDTH + 1].kind
            ) { return true; }


            // => check if is on the top of the column
            if (
                index % DIAMONDS_ARRAY_WIDTH < DIAMONDS_ARRAY_WIDTH - 1
                && Math.floor(index / DIAMONDS_ARRAY_WIDTH) < DIAMONDS_ARRAY_HEIGHT - 2

                && diamond.kind === diamonds[index + DIAMONDS_ARRAY_WIDTH + 1].kind
                && diamond.kind === diamonds[index + (DIAMONDS_ARRAY_WIDTH * 2) + 1].kind
            ) { return true; }

            // => check if is on the bottom of the column
            // second condition - it must be min. 3 row from visible rows to player
            if (
                index % DIAMONDS_ARRAY_WIDTH < DIAMONDS_ARRAY_WIDTH - 1
                && Math.floor(index / DIAMONDS_ARRAY_WIDTH) > 2

                && diamond.kind === diamonds[index - DIAMONDS_ARRAY_WIDTH + 1].kind
                && diamond.kind === diamonds[index - (DIAMONDS_ARRAY_WIDTH * 2) + 1].kind
            ) { return true; }






            //  M O V E   L E F T
            // =>  check in row 
            if (index % DIAMONDS_ARRAY_WIDTH > 2
                && diamond.kind === diamonds[index - 2].kind
                && diamond.kind === diamonds[index - 3].kind
            ) { return true; }
            // => check if is in the middle of the column

            if (index % DIAMONDS_ARRAY_WIDTH
                && Math.floor(index / DIAMONDS_ARRAY_WIDTH) > 1
                && Math.floor(index / DIAMONDS_ARRAY_WIDTH) < DIAMONDS_ARRAY_HEIGHT - 1

                && diamond.kind === diamonds[index + DIAMONDS_ARRAY_WIDTH - 1].kind
                && diamond.kind === diamonds[index - DIAMONDS_ARRAY_WIDTH - 1].kind
            ) { return true; }


            // move left => check if is on the top of the column
            if (
                index % DIAMONDS_ARRAY_WIDTH
                && Math.floor(index / DIAMONDS_ARRAY_WIDTH) < DIAMONDS_ARRAY_WIDTH - 2

                && diamond.kind === diamonds[index + DIAMONDS_ARRAY_WIDTH - 1].kind
                && diamond.kind === diamonds[index + (DIAMONDS_ARRAY_WIDTH * 2) - 1].kind
            ) { return true; }

            // move left => check if is on the bottom of the column
            if (
                index % DIAMONDS_ARRAY_WIDTH
                && Math.floor(index / DIAMONDS_ARRAY_WIDTH) > 2
                && diamond.kind === diamonds[index - DIAMONDS_ARRAY_WIDTH - 1].kind
                && diamond.kind === diamonds[index - (DIAMONDS_ARRAY_WIDTH * 2) - 1].kind
            ) { return true }







            //  M O V E   D O W N




            //first condition --->  diamond must be min. 4. 
            // Because when goes down there must be another two diamonds to have same kind.
            // divide index means conversion. In this case is conversion to row. First 5 rows fulfills the condition.
            // => check if is in column
            if (
                Math.floor(index / DIAMONDS_ARRAY_WIDTH) < DIAMONDS_ARRAY_HEIGHT - 3
                && diamond.kind === diamonds[index + DIAMONDS_ARRAY_WIDTH * 2].kind
                && diamond.kind === diamonds[index + DIAMONDS_ARRAY_WIDTH * 3].kind
            ) { return true; }

            // => check if is in the middle of the row
            // first condition check does diamond are not a first element of left edge in table. 
            // first condition returns 0 what is converted to false
            // third condition check doeas diamond are not a last row. last diamond can't switch to down.
            if (
                index % DIAMONDS_ARRAY_WIDTH
                && index % DIAMONDS_ARRAY_WIDTH > DIAMONDS_ARRAY_WIDTH - 1
                && Math.floor(index / DIAMONDS_ARRAY_WIDTH) < DIAMONDS_ARRAY_HEIGHT - 1

                && diamond.kind === diamonds[index + DIAMONDS_ARRAY_WIDTH + 1].kind
                && diamond.kind === diamonds[index + DIAMONDS_ARRAY_WIDTH - 1].kind
            ) { return true; }


            // => check if is in the left edge of the row.
            if (
                index % DIAMONDS_ARRAY_WIDTH < DIAMONDS_ARRAY_WIDTH - 2
                && Math.floor(index / DIAMONDS_ARRAY_WIDTH) < DIAMONDS_ARRAY_HEIGHT - 1
                && diamond.kind === diamonds[index + DIAMONDS_ARRAY_WIDTH + 1].kind
                && diamond.kind === diamonds[index + DIAMONDS_ARRAY_WIDTH + 2].kind
            ) { return true; }

            // => check if is in the right edge of the row
            if (
                index % DIAMONDS_ARRAY_WIDTH > 1
                && Math.floor(index / DIAMONDS_ARRAY_WIDTH) < DIAMONDS_ARRAY_HEIGHT - 1
                && diamond.kind === diamonds[index + DIAMONDS_ARRAY_WIDTH - 1].kind
                && diamond.kind === diamonds[index + DIAMONDS_ARRAY_WIDTH - 2].kind
            ) { return true; }





            //  M O V E   U P

            // check if is in column
            if (
                Math.floor(index / DIAMONDS_ARRAY_WIDTH) > 3
                && diamond.kind === diamonds[index - (DIAMONDS_ARRAY_WIDTH * 2)].kind
                && diamond.kind === diamonds[index - (DIAMONDS_ARRAY_WIDTH * 3)].kind
            ) { return true; }

            // move up => check if is in the middle of the row
            if (
                index % DIAMONDS_ARRAY_WIDTH
                && index % DIAMONDS_ARRAY_WIDTH < DIAMONDS_ARRAY_WIDTH - 1
                && Math.floor(index / DIAMONDS_ARRAY_WIDTH) > 1
                && diamond.kind === diamonds[index - DIAMONDS_ARRAY_WIDTH + 1].kind
                && diamond.kind === diamonds[index - DIAMONDS_ARRAY_WIDTH - 1].kind
            ) { return true; }

            // move up => check if is in the left edge of the row
            if (
                index % DIAMONDS_ARRAY_WIDTH < DIAMONDS_ARRAY_WIDTH - 2
                && Math.floor(index / DIAMONDS_ARRAY_WIDTH) > 1
                && diamond.kind === diamonds[index - DIAMONDS_ARRAY_WIDTH + 1].kind
                && diamond.kind === diamonds[index - DIAMONDS_ARRAY_WIDTH - 1].kind
            ) { return true; }

            // move up => check if is in the right edge of the row
            if (
                index / DIAMONDS_ARRAY_WIDTH > 1
                && Math.floor(index / DIAMONDS_ARRAY_WIDTH) > 1
                && diamond.kind === diamonds[index - DIAMONDS_ARRAY_WIDTH - 1].kind
                && diamond.kind === diamonds[index - DIAMONDS_ARRAY_WIDTH - 2].kind
            ) { return true; }

            return false;
        });
        if (!this.isPossibleToMove) {
            game.gameState.mixDiamonds();
        }

    }

}

export const movement = new Movement();


