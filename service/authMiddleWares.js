const jwt = require('jsonwebtoken');

var authenticateUser=(req, res, next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    try{
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body['user_id']=decoded.id
        next()
    }catch(err){
        return res.sendStatus(403)
    }
}

module.exports={
    authenticateUser
}