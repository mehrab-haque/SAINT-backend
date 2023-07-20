const Controller = require("./base").Controller;
const SaintService=require("../service/saint").SaintService

const saintService=new SaintService()

class SaintController extends Controller {
    constructor() {
        super();
    }
    list=async (req,res)=>{
        var result=await saintService.list(req)
        return res.status(result.success?200:400).json(result)
    }
    listAll=async (req,res)=>{
        var result=await saintService.listAll(req)
        return res.status(result.success?200:400).json(result)
    }
    create=async (req,res)=>{
        var result=await saintService.create(req.body)
        return res.status(result.success?200:400).json(result)
    }

    getCaptcha=async (req,res)=>{
        var result=await saintService.getCaptcha(req)
        return res.status(result.success?200:400).json(result)
    }
}

module.exports={SaintController}

