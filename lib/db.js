const { Pool } = require('pg')

const Queries = {
    SELECT_ALL_NOTES : 'select * from notes',
    INSERT_RETURNING_ROW : 'insert into notes (title, contentt) values($1, $2) returning *',
    DELETE_RETURNING_ROW : 'delete from notes where id=$1 returning *',
    UPDATE_RETURNING_ROW : 'update notes set title=$2, contentt=$3 where id=$1 returning *'
}

async function processQuery(query, values) {

    const pool = new Pool() // uses global variables for connections (.env file) 
      
    try {
        
        await pool.connect()

        let res = await pool.query({text:query, values:values})

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
        pool.end()
    }
}

module.exports = {queries:Queries, processQuery:processQuery}
