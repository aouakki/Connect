let io = require("socket.io")(3000)
let jwt = require("jsonwebtoken")
let users = [];
let clients = [];
io.on("connect", function (socket) {
    let connected_user;
    try {
        socket.on("auth", ({token}) => {
            let payload = jwt.verify(token, 'test',
                {
                    algorithms: ['HS256']
                }
            );
            connected_user = {
                id: payload.user_id,
                user_name: payload.user_name,
                connections_number: 1,
                socket_id: clients.length
            };

            let old_user = users.find(u => u.id == connected_user.id)
            if (!old_user) {
                users.push(connected_user)
                socket.broadcast.emit('new.user.connected', {user: connected_user})
            } else {
                old_user.connections_number++;
            }
            connected_users = users.filter(u => u.id !== connected_user.id)
            socket.emit("user.list", {users: connected_users})
        })
    } catch (err) {
        console.log(err.message)
    }

    socket.on("disconnect", function () {
        if (connected_user) {
            let target_user = users.find(u => u.id === connected_user.id)
            if (target_user) {
                target_user.connections_number--;
                if (target_user.connections_number == 0) {
                    users = users.filter(u => u.id !== target_user.id)
                    console.log("users list : " + users.length);
                    socket.broadcast.emit('old.user.disconneted', {user: target_user})
                }
            }
        }
    })
});