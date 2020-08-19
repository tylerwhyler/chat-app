const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 4000;
const routes = require('./routes.js');

io.on('connection', socket => {
    socket.on('newMessage', message => {
        io.emit('message', message);
        console.log(message);

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
