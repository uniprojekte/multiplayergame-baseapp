# multiplayergame-baseapp

The multiplayergame-baseapp is a tiny client server application that may serve as a starting point to develop your own online multiplayer game. 
It builds on the pure clientside [browsergame-baseapp](https://github.com/uniprojekte/browsergame-baseapp). 
The game logic now resides on the server which regulary publishes the actual game state to all clients. 

Communication between server and its clients employs both http and websockets. 
The server uses http to provide static content such as index.html to the clients.
Dynamic content such as the actual game state or clientside actions are exchanged via websockets.
Some basic server functionality is provided by the minimalistic server implementation tinyserver.js

Marshalling of the game state from server to client is done by a simple serialization of ElementList via JSON.stringify. 
To facilitate marshalling, the baseclass Element now has an additionl attribute classType to identify its type on the clientside.

Note: The multiplayergame-baseapp has an educational focus and provides some basic, object-oriented infrastructure. 
It leaves aside security relevant features that should be considered in an productive environment. 

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
