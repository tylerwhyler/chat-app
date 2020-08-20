const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const port = process.env.PORT || 4000;
const routes = require('./routes.js');

// TODO:
// Push to heroku, test both apps to ensure live functionality
// Set up db, (Create chats in db, get route for all chats, {_id, username, room_id, message, timestamp})}
// Set up production
// Update mobile responsivity on message input (shrink me)

// Send email and password through signup
// Save user in db
// Send email ands pw through login. Query for email, compare passwords, if good, logged_in
// online_status: offline

// let messageCache = {}
// let cacheTime;

io.on('connection', socket => {
    socket.on('join', ({ username, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, username, room });

        if (error) {
            return callback(error);
        }

        socket.emit('message', {
            user: 'admin',
            text: `my_message_hackyasfJoined room ${user.room}`,
        });

        // Broadcast cached data

        socket.broadcast.to(user.room).emit('message', {
            user: 'admin',
            text: `${user.username} joined the room`,
        });

        socket.join(user.room);

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const { username, room, myMessage } = message;

        // Store message to db
        // Cache messages
        // messageCache[room] = {...messageCache[room], ...message}
        // cacheTime = Date.now()

        socket.broadcast.to(room).emit('message', {
            user: username,
            text: `${username}: ${myMessage}`,
        });

        callback();
    });
});

app.use(routes);

server.listen(port, () => {
    console.log(`Server running at ${port}`);
});
