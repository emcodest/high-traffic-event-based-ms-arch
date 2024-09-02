//!++++++++++++++++++++++++++++++++++++++++++++
// | This runs dynamically called fxns
// |  from the Consumer queue
//++++++++++++++++++++++++++++++++++++++++++++

/** add numbers */
this.AddNumber = async (job_data) => {
    try {
        const rst = +job_data.a + +job_data.b
        return rst
    } catch (ex) {
        console.log('\x1b[41m%s\x1b[0m', 'this.AddNumber Error: ', ex)
    }

    return false
}