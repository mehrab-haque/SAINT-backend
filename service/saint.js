const Service = require('./base').Service;

class SaintService extends Service {
    constructor() {
        super();
    }
    list=async req=>{
        var query= `select * from saint_saint where user_id = $1`
        var params=[req.body.user_id]
        var result=await this.query(query,params)
        var saints=result.data
        saints.map((s,i)=>{
            var currentTimeSeconds=parseInt(Date.now()/1000)
            saints[i].updated_at=currentTimeSeconds
            saints[i].update_value=currentTimeSeconds>=s.estimated_ending_timestamp?1:(currentTimeSeconds-s.starting_timestamp)/(s.estimated_ending_timestamp-s.starting_timestamp)
            if(currentTimeSeconds>=s.estimated_ending_timestamp)
                saints[i].output={
                    data:'SAINT OUTPUT'
                }
            saints[i]['current_server_timestamp_seconds']=currentTimeSeconds
            delete saints[i].user_id
        })
        result.data=saints
        return result
    }
    create=async ({input,isPublic,user_id})=>{
        var query=`insert into saint_saint(input,is_public,user_id,starting_timestamp,estimated_ending_timestamp) VALUES ($1,$2,$3,$4,$5)`
        var params=[input,isPublic,user_id,parseInt(Date.now()/1000),parseInt(Date.now()/1000)+64]
        var result=await this.query(query,params)
        return result
    }

    listAll=async ()=>{
        var query= `select * from saint_saint s, saint_user u where s.is_public= $1 and u.id=s.user_id order by s.starting_timestamp desc`
        var params=[true]
        var result=await this.query(query,params)
        var saints=result.data
        saints.map((s,i)=>{
            var currentTimeSeconds=parseInt(Date.now()/1000)
            saints[i].updated_at=currentTimeSeconds
            saints[i].update_value=currentTimeSeconds>=s.estimated_ending_timestamp?1:(currentTimeSeconds-s.starting_timestamp)/(s.estimated_ending_timestamp-s.starting_timestamp)
            if(currentTimeSeconds>=s.estimated_ending_timestamp)
                saints[i].output={
                    data:'SAINT OUTPUT'
                }
            saints[i]['current_server_timestamp_seconds']=currentTimeSeconds
            saints[i]['profile']={
                name:s.name,
                institution:s.institution,
                field:s.field,
                email:s.email
            }
            delete saints[i].name
            delete saints[i].institution
            delete saints[i].field
            delete saints[i].email
            delete saints[i].login
            delete saints[i].password
            delete saints[i].type
            delete saints[i].user_id
        })
        result.data=saints
        return result
    }
}

module.exports = {SaintService}