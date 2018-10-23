var express = require('express');
var router = express.Router();
var database = require('../mysql.js');

	
//登录
router.post('/arteryflow/login', function (req, res) {
  if (!req.session.users) {
    req.session.users = {}
  }
  var token;
	var sql = 'SELECT * from user where userName = "'+req.body.userName+'" and userPass = "'+req.body.userPass+'"';
	database(sql, function (error, results, fields) {
	    if (error) throw error
	    var code = results[0] ? 200 : -1, msg = {code:code};
	    if (code === 200) {
			msg.token = req.body.userName;
	    }
	    res.end(JSON.stringify(msg))
	})
//
	function randomString (len) { // random a string
	    　len = len || 32
	    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	    var maxPos = $chars.length;
	    var pwd = '';
	    　　for (var i = 0; i < len; i++) {
	      　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
	    　　}
	    　　return pwd
	}
});
module.exports = router;
  