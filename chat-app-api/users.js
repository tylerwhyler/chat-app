const users = [];

const addUser = ({ id, username, room }) => {
    username = username.trim().toLowerCase();
    // password = password.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUsername = users.find(user => user.username === username);

    if (existingUsername) {
        return { error: 'Username taken' };
    }

    const user = { id, username, room };

    users.push(user);

    return { user };
};

const removeUser = id => {
    const index = users.find(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUser = id => {
    return users.find(user => user.id === id);
};

const getUsersInRoom = room => users.filter(user => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
