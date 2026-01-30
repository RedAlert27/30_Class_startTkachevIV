import { Board, Cell } from "./Board"

export class State {
    board: Board
    sym: Cell

    constructor(
        board: Board = new Board(),
        sym: Cell = "X"
    ) {
        this.board = board.clone();
        this.sym = sym;
    }

    clone(): State {
        return new State(this.board.clone(), this.sym);
    }
}
