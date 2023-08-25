const { authenticateUser } = require("../service/authMiddleWares");

const router = require("express-promise-router")();
const ProfileController=require('../controllers/profile').ProfileController

const profileController=new ProfileController()

router.route("/get").get(authenticateUser,profileController.get);
router.route("/update").put(authenticateUser,profileController.update);

module.exports=router