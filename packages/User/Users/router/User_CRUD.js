CTRLS.userCtrl = CTRLS.userCtrl || controllers.userCtrl(models);
MDLWS.userMDLW = MDLWS.userMDLW || controllers.userMDLW(models);

router.route('/user/new').post(CTRLS.userCtrl.saveUser);
router.route('/users').get(CTRLS.userCtrl.getUsers);
