
module.exports = {
    components:{
        schemas:{
            reg:{
                hidden:true,
                type:"object",
                properties:{
                    login:{
                        type:"string",
                        description:"unique login string for registration",
                        example:"login_string"
                    },
                    password:{
                        type:"string",
                        description:"password used for registration",
                        example:"password_string"
                    },
                    type:{
                        type:"integer",
                        description:"email+pass=1",
                        example:1
                    }
                }
            },
            login:{
                hidden:true,
                type:"object",
                properties:{
                    login:{
                        type:"string",
                        description:"login string used while registration",
                        example:"login_string"
                    },
                    password:{
                        type:"string",
                        description:"password used while registration",
                        example:"password_string"
                    }
                }
            }
        }
    }
}