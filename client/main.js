"use strict"

const ClientGame = require("./clientgame")
let clientGame = new ClientGame()
clientGame.openWebSocket()
setTimeout(() => clientGame.send("hi there"), 1000)

