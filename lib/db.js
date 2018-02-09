const { Client } = require('pg')

/**
 * Burada veritabanı ile iletişim esnasında kullanacağım sorguları 
 * sabit olarak tanımladım 
 * 
 * $1, $2 içerisine sonradan değer alacak olan değişkenlerdir
 */
const Queries = {
    SELECT_ALL_NOTES : 'select * from notes',
    INSERT_RETURNING_ROW : 'insert into notes (title, contentt) values($1, $2) returning *',
    DELETE_RETURNING_ROW : 'delete from notes where id=$1 returning *',
    UPDATE_RETURNING_ROW : 'update notes set title=$2, contentt=$3 where id=$1 returning *'
}
/**
 * Queries object'i ve processQuery fonksiyonu requests dosyasından
 * çağırılır ve veritabanı işlemlerini gerçekleştirir.
 * 
 * processQuery fonksiyonunun ilk parametresi Queries obkect'inden 
 * seçilebilecek olan SQL sorgusudur
 * 
 * İkinci parametresi ise o sorguya geçilebilecek parametreleri içeren bir dizidir.
 * Örneğin, bu dizinin birinci elemanı $1 yerine sorguya geçirilecektir
 */
async function processQuery(query, values) {

    const client = new Client() 
    // bağlantı için .env dosyasındaki çevre değişkenlerini kullanır
      
    try {
        
        await client.connect()

        let res = await client.query({text:query, values:values})

        if(res.rows) {
            res.rows.forEach(r =>  {
                r.content = r.contentt
            delete r.contentt
            })
        }
        return res.rows

    }catch(e) {
        throw e
    }finally{
        client.end()
    }
}

module.exports = {queries:Queries, processQuery:processQuery}
