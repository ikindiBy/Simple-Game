export default 	class Compositor {
		constructor(){
			this.layers = [];
			// console.log('new Compositor')
		}

		drawLayerWithContext(context) {
			this.layers.forEach(layer => {
				layer(context);
			})
		}
	}