const OBSWebSocket = require('obs-websocket-js');
var gpio = require("gpio");

var gpio17 = gpio.export(17, {
    direction: gpio.DIRECTION.OUT,
    ready: function() {
    }
 });
var gpio27 = gpio.export(27, {
    direction: gpio.DIRECTION.OUT,
    ready: function() {
    }
});

function switchRedLed(cam) {
    console.log('data: ' + cam);
    switch(cam.toString()) {
        case "cam1":
            gpio17.set();
            gpio27.set(0);

            break;
        case "cam2":
            gpio17.set(0);

            break;
        case "cam3":
            gpio17.set(0);

            break;
    }

}

function switchGreenLed(cam) {
    console.log('data: ' + cam);
    switch(cam.toString()) {
        case "cam1":
            gpio27.set();
            gpio17.set(0);
            break;
        case "cam2":
            gpio27.set(0);

            break;
        case "cam3":
            gpio27.set(0);

            break;
    }

}

const obs = new OBSWebSocket();
obs.connect({
        address: '192.168.250.105:4444',
        password: '$up3rSecretP@ssw0rd'
    })
    .then(() => {
        console.log(`Success! We're connected & authenticated.`);
 
    })
    .then(data => {
 
    })
    .catch(err => { // Promise convention dicates you have a catch on every chain.
        console.log(err);
    });
 
obs.on('SwitchScenes', data => {
    var cam = data.sceneName.match(/#\w+/g).map(v => v.replace('#', ''))
    console.log(`New active camera : ${cam}`);
    switchRedLed(cam);
});

obs.on('PreviewSceneChanged', data => {
    var cam = data.sceneName.match(/#\w+/g).map(v => v.replace('#', ''))
    console.log(`New preview camera : ${cam}`);
    switchGreenLed(cam);
});


// You must add this handler to avoid uncaught exceptions.
obs.on('error', err => {
    console.error('socket error:', err);
});