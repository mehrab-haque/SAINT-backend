const managerialRegistration = require('./registration');
const managerialLogin = require('./login');

module.exports = {
    paths:{
        '/auth/register':{
            ...managerialRegistration
        },
        '/auth/login':{
            ...managerialLogin
        }
        // '/todos/{id}':{
        //     ...getTodo,
        //     ...updateTodo,
        //     ...deleteTodo
        // }
    }
}