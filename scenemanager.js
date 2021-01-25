class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.entities = [];
        this.x = 0;
        this.loadSamus(game);
    }

    loadSamus(game, x, y) {
        let samus = new Samus(game);
        this.game.addEntity(samus);
    }
}