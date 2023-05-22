
module.exports = {
    components:{
        schemas:{
            managerial_reg:{
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
                    name:{
                        type:"string",
                        description:"name used for registration",
                        example:"name_string"
                    },
                    type:{
                        type:"integer",
                        description:"admin=1,moderator=2",
                        example:1
                    }
                }
            },
            managerial_login:{
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