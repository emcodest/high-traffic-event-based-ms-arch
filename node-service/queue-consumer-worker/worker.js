
const Queue = require('bull');
const queue = new Queue('EMCODE_TEST_QUEUE', {
    redis: {
        // host: '127.0.0.1',
        host: '77.237.232.45',
        port: 6379
    }
})


/** process job from the queu */
this.Process = () => {
    console.log('\x1b[41m%s\x1b[0m', '## consumer workers started ...')
    queue.process(async (job) => {
        console.log("## job.id ", job.id)
        // Process the job data
        const result = await this.Logger(job.data);

        // Return the result, which marks the job as completed
        return result;
    });
}

this.Logger = async (job_data) => {
    console.log('\x1b[41m%s\x1b[0m', '### job_data received', job_data)
    // job_data.res.send("baddest ....") // error
    return true
}
//!++++++++++++++++++++++++++++++++++++++++++++
// | Events 
//++++++++++++++++++++++++++++++++++++++++++++
/** listen to events from the queu */
this.SetupEvents = () => {
    // Listen for events
    queue.on('waiting', (jobId) => {
        console.log(`Job ${jobId} is waiting to be processed`);
    });

    queue.on('active', (job) => {
        console.log(`Job ${job.id} is now active`);
    });

    queue.on('completed', (job, result) => {
        console.log(`Job ${job.id} completed with result ${result}`);
    });

    queue.on('failed', (job, err) => {
        console.error(`Job ${job.id} failed with error ${err.message}`);
    });
    // Optional: Handle errors
    queue.on('error', (error) => {
        console.error('Queue error:', error);
    });
}


//!++++++++++++++++++++++++++++++++++++++++++++
// | start consuming ... 
//++++++++++++++++++++++++++++++++++++++++++++
this.Process()