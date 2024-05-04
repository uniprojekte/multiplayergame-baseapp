
"use strict"

//-----------------------
// tinyserver.js - a tiny http-/ws-server
//
//-----------------------

const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const ws = require('ws')

module.exports = class TinyServer {

    constructor(port, wsCallback) {
        this.wsCallback = wsCallback
        this.server = http.createServer(this.processHttpRequest.bind(this))
        this.websocketServer = new ws.WebSocketServer({ server: this.server, clientTracking: true })
        this.websocketServer.on('connection', this.connectWs.bind(this))
        this.server.listen(port, () => {
            console.log(`tinyserver running at http://127.0.0.1:${port}/`)
        })
    }

    connectWs(websocket) {
        websocket.on('error', console.error)
        websocket.on('message', (data) => { this.processWsRequest(data)})
        websocket.on('close', () => { console.log('close'); })
    }

    processWsRequest(data) {
        if (this.wsCallback) this.wsCallback(data)
    }

    broadcastWsMessage(data, isBinary) {
        this.websocketServer.clients.forEach(function each(client) {
            if (client.readyState === ws.OPEN) {
                client.send(data, { binary: isBinary });
            }
        })
    }

    processHttpRequest(req, res) {
        let parts = url.parse(req.url, true)

        let filePath = parts.pathname ? parts.pathname.substring(1) : ""
        if (filePath === null || filePath === '') filePath = 'index.html'

        let now = new Date;
        console.log(now.toLocaleString('de-DE') + ': request for ' + req.url)

        fs.readFile('./public/' + filePath, (err, data) => {
            res.statusCode = 200
            switch (path.extname(filePath)) {
                case ".html":
                case ".htm": res.setHeader('Content-Type', 'text/html'); break
                case ".css": res.setHeader('Content-Type', 'text/css'); break
                case ".png": res.setHeader('Content-Type', 'image/png'); break
                case ".gif": res.setHeader('Content-Type', 'image/gif'); break
            }
            res.end(data)
        })
    }

}
