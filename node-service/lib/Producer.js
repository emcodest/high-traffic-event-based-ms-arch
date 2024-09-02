const consumer = require("./Consumer")
const Queue = require('bull');

let EMCODE_TEST_QUEUE


this.GetEmcodeQueueClient = () => {
    if (EMCODE_TEST_QUEUE) return EMCODE_TEST_QUEUE

    // Create a queue named "myQueue"
    EMCODE_TEST_QUEUE = new Queue('EMCODE_TEST_QUEUE', {
        redis: {
            // host: '127.0.0.1',
            host: '77.237.232.45',
            port: 6379
        }
    })

    // start consuming queue
    // Process jobs from the queue
    //!++++++++++++++++++++++++++++++++++++++++++++
    // | Initialize the Consumer 
    //++++++++++++++++++++++++++++++++++++++++++++
    // consumer.SetupEvents(EMCODE_TEST_QUEUE)
    // consumer.Process(EMCODE_TEST_QUEUE)

    console.log('\x1b[41m%s\x1b[0m', '## started event queue', '')

    return EMCODE_TEST_QUEUE
}


// Function to add jobs to the queue
this.AddJobToQueue = async (queue, data) => {
    await queue.add(data, {
        attempts: 3, // Retry up to 3 times if the job fails
        backoff: 5000, // Optional: wait 5 seconds before retrying
       // removeOnComplete: true // Remove the job from Redis once it's completed
        removeOnComplete: 500 // keep 500 recent jobs
    });
    //  await myQueue.add(data);
    // console.log('Job added:', data);
    return true
};
