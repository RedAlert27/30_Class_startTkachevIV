export type Cell = "_" | "X" | "0"

export function isCell(sym: string): sym is Cell {
    return sym === "_" || sym === "X" || sym === "0";
}

export class Board {
    cells: Cell[]

    constructor(str: string | Cell[] = "_________") {
        if (Array.isArray(str)) {
            this.cells = [...str];
        } else {
            const parsed = Board.fromString(str);
            this.cells = parsed || ["_", "_", "_", "_", "_", "_", "_", "_", "_"];
        }
    }

    clone(): Board {
        return new Board([...this.cells]);
    }

    private static fromString(str: string): Cell[] | null {
        if (str.length !== 9) return null;
        
        const cells: Cell[] = [];
        for (const char of str) {
            if (!isCell(char)) return null;
            cells.push(char);
        }
        return cells;
    }

    isFill(): boolean {
        return !this.cells.includes("_");
    }

    move(index: number, cell: Cell): boolean {
        if (index < 0 || index >= 9 || this.cells[index] !== "_") {
            return false;
        }
        this.cells[index] = cell;
        return true;
    }

    private getLineChar(line: number[]): Cell[] {
        return [this.cells[line[0]], this.cells[line[1]], this.cells[line[2]]];
    }

    private static winPos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    checkWin(): string {
        for (const line of Board.winPos) {
            const [a, b, c] = this.getLineChar(line);
            if (a !== "_" && a === b && b === c) {
                return a;
            }
        }
        return "_";
    }

    status(): string {
        const winner = this.checkWin();
        if (winner !== "_") {
            return `Победил: ${winner}`;
        }
        if (this.isFill()) {
            return "Ничья!";
        }
        return "Идет игра";
    }
}
