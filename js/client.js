var peer = new Peer('yanjiasen4client1', {key: 'n9k0o3ytfk6e0zfr', debug: 3});

var data = {
    msg: ''
};

peer.on('connection', function(conn) {
    console.log("connect to ", conn.peer);
    conn.on('open', function() {
        // receive message
        conn.on('data', function(msg) {
            console.log('recevie msg: ', msg);
            data.msg = msg;
        });
        conn.on('close', function(msg) {
            console.log('connect closed by server');
        });
        conn.on('error', function(error) {
            console.log('error: ', error);
        })
    })
});

app = new Vue({
    el: "#app",
    data: data
});