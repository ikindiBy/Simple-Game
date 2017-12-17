import {Trait} from '../Entity';

export default class Dashboard extends Trait {
    constructor() {
        super('dashboard');
    }

    update(entity, deltaTime, sprites, context) {
        const time = Math.round(entity.playerController.time);

    	context.font = "22px Verdana";

        context.fillStyle = "darkViolet";
        context.fillText(`LEVEL : 1`, 20, 22);
        context.fillText(`COINS : ${entity.stateCosmo.coins}`, 160, 22);
        context.fillText(`LIVES : ${entity.stateCosmo.lives}`, 300, 22);

        context.fillText(`KEYS : ${entity.stateCosmo.keys}`, 460, 22);

        context.fillText(`TIME : ${time}`, 840, 22);

        // if (!entity.stateCosmo.alive)  {
        // 	context.font = "50px Verdana";
    	// 	context.strokeStyle = "red";
    	// 	context.strokeText(`GAME OVER`, 350, 350);
        // }
    }
}
