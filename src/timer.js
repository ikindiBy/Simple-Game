export default class Timer {
    constructor(deltaTime = 1/60) {
        let lastTime = 0;
        let accumulatedTime = 0;
        let start = true;

        this.updateProxy = (time) => {
            if (start === true) {
                lastTime = time;
                start = false;
            }

            accumulatedTime += (time - lastTime) / 1000;

            while (accumulatedTime > deltaTime) {
                this.update(deltaTime);
                accumulatedTime -= deltaTime;
            }

            lastTime = time;
            this.enqueue();
        }
    }

    enqueue() {
        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue();;
    }
}
