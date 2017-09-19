var peer = new Peer('yanjiasen4server', {key: 'n9k0o3ytfk6e0zfr', debug: 3});

peer.on('error', function(error) {
    console.log("error: ", error.type);
    if (error.type == 'unavailable-id') {
        peer.disconnect();
        peer.destroy();
    }
})

peer.on('open', function(id) {
    console.log('My peer ID: ' + id)
});
var data = {
    msg: '',
    connected: false
}

var conn;

var app = new Vue({
    el: "#app",
    data: data,
    methods: {
        connectPeer: function() {
            console.log('connect to client');
            conn = peer.connect('yanjiasen4client3');
            data.connected = true;
        },
        sendMsg: function() {
            console.log(data.msg)
            conn.send(data.msg)
        },
        connectClose: function() {
            console.log('connect close');
            conn.close();
            data.connected = false;
        }
    }
})
