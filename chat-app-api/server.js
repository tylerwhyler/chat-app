const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connect', socket => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

io.on('connection', socket => {
    socket.on('chat message', message => {
        console.log('message: ' + message);
    });
});

io.on('connection', socket => {
    socket.on('chat message', message => {
        io.emit('chat message', message);
    });
});

http.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
