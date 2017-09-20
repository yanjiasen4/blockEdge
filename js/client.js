var peer = new Peer({
    key: 'n9k0o3ytfk6e0zfr',
    debug: 3
});

var data = {
    msg: '',
    img: ''
};

peer.on('open', function (id) {
    console.log('peerID: ', id);
})

peer.on('connection', function (conn) {
    console.log("connect to ", conn.peer);
    conn.on('open', function () {
        // receive message
        conn.on('data', function (recv) {
            console.log('recevie msg: ', recv);
            if (recv.type == 'text') {
                data.msg = recv.data;
            } else if (recv.type == 'file') {
                var reader = new FileReader();

                reader.onload = function (e) {
                    data.img = e.target.result;
                }

                var blob = new Blob(recv.data.file, {
                    type: recv.data.type
                })

                reader.readAsDataURL(blob)
            }
        });
        conn.on('close', function (msg) {
            console.log('connect closed by server');
        });
        conn.on('error', function (error) {
            console.log('error: ', error);
        })
    })
});

app = new Vue({
    el: "#app",
    data: data
});