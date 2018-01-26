function createHeaders () {
    return {
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Cache-Control',
        'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE'
    }
}

function checkForRequiredValues(data, ...values) {
    let res = {valid:true, reasons:[]}
    values.forEach(e => {
        if(!data[e]) {
            res.valid=false
            res.reasons.push(`Need ${e}`)
        }
    })
    return res
}


module.exports = {createHeaders: createHeaders, checkForRequiredValues:checkForRequiredValues}