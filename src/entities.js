import Entity from './entity.js';

export function createcosmo() {
    const cosmo = new Entity();

    cosmo.update = function(deltaTime) {
        this.pos.x += this.vel.x * deltaTime;
        this.pos.y += this.vel.y * deltaTime;
    }
    return cosmo;
}
