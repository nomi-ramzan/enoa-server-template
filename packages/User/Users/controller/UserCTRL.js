module.exports.userCtrl = function(models){
  var methods = {};
  var userModel = models.user;
  methods.saveUser = function (req, res, next) {
  	userModel.create(req.body).exec(function(err, user){
  		if(err) return res.status(500).json(err);
  		return res.status(200).json(user);
  	});
  }

  methods.getUsers = function (req, res, next) {
  	userModel.find().exec(function(err, users) {
  	console.log("Call....!", err, users);
  		if(err) return res.status(500).json(err);
  		return res.status(200).json(users);
  	});
  }
  return methods;
}
