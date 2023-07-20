const { param } = require('../app');
const { sampleOutput } = require('../util/constants');
var svgCaptcha = require('svg-captcha');
const { v4: uuidv4 } = require('uuid');

const Service = require('./base').Service;


var captchaMap={}


class SaintService extends Service {
    constructor() {
        super();
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
      }
    list=async req=>{

        let queryParams=Object.keys(req.query)
        let nPages=0
        var limitingClause=``
        if(queryParams.indexOf('count')>=0)
            limitingClause=`limit ${req.query.count}`
        else if(queryParams.indexOf('countPerPage')>=0 && queryParams.indexOf('pageNo')>=0){
            var countQuery=`select count(*) from saint_saint where user_id = $1`
            var countParams=[req.body.user_id]
            var countResult=await this.query(countQuery,countParams)
    
            var nTotal=parseInt(countResult.data[0].count)
            var nCountPerPage=parseInt(req.query.countPerPage)
            var pageNo=parseInt(req.query.pageNo)
            limitingClause=`limit ${nCountPerPage} offset ${(pageNo-1)*nCountPerPage}`
            nPages=Math.ceil(parseFloat(nTotal)/parseFloat(nCountPerPage))
        }


        var query= `select * from saint_saint where user_id = $1 order by starting_timestamp desc ${limitingClause}`
        var params=[req.body.user_id]
        var result=await this.query(query,params)
        var saints=result.data
        saints.map((s,i)=>{
            var currentTimeSeconds=parseInt(Date.now()/1000)
            saints[i].updated_at=currentTimeSeconds
            saints[i].update_value=currentTimeSeconds>=s.estimated_ending_timestamp?1:(currentTimeSeconds-s.starting_timestamp)/(s.estimated_ending_timestamp-s.starting_timestamp)
            if(currentTimeSeconds>=s.estimated_ending_timestamp)
                saints[i].output={
                    data:sampleOutput
                }
            saints[i]['current_server_timestamp_seconds']=currentTimeSeconds
            delete saints[i].user_id
        })
        result.data=saints
        result['nPages']=nPages
        return result
    }

    create=async ({input,isPublic,user_id,captchaId,captchaString})=>{ 
        if(captchaMap[captchaId]===captchaString){
            delete captchaMap[captchaId]
            var isEmailPresentQuery=`select email from saint_user where id=$1`
            var isEmailPresentParams=[user_id]
            var isEmailPresentResult=await this.query(isEmailPresentQuery,isEmailPresentParams)
            console.log(isEmailPresentResult)
            if(isEmailPresentResult.data[0].email!==null && isEmailPresentResult.data[0].email.length>4){
                var valuesString=``
                var valueParams=[]
                input.data.map((d,ind)=>{
                    valuesString+=`(`
                    for (var i=1;i<=5;i++)
                        valuesString+=`$${ind*5+i}${i<5?',':''}`
                    valuesString+=`)${ind<input.data.length-1?',':''}`
                    valueParams.push(...[d,isPublic,user_id,parseInt(Date.now()/1000),parseInt(Date.now()/1000)+this.getRandomInt(180,240)])
                })
                var query=`insert into saint_saint(input,is_public,user_id,starting_timestamp,estimated_ending_timestamp) VALUES ${valuesString} returning id`
                var result=await this.query(query,valueParams)
                return {
                    success:true,
                    ids:result.data.map(d=>d.id)
                }
            }else{
                return {
                    success:false,
                    error:'Email is not present/Invalid Email'
                }
            }
        }else{
            delete captchaMap[captchaId]
            return {
                success:false,
                error:'Invalid Captcha'
            }
        }

        
    }

    getCaptcha=async (req)=>{


        if(Object.keys(req.query).indexOf('captchaId')>=0)
            delete captchaMap[req.query.captchaId]

        var captcha = svgCaptcha.create({
            size:5,
            noise:0
        })
        var captchaId=`${uuidv4()}${Date.now()}`
        captchaMap[captchaId]=captcha.text
        return {
            success:true,
            captchaId:captchaId,
            captchaImage:captcha.data
        }
    }

    listAll=async (req)=>{
        var countQuery=`select count(*) from saint_saint where is_public=$1`
        var countParams=[true]
        var countResult=await this.query(countQuery,countParams)

        var nTotal=parseInt(countResult.data[0].count)
        var nCountPerPage=parseInt(req.query.countPerPage)
        var pageNo=parseInt(req.query.pageNo)


        var nPages=Math.ceil(parseFloat(nTotal)/parseFloat(nCountPerPage))


        var query= `select u.name,u.institution ,u.field,  u.email, s.*  from saint_saint s, saint_user u where s.is_public= $1 and u.id=s.user_id order by s.starting_timestamp desc limit $2 offset $3`
        var params=[true,nCountPerPage,(pageNo-1)*nCountPerPage]
        var result=await this.query(query,params)
        var saints=result.data
        saints.map((s,i)=>{
            var currentTimeSeconds=parseInt(Date.now()/1000)
            saints[i].updated_at=currentTimeSeconds
            saints[i].update_value=currentTimeSeconds>=s.estimated_ending_timestamp?1:(currentTimeSeconds-s.starting_timestamp)/(s.estimated_ending_timestamp-s.starting_timestamp)
            if(currentTimeSeconds>=s.estimated_ending_timestamp)
                saints[i].output={
                    data:sampleOutput
                }
            saints[i]['current_server_timestamp_seconds']=currentTimeSeconds
            saints[i]['profile']={
                name:s.name,
                institution:s.institution,
                field:s.field,
                email:s.email
            }
            delete saints[i].name
            delete saints[i].user_id
            delete saints[i].institution
            delete saints[i].field
            delete saints[i].email
        })
        result.data=saints
        result['nPages']=nPages
        return result
    }
}

module.exports = {SaintService}