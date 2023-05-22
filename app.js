const express = require('express');
const cors = require('cors')
const bodyParser=require('body-parser')
const swaggarUi=require('swagger-ui-express')
const docs = require('./docs')
const adminAuthRoutes=require('./routes/auth')
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


const port = process.env.PORT || 4000;

app.use('/api-docs',swaggarUi.serve,swaggarUi.setup(docs))


app.get("/ping", function (req, res) {
    res.json({
        message:'hello world'
    });
});

app.use('/auth', adminAuthRoutes);

module.exports = app;