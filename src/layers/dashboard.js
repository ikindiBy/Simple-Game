export default function createDashboardLayer(entity) {
    return function drawDashboard(context) {

        const time = Math.round(entity.playerController.time);

    	context.font = "22px Verdana";

        context.fillStyle = "darkViolet";
        context.fillText(`LIVES : ${entity.stateCosmo.lives}`, 300, 22);
        context.fillText(`LEVEL : 1`, 20, 22);
        context.fillText(`COINS : ${entity.stateCosmo.coins}`, 160, 22);
        context.fillText(`TIME : ${time}`, 840, 22);


        if (!entity.stateCosmo.alive || entity.killable.dead)  {
        	context.font = "50px Verdana";
    		context.strokeStyle = "red";
    		context.strokeText(`GAME OVER`, 350, 350);

            entity.playerController.time = 60;
            entity.playerController.stopTime = true;
            entity.killable.kill();
        }
    }
}
