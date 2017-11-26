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

const eventEmitter = require("events");

let events = new eventEmitter.EventEmitter();

queueSystem.addToQueue({
    "value": "lol",
    "afterEvent": {
        "emitter": events,
        "event": "fire"
    }
}).then(console.log);

queueSystem.addToQueue({
    "value": "what",
    "afterEvent": {
        "emitter": events,
        "event": "fire"
    }
}).then(console.log);

setInterval(() => {
    events.emit("fire");
}, 10000);

process.on('unhandledRejection', error => {
    // Prints "unhandledRejection woops!"
    console.log(error);
});
