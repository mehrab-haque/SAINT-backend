module.exports = {
    components:{
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                in: 'header',
                name: 'Authorization',
                description: 'Bearer token to access these api endpoints',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas:{
            auth:{
                hidden:true,
                type:"object",
                properties:{
                    login:{
                        type:"string",
                        description:"unique login string",
                        example:"login_string"
                    },
                    password:{
                        type:"string",
                        description:"password string",
                        example:"password_string"
                    },
                    anonymousToken:{
                        type:"string",
                        description:"(optional) anonymous token",
                        example:"anonymous_token"
                    }
                }
            },
            profile:{
                hidden:true,
                type:"object",
                properties:{
                    name:{
                        type:"string",
                        description:"name",
                        example:"name"
                    },
                    institution:{
                        type:"string",
                        description:"institution",
                        example:"institution"
                    },
                    field:{
                        type:"string",
                        description:"field of work/interest",
                        example:"microbiology"
                    },
                    email:{
                        type:"string",
                        description:"email",
                        example:"email"
                    }
    
                }
            },
            saint:{
                hidden:true,
                type:"object",
                properties:{
                    input:{
                        type:"object",
                        description:"saint input data formatted from frontend"
                    },
                    isPublic:{
                        type:"boolean",
                        description:"Whether this SAINT can be availed publicly or not",
                        example:"true"
                    }    
                }
            }
        }
    }
}