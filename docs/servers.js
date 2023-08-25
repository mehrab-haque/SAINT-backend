module.exports = {
    servers:[
        {
            url:'https://saint-mogl.onrender.com/'
        },
        {
            url:`http://localhost:${process.env.PORT || 4000}/`
        }
    ]
}