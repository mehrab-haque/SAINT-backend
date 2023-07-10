const Service = require('./base').Service;

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
        var query= `select * from saint_saint where user_id = $1 order by starting_timestamp desc ${Object.keys(req.query).indexOf('count')>=0?`limit ${req.query.count}`:''}`
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
        var query=`insert into saint_saint(input,is_public,user_id,starting_timestamp,estimated_ending_timestamp) VALUES ($1,$2,$3,$4,$5) returning id`
        var params=[input,isPublic,user_id,parseInt(Date.now()/1000),parseInt(Date.now()/1000)+this.getRandomInt(120,240)]
        var result=await this.query(query,params)
        return {
            success:true,
            id:result.data[0].id
        }
    }

    listAll=async ()=>{
        var query= `select u.name,u.institution ,u.field,  u.email, s.*  from saint_saint s, saint_user u where s.is_public= $1 and u.id=s.user_id order by s.starting_timestamp desc`
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
            delete saints[i].user_id
            delete saints[i].institution
            delete saints[i].field
            delete saints[i].email
        })
        result.data=saints
        return result
    }
}

module.exports = {SaintService}