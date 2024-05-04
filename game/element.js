"use strict"

module.exports = class Element {

    constructor() {
        this.classType = this.constructor.name      // retain classType for marshalling
    }

    action() { }

    draw(ctx) { }

    checkCollision(element) { }
}