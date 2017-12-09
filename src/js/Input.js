import KeyboardListener from './KeyboardListener.js';


	export function setupKeyboard(entity) {

		

		let keyInput = new KeyboardListener();

		keyInput.addMapping('Space', keyState => {
			if(keyState) {
				entity.jump.start();
			} else {
				entity.jump.cancel();
			}
		});
		keyInput.addMapping('ArrowRight', keyState => {      
			entity.go.direction = keyState;
		});
		keyInput.addMapping('ArrowLeft', keyState => {
			entity.go.direction = -keyState;
		});

		return keyInput;
	}
	

			