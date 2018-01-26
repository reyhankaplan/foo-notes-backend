const http = require('http')
const debuglog = require('util').debuglog('http')
const {req} = require('./lib/requests')
const { createHeaders } = require('./lib/food')

const server = http.createServer((request, response) => {
    let { method } = request

    debuglog(method)

    /**
     * Data event'ı dinlenerek request ile gelen veri alınmıstır
     */
    let body = ''
    request.on('data', chunk => {
        body += chunk
    })
    
    .on('end', () => {
        /**
        * Veri alımı bittikten sonra OPTIONS metodları ile POST, GET gibi
        * standart metodlar ayrılmıstır.
        *
        * CORS: Cross Origin Resource Sharing. CORS farkli domainlerden
        * request almamızı sağlar ancak bunun için Google Chrome, header'ları kontrol
        * etmek amacıyla OPTIONS metoduyla bir request gönderir
        * 
        * Burada OPTIONS metodlarına standart header'lar ile 200 statusunda bir
        * response gönderiliyor. Ve diger metodlar icin lib dizininde requests icerisinde
        * yazdığımm req fonksiyonunda islemler yapılıyor. Bu fonksyon async bir fonksiyon
        * ve bu yuzden Promise döndürüyor
        */

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
