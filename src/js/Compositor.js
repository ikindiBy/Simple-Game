export default 	class Compositor {
		constructor(){
			this.layers = [];
		}

		drawLayerWithContext(context) {
			this.layers.forEach(layer => {
				layer(context);
			})
		}
	}