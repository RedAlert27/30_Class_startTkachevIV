import { Game } from "./Game";
import { State } from "./State";

type Saving = {
    key: string
    game: Game
}

export class Site {
    game: Game = new Game()
    Games: Saving[] = []

    save() {
        const key = new Date().toLocaleString();
        this.Games.push({
            key: key,
            game: this.game.clone()
        });
        console.log(`Игра сохранена под ключом: "${key}"`);
    }

    load(index: number): boolean {
        if (index < 0 || index >= this.Games.length) {
            console.log(`Игра с индексом ${index} не найдена.`);
            return false;
        }
        const savedGame = this.Games[index].game.clone();
        this.game = savedGame;
        console.log(`Игра "${this.Games[index].key}" загружена.`);
        return true;
    }

    keys(): string[] {
        return this.Games.map((saving, index) => `${index}: ${saving.key}`);
    }
}
