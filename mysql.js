var mysql = require('mysql');
// 连接数据库
var pool = mysql.createPool({
	host: '127.0.0.1', //主机
	user: 'root', //MySQL认证用户名
	password: 'root',
	port: '3306',
	database: 'arteryflow'
});

//var connection = mysql.createConnection({
//	host: '127.0.0.1', //主机
//	user: 'root', //MySQL认证用户名
//	password: 'arteryflow',
//	port: '3308',
//	database: 'arteryflow'
//});
var query = function (sql, callback) {
   pool.getConnection(function (err, conn) {
    if (err) {
      callback(err, null, null)
    } else {
      conn.query(sql, function (qerr, vals, fields) {
        conn.release()// 释放链接
        console.log('A connection has been release')
        callback(qerr, vals, fields)// 事件驱动回掉
      })
    }
  })
}

module.exports = query;

