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
        connected.append("<li class='list-group-item' data-user='" + user.id + "'>" + "<img style='max-height: 50px; max-width: 50px; border-radius: 50%; border : 1px solid #9fa0a2; margin: 8px;' src='/uploads/avatars/" + user.avatar + "' alt='profile'>" + user.user_name + "</li>");

    })

    socket.on('old.user.disconneted', function ({user}) {
        $("li[data-user='" + user.id + "']").remove();
    })

    socket.on('user.list', function ({users}) {
        users.forEach(function (user) {
            connected.append("<li class='list-group-item' data-user='" + user.id + "'>" + "<img style='max-height: 50px; max-width: 50px; border-radius: 50%; border : 1px solid #9fa0a2; margin: 8px;' src='/uploads/avatars/" + user.avatar + "' alt='profile'>" + user.user_name + "</li>");
        })
    })

}