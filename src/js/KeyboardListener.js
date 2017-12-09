const PRESSED = true;
const RELEASED = false;

export default class KeyboardListener {
	constructor() {
		this.currentKeyStates = new Map();
		this.funsForKeyMap = new Map();
	}

	addMapping(code, callback) {
		this.funsForKeyMap.set(code, callback);
	}

	handleEvent(event) {
		const {code} = event;

		if(!this.funsForKeyMap.has(code)) {
			return;
		}

		event.preventDefault();

		const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

		if (this.currentKeyStates.get(code) === keyState) {
			return;
		}

		this.currentKeyStates.set(code       , keyState);

		this.funsForKeyMap.get(code       )(keyState);
	}

	listenTo(window) {
		['keydown', 'keyup'].forEach(eventType => {
			window.addEventListener(eventType, e => {
				this.handleEvent(e);
			})
		})
		
	}
}