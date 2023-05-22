module.exports = {
    servers:[
        {
            url:'https://binary-school-dev.onrender.com/'
        },
        {
            url:`http://localhost:${process.env.PORT || 4000}/`
        }
    ]
}