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
    "value": otherTest,
    "args": [1],
    "afterEvent": {
        "emitter": events,
        "event": "fire"
    }
}, false).then(console.log);

queueSystem.addToQueue({
    "value": otherTest,
    "args": [2],
    "afterEvent": {
        "emitter": events,
        "event": "fire"
    }
}).then(console.log);

queueSystem.addToQueue({
    "value": otherTest,
    "args": [3],
    "afterEvent": {
        "emitter": events,
        "event": "fire"
    }
}).then(console.log);

queueSystem.addToQueue({
    "value": "This is a test",
    "afterEvent": {
        "emitter": events,
        "event": "fire"
    }
}).then(console.log);

queueSystem.addToQueue({
    "value": otherTest,
    "args": [4],
    "afterEvent": {
        "emitter": events,
        "event": "fire"
    }
}).then(console.log);

queueSystem.addToQueue({
    "value": ["Hell", "YEAH"],
    "afterEvent": {
        "emitter": events,
        "event": "fire"
    }
}).then(console.log);

queueSystem.addToQueue({
    "value": {
        "oh": "god"
    },
    "afterEvent": {
        "emitter": events,
        "event": "fire"
    }
}).then(console.log);

setInterval(() => {
    events.emit("fire");
}, 3000);

process.on('unhandledRejection', error => {
    // Prints "unhandledRejection woops!"
    console.log(error);
});
