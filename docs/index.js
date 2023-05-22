
const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const managerialAuth = require('./auth');

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...managerialAuth
};