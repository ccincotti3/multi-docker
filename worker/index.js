const keys = require('./keys')
const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000 //if conn lost - retry once every 1 second
});
//sub = subscriptions
const sub = redisClient.duplicate();

function fib(index) {
    if (index < 2) return 1;
    return fib(index - 1) + fib(index - 2)
}

//when we get new message, run cb
sub.on('message', (channel, message) => {
    //insert into hash called 'values' a key of message (index we receive) and value of the result of fib()
    redisClient.hset('values', message, fib(parseInt(message)))
})

//Anytime anyone inserts a new value into redis we're going to get the fib value and toss it back into the redis instance
sub.subscribe('insert');