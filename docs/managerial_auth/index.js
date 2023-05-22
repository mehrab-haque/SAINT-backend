const managerialRegistration = require('./registration');
const managerialLogin = require('./login');

module.exports = {
    paths:{
        '/admin/auth/register':{
            ...managerialRegistration
        },
        '/admin/auth/login':{
            ...managerialLogin
        }
        // '/todos/{id}':{
        //     ...getTodo,
        //     ...updateTodo,
        //     ...deleteTodo
        // }
    }
}