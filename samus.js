class Samus {
	constructor(game) {
		Object.assign(this, { game });
		this.spritesheet = ASSET_MANAGER.getAsset("./sprites/samus.png");
		this.facing = 0; // 0 is right, 1 is left
		this.isWaiting = false;
		this.currentAnimation = null;
		this.loadAnimations();
	}

	loadAnimations() {
		this.rightIdle = new Animator(
			this.spritesheet, 250, 2, 26, 43, 3, 0.5, 24, false, true, true);
		this.leftIdle = new Animator(
			this.spritesheet, 99, 2, 26, 43, 3, 0.5, 24, false, true, true);
		this.idleTransition = new Animator(
			this.spritesheet, 250, 2, 24, 46, 1, 0.1, false, false, false);

		this.turnRight = new Animator(
			this.spritesheet, 52, 1, 21, 46, 2, 0.1, 330, false, false, false);
		this.turnLeft = new Animator(
			this.spritesheet, 52, 1, 21, 46, 2, 0.1, 330, true, false, false);

		this.currentAnimation = this.rightIdle;
	}

	update() {
		
	}

	draw(context) {
		context.imageSmoothingEnabled = false;
		this.currentAnimation.drawFrame(this.game.clockTick, context, 350, 150, 10);
	}

	/*
	checkAnimationQueue() {
		if (this.animationQueue.length === 0) {
			if (!this.isWaiting) {
				setTimeout(function () {
					this.animationQueue = this.queue1;
					this.isWaiting = false;
				}, 1000);
				this.isWaiting = true;
			}
		} else if (this.currentAnimation && this.currentAnimation.isDone()) {
			this.currentAnimation = this.animationQueue.pop();
		} else if (this.currentAnimation === true) {
			setTimeout(function () {
				this.currentAnimation = this.animationQueue.pop();
			}, 1000);
        }
    }
	*/
}
