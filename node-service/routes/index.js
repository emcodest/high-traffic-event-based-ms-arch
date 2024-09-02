const express = require('express');
const router = express.Router();
const producer = require("../lib/Producer")
const topic_client = producer.GetEmcodeQueueClient()
router.get('/', function (req, res, next) {
  const job_data = {
    fn: "AddNumber",
    data: { a: 23, b: Math.floor(Math.random() * 10) + 1 },
  }
  // add job
  producer.AddJobToQueue(topic_client, job_data)
  //todo: also log job in mysql
  //console.log("### cool ", topic_client)

  res.send("Job added")
});

module.exports = router;
