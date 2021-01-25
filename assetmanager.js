class AssetManager {
	constructor() {
		this.successCount = 0;
		this.errorCount = 0;
		this.cache = [];
		this.downloadQueue = [];
	};

	queueDownload(path) {
		console.log("Queueing " + path);
		this.downloadQueue.push(path);
	};

	isDone() {
		return this.downloadQueue.length ===
			this.successCount + this.errorCount;
	};

	downloadAll(callback) {
		// TODO: Expand this method to be able to download audio as well.

		/* 
		 * A little hacky, if there are no assets to download, we need to wait 
		 * to make sure the html document has loaded. It is possible to ask the
		 * window whether the document has loaded, which would be a cleaner way
		 * to accomplish this.
		 */
		if (this.downloadQueue.length === 0) setTimeout(callback, 10);
		for (var i = 0; i < this.downloadQueue.length; i++) {
			// Empty Image
			var img = new Image();
			/*
			 * We define an alias for this, which allows manipulating of the 
			 * members in the current instance of this class. Simply trying
			 * 
			 *      this.successCount++;
			 * 
			 * will cause the interpreter to state that the member doesn't 
			 * exist.
			 */
			var that = this;
			var path = this.downloadQueue[i];
			console.log(path);

			/*
			 * These must be setup before the browser is triggered to download 
			 * the image so that it is ready to recieve the status message.
			 */
			img.addEventListener("load", function () {
				console.log("Loaded " + this.src);
				that.successCount++;
				if (that.isDone()) callback();
			});
			img.addEventListener("error", function () {
				console.log("Error loading " + this.src);
				that.errorCount++;
				if (that.isDone()) callback();
			});

			// Tells the browser to get the image from the path.
			img.src = path;
			this.cache[path] = img;
		}
	};

	getAsset(path) {
		return this.cache[path];
	};
};