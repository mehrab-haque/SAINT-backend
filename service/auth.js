const Service = require('./base').Service;
const bcrypt=require('bcryptjs')
const JWT = require('jsonwebtoken');

class AuthService extends Service {
    constructor() {
        super();
    }
    signToken = user =>{
        return JWT.sign(user, process.env.JWT_SECRET);
    }
    register=async (reqObj)=>{
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(reqObj.password,salt)
        var query=`INSERT INTO auth(type,login,password) VALUES($1,$2,$3)`
        var params=[reqObj.type,reqObj.login,hashedPass]
        var result=await this.query(query,params)
        return result
    }

    login=async ({login,password})=>{
        var loginFindQuery=`SELECT * FROM auth WHERE login = $1`
        var loginFindParams=[login]
        var loginFindResult=await this.query(loginFindQuery,loginFindParams)
        if(loginFindResult.data.length===0)
            return{
                success:false,
                error:'user not found'
            }
        else{
            var hashedPass=loginFindResult.data[0].password
            const isPassValid=await bcrypt.compare(password,hashedPass)
            if(!isPassValid)
                return{
                    success:false,
                    error:'wrong password'
                }
            else{
                var tokenObject={
                    id:loginFindResult.data[0].id,
                    type:loginFindResult.data[0].type,
                    login:loginFindResult.data[0].login,
                    createdAt:Date.now()
                }
                const token=this.signToken(tokenObject)
                return{
                    success:true,
                    token
                }
            }
        }
    }
}

module.exports = {AuthService}