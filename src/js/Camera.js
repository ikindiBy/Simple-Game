import {Vector} from './mathematics.js';

export default class Camera{
	constructor(){
		this.position = new Vector(0,0);
		this.size = new Vector(800, 594);
	}
}