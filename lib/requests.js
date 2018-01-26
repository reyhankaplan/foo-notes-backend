const food = require('./food')
const db = require('./db')
const debuglog = require('util').debuglog('http')
require('dotenv').config()

async function req(body, method) {
    let dataObj
    if (method !== 'GET') {
        try {
            dataObj = JSON.parse(body)
        } catch (e) {
            return {
                msg: `JSON parse: probably an empty request arrived: ${e}`,
                code: 500
            }
        }
    }

    console.log(method)
    let check, query, values
    switch (method) {
        case 'POST':
            query = db.queries.INSERT_RETURNING_ROW
            values = [dataObj.title, dataObj.content]
            check = food.checkForRequiredValues(dataObj, 'title', 'content')
            console.log(check)
            break
        case 'DELETE':
            query = db.queries.DELETE_RETURNING_ROW
            values = [dataObj.id]
            check = food.checkForRequiredValues(dataObj, 'id')
            console.log(check)
            break
        case 'PUT':
            query = db.queries.UPDATE_RETURNING_ROW
            values = [dataObj.id, dataObj.title, dataObj.content]
            check = food.checkForRequiredValues(
                dataObj,
                'id',
                'title',
                'content'
            )
            console.log(check)
            break
        case 'GET':
            query = db.queries.SELECT_ALL_NOTES
            break
    }
    if (method !== 'GET')
        if (!check.valid) {
            return { msg: check, code: 501 }
        }

    let res = {}
    await db
        .processQuery(query, values)
        .then(row => {
            res.msg = row
            res.code = 200
        })
        .catch(err => {
            res.msg = err
            res.code = 500
        })
    return res
}

module.exports = { req: req }
