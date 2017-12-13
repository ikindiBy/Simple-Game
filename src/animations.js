export	function createAnimation(frames, frameLen) {
		return function resolveFrame(distance) {
			let frameIndex = Math.floor(distance / frameLen % frames.length);
			let frameName = frames[frameIndex];
			return frameName;
		}
	}