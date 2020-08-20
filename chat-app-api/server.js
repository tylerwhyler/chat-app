const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const port = process.env.PORT || 4000;
const routes = require('./routes.js');

io.on('connection', socket => {
    socket.on('join', ({ username, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, username, room });

        if (error) {
            return callback(error);
        }

        socket.emit('message', {
            user: 'admin',
            text: `Joined room ${user.room}`,
        });

        socket.broadcast.to(user.room).emit('message', {
            user: 'admin',
            text: `${user.username} joined the room`,
        });

        socket.join(user.room);

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const { username, room, myMessage } = message;

        socket.broadcast.to(room).emit('message', {
            user: username,
            text: myMessage,
        });

        callback();
    });

    socket.on('message', message => {
        io.emit('message', message);
        console.log('message: ', message);

        // const err = true;

        // if (err) {
        //     callback({err: 'there was an error'});
        // }
    });
});

app.use(routes);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
