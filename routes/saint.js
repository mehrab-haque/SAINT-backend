const { authenticateUser } = require("../service/authMiddleWares");

const router = require("express-promise-router")();
const SaintController=require('../controllers/saint').SaintController

const saintController=new SaintController()

router.route("/list").get(authenticateUser,saintController.list);
router.route("/listAll").get(saintController.listAll);
router.route("/create").post(authenticateUser,saintController.create);
router.route("/getCaptcha").get(saintController.getCaptcha);

module.exports=router