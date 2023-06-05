const Service = require('./base').Service;

class ProfileService extends Service {
    constructor() {
        super();
    }
    get=async req=>{
        var query= `select name, institution, field, email from saint_user where id = $1`
        var params=[req.body.user_id]
        var result=await this.query(query,params)
        if(result.data.length===0){
            result.success=false
            result.data=null
        }else
        result.data=result.data[0]
        return result
    }
    update=async ({name,institution,field,email,user_id})=>{
        var query=`update saint_user set name = $1, institution = $2, field = $3, email = $4 where id = $5`
        var params=[name,institution,field,email,user_id]
        var result=await this.query(query,params)
        return result
    }
}

module.exports = {ProfileService}