var peer = new Peer('yanjiasen4server1', {
    key: 'n9k0o3ytfk6e0zfr',
    debug: 3
});

peer.on('error', function (error) {
    console.log("error: ", error.type);
    if (error.type == 'unavailable-id') {
        peer.disconnect();
        peer.destroy();
    }
})

peer.on('open', function (id) {
    console.log('My peer ID: ' + id)
});
var data = {
    msg: '',
    clientId: '',
    connected: false
}

var conn;

var app = new Vue({
    el: "#app",
    data: data,
    methods: {
        connectPeer: function () {
            console.log('connect to client');
            conn = peer.connect(data.clientId);
            data.connected = true;
        },
        sendMsg: function () {
            console.log(data.msg)
            conn.send({
                type: 'text',
                data: data.msg
            })
        },
        sendFile: function (e) {
            console.log(e);
            if (!e.target.files.length)
                return;
            var file = e.target.files[0];
            console.log(file.type);
            var blob = new Blob(e.target.files, {
                type: file.type
            });


            console.log(file)
            conn.send({
                type: 'file',
                data: {
                    file: blob,
                    filename: file.name,
                    filetype: file.type
                }
            });
        },
        connectClose: function () {
            console.log('connect close');
            conn.close();
            data.connected = false;
        }
    }
})