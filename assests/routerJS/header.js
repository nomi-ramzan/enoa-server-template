module.exports = function(router, models/*, passport*/){
	var controllers = require('../controllers');
	var auth = controllers.auth;
	var rolToken = controllers.rolToken;
	var CTRLS = {};
	var MDLWS = {};
	function API_BLOCK (req, res){ res.status(404).json('API IS BLOCKED');}
	function SEND_200 (req, res, next){ return res.sendStatus(200); }
	function SEND_404 (req, res, next){ return res.sendStatus(404); }
	function SEND_BODY (req, res, next){ return res.status(200).json(req.body); }
	function q2q(req, res, next){ req.body = req.query; next(); }
	