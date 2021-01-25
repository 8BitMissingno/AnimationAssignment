// These are globals
var GAME_ENGINE = new GameEngine();
var ASSET_MANAGER = new AssetManager();

// TODO: Be able to pass a list of paths to AssetManager?
ASSET_MANAGER.queueDownload("./sprites/samus.png");

// We don't want to start the game until all the resources are downloaded.
ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	GAME_ENGINE.init(ctx);
	new SceneManager(GAME_ENGINE)
	GAME_ENGINE.start();
});
