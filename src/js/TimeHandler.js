export default class TimeHandler {
	constructor(deltaTime = 1/60) {
		let overalTime = 0;
		let lastTime = 0;

		this.updateHelper = (time) => {
			overalTime += (time-lastTime) / 1000;

			while (overalTime > deltaTime) {
				this.update(deltaTime);
				overalTime -= deltaTime;
			}

			lastTime = time;

			this.queueOfProces();
		}
	}

	queueOfProces(){
		requestAnimationFrame(this.updateHelper);
	}

	start() {
		this.queueOfProces();
	}
}