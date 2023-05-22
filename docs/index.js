
const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const managerialAuth = require('./managerial_auth');

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...managerialAuth
};