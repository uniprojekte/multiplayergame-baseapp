# multiplayergame-baseapp

The multiplayergame-baseapp is a tiny client server application that may serve as a starting point to develop your own online multiplayer game. 
It builds on the pure clientside [browsergame-baseapp](https://github.com/uniprojekte/browsergame-baseapp). 
The game logic now resides on the server which regulary publishes the actual game state to all clients. 

Marshalling from server to client is done by a simple serialization of ElementList via JSON.stringify. 
To facilitate marshalling, the baseclass Element now has an additionl attribute classType to identify its type on the clientside.

How to start
------------
To start the demo, simply run the server from project root directory by

    >node ./server/gameserver.js

and follow the url shown on the console. 

The example uses the tool browserify/watchify to pack all clientside-code into one file named bundle.js.
If you change code, use watchify to update bundle.js.
First, install watchify by

    >npm install -g watchify

Then start it from the project directory by

    >watchify ./client/main.js -o ./public/bundle.js

Watchify observes all your javascript files. 
Whenever a file changes, it automatically builds a new bundle.js.
The latter command is included in package.json and hence can be started from tools like visual studio code.
