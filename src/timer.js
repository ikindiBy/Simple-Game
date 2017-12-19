export default class Timer {
    constructor(deltaTime = 1/60) {
        this._start = true;
        this._stop = false;

        let lastTime = 0;
        let accumulatedTime = 0;

        this.updateProxy = (time) => {
            if (!this._stop) {
                if (this._start) {
                    lastTime = time;
                    this._start = false;
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
    }

    enqueue() {
        requestAnimationFrame(this.updateProxy);
    }

    start() {
        this.enqueue();
        this._stop = false;
    }

    stop() {
        this._start = true;
        this._stop = true;
    }
}
