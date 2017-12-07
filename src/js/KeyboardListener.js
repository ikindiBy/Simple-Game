const PRESSED = true;
const RELEASED = false;

export default class KeyboardListener {
	constructor() {
		this.currentKeyStates = new Map();
		this.funsForKeyMap = new Map();
	}

	addMapping(keyCode, callback) {
		this.funsForKeyMap.set(keyCode, callback);
	}

	handleEvent(event) {
		const {keyCode} = event;

		if(!this.funsForKeyMap.has(keyCode)) {
			return;
		}

		event.preventDefault();

		const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

		if (this.currentKeyStates.get(keyCode) === keyState) {
			return;
		}

		this.currentKeyStates.set(keyCode, keyState);

		this.funsForKeyMap.get(keyCode)(keyState);
	}

	listenTo(window) {
		['keydown', 'keyup'].forEach(eventType => {
			window.addEventListener(eventType, e => {
				this.handleEvent(e);
			})
		})
		
	}
}