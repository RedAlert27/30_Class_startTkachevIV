import { Site } from "./Site";

const site = new Site();

let buttons: HTMLButtonElement[] = [];
for (let i = 0; i < 9; i++) {
    let b = <HTMLButtonElement>document.getElementById("f" + i);
    b.onclick = () => {
        site.game.move(i);
        draw();
    };
    buttons.push(b);
}

let info = <HTMLDivElement>document.getElementById("info");

let stepSelect = <HTMLSelectElement>document.getElementById("stepSelect");
function fillStepOptions() {
    const ops = stepSelect.options;
    for (let i = ops.length - 1; i >= 0; i--) {
        ops.remove(i);
    }
    for (let i = 0; i < site.game.steps.length; i++) {
        const elem = new Option(`Шаг ${i}: ${site.game.steps[i].board.cells.join("")}`, String(i));
        ops.add(elem);
    }
    stepSelect.selectedIndex = site.game.current;
}

let stepButton = <HTMLButtonElement>document.getElementById("stepButton");
stepButton.onclick = (_) => {
    const index = parseInt(stepSelect.value);
    if (!isNaN(index) && site.game.toStep(index)) {
        draw();
    }
};

let gameSelect = <HTMLSelectElement>document.getElementById("gameSelect");
function fillGameSelect() {
    const ops = gameSelect.options;
    for (let i = ops.length - 1; i >= 0; i--) {
        ops.remove(i);
    }
    for (let i = 0; i < site.Games.length; i++) {
        const key = site.Games[i].key;
        const elem = new Option(`${i}: ${key}`, String(i));
        ops.add(elem);
    }
    if (ops.length > 0) {
        gameSelect.selectedIndex = 0;
    }
}

let saveGameButton = <HTMLButtonElement>document.getElementById("saveGameButton");
saveGameButton.onclick = () => {
    site.save();
    draw();
};

let loadGameButton = <HTMLButtonElement>document.getElementById("loadGameButton");
loadGameButton.onclick = () => {
    const index = parseInt(gameSelect.value);
    if (!isNaN(index) && site.load(index)) {
        draw();
    }
};

function draw() {
    const board = site.game.state.board;
    const gameStatus = board.status();
    const isGameActive = gameStatus === "Идет игра";

    console.log("Game status:", gameStatus); 
    console.log("Is game active:", isGameActive);
    
    for (let i = 0; i < 9; i++) {
        buttons[i].textContent = board.cells[i];
        // Кнопка активна только если клетка пуста И игра еще идет
        buttons[i].disabled = board.cells[i] !== "_" || !isGameActive;
    }
    
    info.textContent = gameStatus;
    fillStepOptions();
    fillGameSelect();
}

draw();
