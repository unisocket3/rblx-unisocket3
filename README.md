# rblx-unisocket3
WebSocket for ROBLOX.

# Usage
```lua
local ws = require(path.to.your.script)
local server = ws({
	url = "wss://your-websocket-endpoint.here"
})
server.sendMessage("Hello World")
```

# How to use for Roblox game?
First, copy all the files from the "lua" folder to ServerScriptService.

Then, accept HTTP requests on your game, and create a new script (NOT LOCAL) in Workspace, or wherever you want. 

Now, paste this in, and replace "your-websocket-endpoint.here" with the URL to your WebSocket server, and "Hello World" with whatever message you would like to send to your WebSocket server.

```lua
local ws = require(game.ServerScriptService.WebSocket)
local server = ws({
	url = "wss://your-websocket-endpoint.here"
})
server.sendMessage("Hello World")
```

You can also run a function every time a message is recieved, like this: 

```lua
local ws = require(game.ServerScriptService.WebSocket)
local server = ws({
	url = "wss://your-websocket-endpoint.here",
	onMessage = function(message)
		print(message)
	end
})
server.sendMessage("Hello World")
```
