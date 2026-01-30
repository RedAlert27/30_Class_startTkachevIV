import { State } from "./State"
import { Cell } from "./Board" 

export class Game {
    steps: State[]
    current: number

    constructor(
        steps: State[] = [new State()],
        current: number = 0
    ) {
        this.steps = steps.map(state => state.clone());
        this.current = Math.min(current, this.steps.length - 1);
    }

    get state(): State {
        return this.steps[this.current].clone();
    }

    clone(): Game {
        return new Game(this.steps, this.current);
    }

    move(index: number): boolean {
        const currentState = this.steps[this.current];
        const currentBoard = currentState.board.clone();
        
        if (!currentBoard.move(index, currentState.sym)) {
            return false;
        }

        const nextSym: Cell = currentState.sym === "X" ? "0" : "X";  // Теперь Cell известен
        const nextState = new State(currentBoard, nextSym);
        
        if (this.current < this.steps.length - 1) {
            this.steps = this.steps.slice(0, this.current + 1);
        }
        
        this.steps.push(nextState);
        this.current = this.steps.length - 1;
        return true;
    }

    toStep(step: number): boolean {
        if (step < 0 || step >= this.steps.length) {
            return false;
        }
        this.current = step;
        return true;
    }
}
