const Controller = require("./base").Controller;
const AuthService=require("../service/auth").AuthService

const authService=new AuthService()

class AuthController extends Controller {
    constructor() {
        super();
    }
    login=async (req,res)=>{
        var loginResult=await authService.login(req.body)
        return res.status(loginResult.success?200:400).json(loginResult)
    }
    anonymousLogin=async (req,res)=>{
        var loginResult=await authService.anonymousLogin()
        return res.status(loginResult.success?200:400).json(loginResult)
    }
}

module.exports={AuthController}

