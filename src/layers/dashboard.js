export default function createDashboardLayer(entity) {
    return function drawDashboard(context) {

    	context.font = "22px Verdana";
    	context.strokeStyle = "yellow";
        context.strokeText(`lives : ${entity.stateCosmo.lives}`, 260, 22);
        context.strokeText(`level : 1`, 20, 22);
        context.strokeText(`coins : 0`, 140, 22); 
    }
}
