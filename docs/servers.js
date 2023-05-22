module.exports = {
    servers:[
        {
            url:'https://saint-web-server.onrender.com/'
        },
        {
            url:`http://localhost:${process.env.PORT || 4000}/`
        }
    ]
}