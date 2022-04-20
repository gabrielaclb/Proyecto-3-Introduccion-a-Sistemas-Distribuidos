const mysql = require('mysql2');

const pool = mysql.createPool(
    {
        connectionLimit: 10,
        host: '172.17.0.1',
        port: '33062',
        user: 'root',
        password: 'secret',
        database: 'auth_db'
    }
)

const db = (() => {

  const _query = (query, params, callback) => {
    pool.getConnection((err, connection) => {

      if (err) {
        console.log(err);
        connection.release()
        callback(null, err)
        throw err
      }

      connection.query(query, params, (err, rows) => {
        connection.release()
        
        if (!err)
          callback(rows)

        else
          callback(null, err)
      })

    })
  }

  const _asyncQuery = async(query, params) =>{
    return await new Promise((resolve,reject)=>{
      db.queryCallback(query,params,(result, err)=>{
        if(err){
          reject(err)
        }  
        resolve(result);
    })
  }).then(data =>{return data })};

  return {
    query: _asyncQuery,
    queryCallback: _query
  }

})()

module.exports = db;
