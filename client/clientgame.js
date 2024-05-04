"use strict"

const RandomWalkCircleElement = require('../game/randomwalkcircleelement')
const ElementList = require('../game/elementlist')

//----------------------

module.exports = class ClientGame {

    constructor() {
        this.elementList = null
    }

    openWebSocket() {
        // build websocket-url from current location
        this.socket = new WebSocket("ws://" + location.host + location.pathname)
        this.socket.onopen = (event) => { console.log("socket opened") }
        this.socket.onclose = (event) => { console.log("socket closed") }
        this.socket.onerror = (event) => { console.log("socket error: " + JSON.stringify(event)) }
        this.socket.onmessage = (event) => { this.update(event.data) }
    }

    //----------------------

    update(json) {
        this.elementList = new ElementList()
        let el = JSON.parse(json)
        for (let i = 0; i < el.length; i++) {
            // dynamically create element by its classType attribute
            let element = eval('new ' + el[i].classType + '()')
            Object.assign(element, el[i])
            this.elementList.add(element)
        }

        let mycanvas = window.document.getElementById("mycanvas")
        let ctx = mycanvas.getContext('2d')
        //--- clear screen
        ctx.fillStyle = 'rgba(235, 250, 255, 0.05)'        // alpha < 1 löscht den Bildschrim nur teilweise -> bewegte Gegenstände erzeugen Spuren
        ctx.fillRect(0, 0, mycanvas.clientWidth, mycanvas.clientHeight)
        //--- draw elements
        this.elementList.draw(ctx)
    }

    //----------------------

    send(message) {
        if (this.socket)    this.socket.send(message)
    }

}
