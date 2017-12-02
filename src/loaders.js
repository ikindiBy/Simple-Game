export function loadImage(url) {
    return new Promise( resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    })
}

export function loadJSON(name) {
    return fetch(`./src/database/${name}.json`)
    .then(r => r.json());
}
