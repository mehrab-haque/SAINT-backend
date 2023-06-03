const router = require("express-promise-router")();
const AuthController=require('../controllers/auth').AuthController

const authController=new AuthController

router.route("/continue").post(authController.login);
router.route("/anonymousContinue").post(authController.anonymousLogin);

module.exports=router