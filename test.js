const queueSystem = require("./index.js");

function testing(i) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(i);
        }, 2000);
    });
}

function otherTest(i) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(i);
        }, 500);
    });
}

function wut(i) {
    console.log(i);
    return i;
}

const eventEmitter = require("events");

let events = new eventEmitter.EventEmitter();

queueSystem.addToQueue({
    "value": wut,
    "args": [1],
    "afterEvent": {
        "emitter": events,
        "event": "fire"
    }
}, null, true).then(console.log);

queueSystem.addToQueue({
    "value": wut,
    "args": [2],
    "afterEvent": {
        "emitter": events,
        "event": "fire"
    }
}, null, true).then(console.log);

queueSystem.addToQueue({
    "value": wut,
    "args": [3],
    "afterEvent": {
        "emitter": events,
        "event": "fire"
    }
}, null, true).then(console.log);

queueSystem.addToQueue({
    "value": wut,
    "args": [4],
    "afterEvent": {
        "emitter": events,
        "event": "fire"
    }
}, null, true).then(console.log);

setInterval(() => {
    events.emit("fire");
}, 3000);

process.on('unhandledRejection', error => {
    // Prints "unhandledRejection woops!"
    console.log(error);
});
