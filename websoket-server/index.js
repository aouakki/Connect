/**
 * Socket IO server for handling connected users part
 */
const CONF = require('./config.json');
let io = require("socket.io")(CONF.port);
let jwt = require("jsonwebtoken");
let users = [];
let clients = [];

/**
 * On new user connected
 */
io.on("connect", function (socket) {
    let connected_user;
    try {

        socket.on("auth", ({token}) => {
            /**
             * Decrypt JWT token
             */

            let payload = jwt.verify(token, CONF.key,
                {
                    algorithms: ['HS256']
                }
            );


            /**
             * Connected user informations
             * @type {{id: *, user_name: *, connections_number: number, socket_id: Number}}
             */
            connected_user = {
                id: payload.user_id,
                user_name: payload.user_name,
                avatar: payload.avatar,
                connections_number: 1,
                socket_id: clients.length
            };

            /**
             * Check if the user is already connected ( new tab )
             */
            let old_user = users.find(u => u.id == connected_user.id)
            if (!old_user) {
                /**
                 * Add the user to the connected users list
                 */
                users.push(connected_user)
                socket.broadcast.emit('new.user.connected', {user: connected_user})
            } else {
                /**
                 * if user already connected then just increment his connections numbers
                 */
                old_user.connections_number++;
            }
            /**
             *Get list of connected users except the current user and send it to the new connected user
             * */
            connected_users = users.filter(u => u.id !== connected_user.id)
            socket.emit("user.list", {users: connected_users})
        })
    } catch (err) {
        console.log(err.message)
    }

    /**
     * On user disconnected ( tab closed )
     */
    socket.on("disconnect", function () {
        if (connected_user) {
            /**
             * get the connected user data
             */
            let target_user = users.find(u => u.id === connected_user.id)
            if (target_user) {
                /**
                 * Check for connections number if 0 then notify all the other users to delete from the list
                 */
                target_user.connections_number--;
                if (target_user.connections_number == 0) {
                    users = users.filter(u => u.id !== target_user.id)
                    socket.broadcast.emit('old.user.disconneted', {user: target_user})
                }
            }
        }
    })
});