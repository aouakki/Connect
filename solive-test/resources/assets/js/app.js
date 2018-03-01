require('./bootstrap');

import io from 'socket.io-client'

const SOCKETIO_SERVER = 'http://localhost:3000';

/**
 * check if we are on the dahsboard page then perform socket.io logic
 *
 */
let connected = $("#connected-users");

if (connected.length > 0) {
    let socket = io(SOCKETIO_SERVER);
    let data = $("#connected-users").attr('data-token');
    socket.on("connect", function () {
        socket.emit("auth", {
            token: data
        });
    });
    socket.on('new.user.connected', function ({user}) {
        connected.append("<li data-user='" + user.id + "'>" + user.user_name + "</li>")
    })

    socket.on('old.user.disconneted', function ({user}) {
        $("li[data-user='" + user.id + "']").remove();
    })

    socket.on('user.list', function ({users}) {
        users.forEach(function (user) {
            connected.append("<li data-user='" + user.id + "'>" + user.user_name + "</li>");
        })
    })

}