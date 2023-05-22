const router = require("express-promise-router")();
const AuthController=require('../controllers/auth').AuthController

const authController=new AuthController

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

module.exports=router