(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"../game/elementlist":4,"../game/randomwalkcircleelement":5}],2:[function(require,module,exports){
"use strict"

const ClientGame = require("./clientgame")
let clientGame = new ClientGame()
clientGame.openWebSocket()
setTimeout(() => clientGame.send("hi there"), 1000)


},{"./clientgame":1}],3:[function(require,module,exports){
"use strict"

module.exports = class Element {

    constructor() {
        this.classType = this.constructor.name      // retain classType for marshalling
    }

    action() { }

    draw(ctx) { }

    checkCollision(element) { }
}
},{}],4:[function(require,module,exports){
"use strict"

module.exports = class ElementList extends Array {

    constructor() {
        super()
    }

    add(element) {
        this.push(element)
    }

    get(i) {
        return this[i]
    }

    delete(i) {
        this.splice(i, 1)
    }

    draw(ctx) {
        for (let i = 0; i < this.length; i++) {
            this[i].draw(ctx)
        }
    }

    action() {
        for (let i = 0; i < this.length; i++) {
            this[i].action()
        }
    }

    checkCollision(element) { }
}
},{}],5:[function(require,module,exports){
"use strict"

const Element = require('./element')

module.exports = class RandomWalkCircleElement extends Element {

    constructor(x, y) {
        super()
        this.x = x
        this.y = y
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.fillStyle = "red"
        ctx.fill()
    }

    action() {
        this.x += Math.random() * 2 - 1
        this.y += Math.random() * 2 - 1
    }
}
},{"./element":3}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL1VzZXJzL2FkbWluL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9jbGllbnRnYW1lLmpzIiwiY2xpZW50L21haW4uanMiLCJnYW1lL2VsZW1lbnQuanMiLCJnYW1lL2VsZW1lbnRsaXN0LmpzIiwiZ2FtZS9yYW5kb213YWxrY2lyY2xlZWxlbWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiXG5cbmNvbnN0IFJhbmRvbVdhbGtDaXJjbGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vZ2FtZS9yYW5kb213YWxrY2lyY2xlZWxlbWVudCcpXG5jb25zdCBFbGVtZW50TGlzdCA9IHJlcXVpcmUoJy4uL2dhbWUvZWxlbWVudGxpc3QnKVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBDbGllbnRHYW1lIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRMaXN0ID0gbnVsbFxuICAgIH1cblxuICAgIG9wZW5XZWJTb2NrZXQoKSB7XG4gICAgICAgIC8vIGJ1aWxkIHdlYnNvY2tldC11cmwgZnJvbSBjdXJyZW50IGxvY2F0aW9uXG4gICAgICAgIHRoaXMuc29ja2V0ID0gbmV3IFdlYlNvY2tldChcIndzOi8vXCIgKyBsb2NhdGlvbi5ob3N0ICsgbG9jYXRpb24ucGF0aG5hbWUpXG4gICAgICAgIHRoaXMuc29ja2V0Lm9ub3BlbiA9IChldmVudCkgPT4geyBjb25zb2xlLmxvZyhcInNvY2tldCBvcGVuZWRcIikgfVxuICAgICAgICB0aGlzLnNvY2tldC5vbmNsb3NlID0gKGV2ZW50KSA9PiB7IGNvbnNvbGUubG9nKFwic29ja2V0IGNsb3NlZFwiKSB9XG4gICAgICAgIHRoaXMuc29ja2V0Lm9uZXJyb3IgPSAoZXZlbnQpID0+IHsgY29uc29sZS5sb2coXCJzb2NrZXQgZXJyb3I6IFwiICsgSlNPTi5zdHJpbmdpZnkoZXZlbnQpKSB9XG4gICAgICAgIHRoaXMuc29ja2V0Lm9ubWVzc2FnZSA9IChldmVudCkgPT4geyB0aGlzLnVwZGF0ZShldmVudC5kYXRhKSB9XG4gICAgfVxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICB1cGRhdGUoanNvbikge1xuICAgICAgICB0aGlzLmVsZW1lbnRMaXN0ID0gbmV3IEVsZW1lbnRMaXN0KClcbiAgICAgICAgbGV0IGVsID0gSlNPTi5wYXJzZShqc29uKVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBkeW5hbWljYWxseSBjcmVhdGUgZWxlbWVudCBieSBpdHMgY2xhc3NUeXBlIGF0dHJpYnV0ZVxuICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBldmFsKCduZXcgJyArIGVsW2ldLmNsYXNzVHlwZSArICcoKScpXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQsIGVsW2ldKVxuICAgICAgICAgICAgdGhpcy5lbGVtZW50TGlzdC5hZGQoZWxlbWVudClcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBteWNhbnZhcyA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Y2FudmFzXCIpXG4gICAgICAgIGxldCBjdHggPSBteWNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgICAgIC8vLS0tIGNsZWFyIHNjcmVlblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoMjM1LCAyNTAsIDI1NSwgMC4wNSknICAgICAgICAvLyBhbHBoYSA8IDEgbMO2c2NodCBkZW4gQmlsZHNjaHJpbSBudXIgdGVpbHdlaXNlIC0+IGJld2VndGUgR2VnZW5zdMOkbmRlIGVyemV1Z2VuIFNwdXJlblxuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgbXljYW52YXMuY2xpZW50V2lkdGgsIG15Y2FudmFzLmNsaWVudEhlaWdodClcbiAgICAgICAgLy8tLS0gZHJhdyBlbGVtZW50c1xuICAgICAgICB0aGlzLmVsZW1lbnRMaXN0LmRyYXcoY3R4KVxuICAgIH1cblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgc2VuZChtZXNzYWdlKSB7XG4gICAgICAgIGlmICh0aGlzLnNvY2tldCkgICAgdGhpcy5zb2NrZXQuc2VuZChtZXNzYWdlKVxuICAgIH1cblxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcclxuXHJcbmNvbnN0IENsaWVudEdhbWUgPSByZXF1aXJlKFwiLi9jbGllbnRnYW1lXCIpXHJcbmxldCBjbGllbnRHYW1lID0gbmV3IENsaWVudEdhbWUoKVxyXG5jbGllbnRHYW1lLm9wZW5XZWJTb2NrZXQoKVxyXG5zZXRUaW1lb3V0KCgpID0+IGNsaWVudEdhbWUuc2VuZChcImhpIHRoZXJlXCIpLCAxMDAwKVxyXG5cclxuIiwiXCJ1c2Ugc3RyaWN0XCJcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBFbGVtZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNsYXNzVHlwZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZSAgICAgIC8vIHJldGFpbiBjbGFzc1R5cGUgZm9yIG1hcnNoYWxsaW5nXG4gICAgfVxuXG4gICAgYWN0aW9uKCkgeyB9XG5cbiAgICBkcmF3KGN0eCkgeyB9XG5cbiAgICBjaGVja0NvbGxpc2lvbihlbGVtZW50KSB7IH1cbn0iLCJcInVzZSBzdHJpY3RcIlxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEVsZW1lbnRMaXN0IGV4dGVuZHMgQXJyYXkge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKClcbiAgICB9XG5cbiAgICBhZGQoZWxlbWVudCkge1xuICAgICAgICB0aGlzLnB1c2goZWxlbWVudClcbiAgICB9XG5cbiAgICBnZXQoaSkge1xuICAgICAgICByZXR1cm4gdGhpc1tpXVxuICAgIH1cblxuICAgIGRlbGV0ZShpKSB7XG4gICAgICAgIHRoaXMuc3BsaWNlKGksIDEpXG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzW2ldLmRyYXcoY3R4KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWN0aW9uKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXNbaV0uYWN0aW9uKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrQ29sbGlzaW9uKGVsZW1lbnQpIHsgfVxufSIsIlwidXNlIHN0cmljdFwiXG5cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuL2VsZW1lbnQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFJhbmRvbVdhbGtDaXJjbGVFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy54ID0geFxuICAgICAgICB0aGlzLnkgPSB5XG4gICAgfVxuXG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgIGN0eC5hcmModGhpcy54LCB0aGlzLnksIDUsIDAsIE1hdGguUEkgKiAyLCB0cnVlKVxuICAgICAgICBjdHguY2xvc2VQYXRoKClcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmVkXCJcbiAgICAgICAgY3R4LmZpbGwoKVxuICAgIH1cblxuICAgIGFjdGlvbigpIHtcbiAgICAgICAgdGhpcy54ICs9IE1hdGgucmFuZG9tKCkgKiAyIC0gMVxuICAgICAgICB0aGlzLnkgKz0gTWF0aC5yYW5kb20oKSAqIDIgLSAxXG4gICAgfVxufSJdfQ==
