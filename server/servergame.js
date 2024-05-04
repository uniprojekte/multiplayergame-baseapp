"use strict"

const RandomWalkCircleElement = require('../game/randomwalkcircleelement')
const ElementList = require('../game/elementlist')

//----------------------

module.exports = class ServerGame {

    constructor(tickCallback) {
        this.tickCallback = tickCallback
        this.intervalReference = null
        this.elementList = null
    }

    //----------------------

    start() {
        this.elementList = new ElementList()
        for (let i = 0; i < 60; i++) {
            this.elementList.add(new RandomWalkCircleElement(i * 10, 150))
        }

        this.intervalReference = setInterval(this.tick.bind(this), 100)
    }

    //----------------------

    stop() {
        if (this.intervalReference) clearInterval(this.intervalReference)
        this.intervalReference = null
    }

    //----------------------

    tick() {
        this.elementList.action()
        this.tickCallback()
    }

}
