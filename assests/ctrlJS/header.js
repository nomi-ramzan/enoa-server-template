var jws = require('jws')
  , moment = require('moment')
  , Utils = {}
  ;
  /*GLOBAL VARIABLES S*/
var config = require('../config');
var ENM = config.ENM;

/* INIT Section Sstart*/

/* INIT Section E*/

  /*GLOBAL VARIABLES End*/


Utils.getToken = function(payload, callback){
  var token = jws.sign({ header: ENM.TOKEN.SECR.HEADER, payload: payload, secret: ENM.TOKEN.SECR.KEY });
  return (callback) ? callback(null, token) : token;
};
Utils.decodeToken = function(token, callback){
  var pLoad = JSON.parse(jws.decode(token).payload);
  return (callback) ? callback(null, pLoad) : pLoad;
};

module.exports.auth = function(req, res, next){
  try{
    if( !req.headers || !req.headers.authorization ) return res.status(ENM.CODES.BAD).json({msg:MsgJS.INVALID_DATAS, data:{name:MsgJS.WORDS.CREDENTIALS}});
    var parts = req.headers.authorization.split(' ');
    if(parts.length != 2 || !/^Bearer$/i.test(parts[0])) return res.status(ENM.CODES.BAD).json({msg:MsgJS.INVALID_DATAS, data:{name:MsgJS.WORDS.CREDENTIALS}});
    var token = parts[1];
    if(jws.verify(token, ENM.TOKEN.SECR.HEADER.alg, ENM.TOKEN.SECR.KEY) == false) return res.status(ENM.CODES.UN_AUTH).json({msg:MsgJS.INVALID_DATAS, data:{name:MsgJS.WORDS.CREDENTIALS}});
    req.user = Utils.decodeToken(token);
    if(req.user.exp != undefined && req.user.exp < moment().format('x')) return res.status(ENM.CODES.UN_AUTH).json({msg:MsgJS.ERRORS.TOKEN_EXP});
    next();
  }catch(e){ return sendError(e, res); }
}
module.exports.rolToken = function(req, res, next){
  try{
    var token = req.body.token || req.query.token || req.params.token || "";
    if(jws.verify(token, ENM.TOKEN.SECR.HEADER.alg, ENM.TOKEN.SECR.KEY) == false) return res.status(ENM.CODES.BAD).json({msg:MsgJS.TOKEN_INVALID_MSG});
    if(token.indexOf('Bearer') == -1) token = "Bearer "+token;
    req.headers.authorization = token;
    return module.exports.auth(req, res, next);
  }catch(e){
    return sendError(e, res);
  }
}



  /* NOMI */
function sendError (err, res){
  if(!res || !res.status) return console.log('Error Skip... Tech:- check req parama');
  try {
    res.status(err.status || err.code || 500 ).json(err);
  }
  catch(exp){ console.log(exp); return; }
}