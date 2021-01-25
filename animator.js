class Animator {
	constructor(spritesheet, xStart, yStart, width, height, frameCount,
		frameDuration, framePadding, reverse, loop, bounce) {
		Object.assign(this, {
			spritesheet, xStart, yStart, width, height, frameCount,
			frameDuration, framePadding, reverse, loop, bounce
		});
		this.elapsedTime = 0;
		this.totalTime = this.frameCount * this.frameDuration;
	}

	/* 
	 * Calls to drawFrame may happen more than one time for each frame due to
	 * the way that the engine scales animation speeds.
	 */
	drawFrame(tick, context, x, y, scale) {
		this.elapsedTime += tick;
		if (this.isDone()) {
			if (this.loop) {
				this.elapsedTime -= this.totalTime;
				if (this.bounce) {
					this.reverse = !this.reverse;
					this.elapsedTime += this.frameDuration;
				}
			} else return;
		}
		let drawFrame = this.currentFrame();
		if (this.reverse) {
			drawFrame = this.frameCount - drawFrame - 1;
		}
		context.drawImage(this.spritesheet,
			this.xStart + drawFrame * (this.width + this.framePadding),
			this.yStart, this.width, this.height, x, y,
			this.width * scale,
			this.height * scale);
	}

	currentFrame() {
		return Math.floor(this.elapsedTime / this.frameDuration);
	}

	isDone() {
		return (this.elapsedTime >= this.totalTime);
    }
}