const Controller = require("./base").Controller;
const ProfileService=require("../service/profile").ProfileService

const profileService=new ProfileService()

class ProfileController extends Controller {
    constructor() {
        super();
    }
    get=async (req,res)=>{
        var result=await profileService.get(req)
        return res.status(result.success?200:400).json(result)
    }
    update=async (req,res)=>{
        var result=await profileService.update(req.body)
        return res.status(result.success?200:400).json(result)
    }
}

module.exports={ProfileController}

