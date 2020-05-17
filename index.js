const OBSWebSocket = require('obs-websocket-js');
var gpio = require("gpio");


// cam1 RED
var cam1red = gpio.export(17, {
    direction: gpio.DIRECTION.OUT,
    ready: function() {
    }
 });
// cam1 GREEN
var cam1green = gpio.export(27, {
    direction: gpio.DIRECTION.OUT,
    ready: function() {
    }
});
// cam2 RED
var cam2red = gpio.export(14, {
    direction: gpio.DIRECTION.OUT,
    ready: function() {
    }
 });
// cam2 GREEN
var cam2green = gpio.export(15, {
    direction: gpio.DIRECTION.OUT,
    ready: function() {
    }
});
// cam3 RED
var cam3red = gpio.export(23, {
    direction: gpio.DIRECTION.OUT,
    ready: function() {
    }
 });
// cam3 GREEN
var cam3green = gpio.export(24, {
    direction: gpio.DIRECTION.OUT,
    ready: function() {
    }
});

function switchRedLed(cam) {
    console.log('data: ' + cam);
    switch(cam.toString()) {
        case "cam1":
            cam1red.set();
            cam2red.set(0)
            cam3red.set(0)
            break;
        case "cam2":
            cam1red.set(0);
            cam2red.set();
            cam3red.set(0);
            break;
        case "cam3":
            cam1red.set(0);
            cam2red.set(0);
            cam3red.set();
            break;
    }

}

function switchGreenLed(cam) {
    console.log('data: ' + cam);
    switch(cam.toString()) {
        case "cam1":
            cam1green.set();
            cam2green.set(0);
            cam3green.set(0);
            break;
        case "cam2":
            cam1green.set(0);
            cam2green.set();
            cam3green.set(0);
            break;
        case "cam3":
            cam1green.set(0);
            cam2green.set(0);
            cam3green.set();
            break;
    }

}

const obs = new OBSWebSocket();
obs.connect({
        address: 'obs1.cloud1.se:4444',
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