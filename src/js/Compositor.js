export default 	class Compositor {
		constructor(){
			this.layers = [];
		}

		drawLayerWithContext(context, camera) {
			this.layers.forEach(layer => {
				layer(context, camera);
			})
		}
	}