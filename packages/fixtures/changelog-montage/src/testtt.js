class PubSub {
    #eventSTack;
    constructor() {
        this.#eventSTack = {};
    }

    subscribe(topic, cb) {
        if (!this.#eventSTack[topic]) {
            this.#eventSTack[topic] = [];
        }
        this.#eventSTack[topic].push(cb);
    }

    publish(topic, ...rest) {
        if (!this.#eventSTack[topic]) {
            console.warn('The topic is not in this pubsub stack, please subscribe first!');
            return;
        }
        this.#eventSTack[topic].forEach((cb) => {
            cb.apply(this, rest);
        });
    }
}

const pub = new PubSub();

pub.subscribe('topic1', (data) => {
    console.log(data);
});
pub.subscribe('topic1', (data) => {
    console.log(data);
});

pub.publish('topic1', '该订阅已被发布');

console.log(pub.#eventSTack);
