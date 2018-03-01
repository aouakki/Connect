require('./bootstrap');

import io from 'socket.io-client'


let connected = $("#connected-users");

if (connected.length > 0) {
    let socket = io('http://localhost:3000')
    let data = $("#connected-users").attr('data-token');
    socket.on("connect", function () {
        socket.emit("auth", {
            token: data
        });
    });
    socket.on('new.user.connected', function ({user}) {
        console.log("user connected")
        connected.append("<li data-user='" + user.id + "'>" + user.user_name + "</li>")
    })

    socket.on('old.user.disconneted', function ({user}) {
        console.log("user disconnected")
        $("li[data-user='" + user.id + "']").remove();
    })

    socket.on('user.list', function ({users}) {
        users.forEach(function (user) {
            connected.append("<li data-user='" + user.id + "'>" + user.user_name + "</li>");
        })
    })

}