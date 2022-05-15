const Crypto = require('crypto');
const express = require('express');
var {
    WebSocket
} = require('ws');
const ws_ = [];
const app = express();

app.get('/api/connect/:url', (req, res) => {
    var id = btoa(Crypto.randomBytes(10).toString('base64').slice(0, 10)).replaceAll("=", "");
    ws_[id] = {};
    ws_[id].message = "";
    ws_[id].connection = new WebSocket(atob(req.params.url));
    ws_[id].connection.on('message', function(data) {
        ws_[id].message = data;
    })
    ws_[id].connection.on('close', function() {
        ws_[id].connection.terminate();
    })
    ws_[id].open = false;
    setInterval(() => {
        ws_[id].connection.on('open', () => {
            ws_[id].open = true;
        });
    })
    ws_[id].connection.on("error", () => {
        res.status(500);
    })
    res.send(id);
});

app.get("/api/send/:id/:data", (req, res) => {
    var id = req.params.id;
    var stats = ws_[id];
    var socket = ws_[id].connection;
    req.params.data = atob(req.params.data);
    console.log("sent data: " + req.params.data)
    if (stats.open == true) {
        socket.send(req.params.data);
    } else {
        socket.on('open', () => {
            socket.send(req.params.data);
        });
    }
    res.send({
        success: true
    });
})

app.get("/api/poll/:id", (req, res) => {
    var socket = ws_[req.params.id];
    if (!/^\s*$/.test(socket.message.toString())) {
        res.send(socket.message);
    }
})

app.listen(3000, () => {
    console.log('server started');
});
