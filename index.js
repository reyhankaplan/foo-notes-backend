const http = require('http')
const debuglog = require('util').debuglog('http')
const {req} = require('./lib/requests')
const { createHeaders } = require('./lib/food')

const server = http.createServer((request, response) => {
    let { method } = request

    debuglog(method)

    let body = ''
    request.on('data', chunk => {
        body += chunk
    })
    
    .on('end', () => {
        switch (method) {
            default:
                req(body,method).then(res => {
                    response.writeHead(res.code, createHeaders())
                    response.end(JSON.stringify(res.msg))
                })
                break
            case 'OPTIONS':
                response.writeHead(200, createHeaders())
                response.end(JSON.stringify({msg:'This response for CORS check of Google Chrome'}))
        }
    })
})
server.listen(8000)
