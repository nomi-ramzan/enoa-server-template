var async = require('async')
  , express = require('express')
  , conf = require('./config')
  , parser  = require('body-parser')
  , Waterline = require('waterline')
  
  , router  = express.Router()
  , app = express()
  , orm = Waterline()


app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
if(conf.publicApp) app.use(express.static(__dirname + (conf.publicApp || '/public')));

app.get('/', function(req, res, nxt){
	res.status(200).json("Working....!");
});
async.waterfall([
	function(done){ require('./models')(Waterline, orm, conf.EnumsJS); done(); }
	, function(done){ orm.initialize(conf.DB, done); }
	, function(ormObj, done){
		app.models = ormObj.collections;
		app.connections = ormObj.connections;
		done();
	}
	, function(done){ require('./router')(router, app.models); done(); }
	, function(done){ 
		app.use(router);
		app.listen(conf.PORT, done);
	}
], function(err){
	if(err){ console.log(err); process.exit(); }
	console.log('Server is running in port'+conf.PORT);
})