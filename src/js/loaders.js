export function loadImage(url) {
			return new Promise(resolve => {
				const img = new Image();
				img.src = url;
				img.addEventListener('load', () => {
					resolve(img);
				});
			});
		}

	export function loadDataFromJSON(nameFile) {
		return fetch(`../src/database/${nameFile}.json`)
		.then(response => response.json());
	}