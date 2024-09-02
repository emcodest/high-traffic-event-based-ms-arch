
/** process job from the queu */
this.Process = (queue) => {
    queue.process(async (job) => {
        // Process the job data
        const result = await this.Logger(job.data);

        // Return the result, which marks the job as completed
        return result;
    });
}

this.Logger = async (job_data) => {
    console.log('\x1b[41m%s\x1b[0m', '### ', job_data)
    job_data.res.send("baddest ....")
    return true
}
//!++++++++++++++++++++++++++++++++++++++++++++
// | Events 
//++++++++++++++++++++++++++++++++++++++++++++
/** listen to events from the queu */
this.SetupEvents = (queue) => {
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