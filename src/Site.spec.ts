import { Site } from "./Site";
import { Game } from "./Game";

describe("Site Class", () => {
    test("save should add game to Games array", () => {
        const site = new Site();
        site.game.move(0);
        site.save();
        expect(site.Games.length).toBe(1);
        expect(site.Games[0].key).toBeDefined();
    });

    test("load should restore game state", () => {
        const site = new Site();
        site.game.move(0);
        site.game.move(1);
        site.save();
        const savedState = site.game.state.board.cells.join("");
        
        site.game = new Game();
        site.load(0);
        
        expect(site.game.state.board.cells.join("")).toBe(savedState);
    });

    test("keys should return list of save keys", () => {
        const site = new Site();
        site.save();
        site.save();
        expect(site.keys().length).toBe(2);
    });

    test("load with invalid index returns false", () => {
        const site = new Site();
        expect(site.load(-1)).toBe(false);
        expect(site.load(0)).toBe(false);
    });
});
