const Service = require('./base').Service;
const bcrypt=require('bcryptjs')
const JWT = require('jsonwebtoken');
const { accountTypes } = require('../util/constants');

class AuthService extends Service {
    constructor() {
        super();
    }
    signToken = user =>{
        return JWT.sign(user, process.env.JWT_SECRET);
    }

    anonymousLogin=async ()=>{
        var query=`INSERT INTO saint_user(type) VALUES($1) returning id`
        var params=[accountTypes.anonymousUser]
        var result=await this.query(query,params)
        var saintUserId=result.data[0].id
        var tokenObject={
            id:saintUserId,
            type:accountTypes.anonymousUser,
            createdAt:Date.now()
        }
        const token=this.signToken(tokenObject)
        return{
            success:true,
            token
        }
    }

    login=async ({login,password,anonymousToken})=>{
        var loginFindQuery=`SELECT * FROM saint_user WHERE login = $1`
        var loginFindParams=[login]
        var loginFindResult=await this.query(loginFindQuery,loginFindParams)
        if(loginFindResult.data.length===0){
            const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(password,salt)
            if(anonymousToken && anonymousToken.length>0){
                try{
                    var decoded = JWT.verify(anonymousToken, process.env.JWT_SECRET);
                    if(decoded.type===accountTypes.anonymousUser){
                        //update
                        var updateQuery=`UPDATE saint_user SET type = $1 , login = $2 , password = $3 WHERE id = $4`
                        var updateParams=[accountTypes.userEmailPassword,login,hashedPass,decoded.id]
                        await this.query(updateQuery,updateParams)
                        var updatedTokenObject={
                            id:decoded.id,
                            type:accountTypes.userEmailPassword,
                            createdAt:Date.now()
                        }
                        const updatedToken=this.signToken(updatedTokenObject)
                        return{
                            success:true,
                            token:updatedToken
                        }
                    }
                }catch(err){}
            }
            //create
            var query=`INSERT INTO saint_user(type,login,password) VALUES($1,$2,$3) returning id`
            var params=[accountTypes.userEmailPassword,login,hashedPass]
            var result=await this.query(query,params)
            var saintUserId=result.data[0].id
            var tokenObject={
                id:saintUserId,
                type:accountTypes.userEmailPassword,
                createdAt:Date.now()
            }
            const token=this.signToken(tokenObject)
            return{
                success:true,
                token
            }
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