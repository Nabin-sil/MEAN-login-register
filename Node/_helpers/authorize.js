const jwt = require('express-jwt');
const userService = require('../users/user.service');
const { secret } = require('config.json');
const db = require('_helpers/db');


module.exports = authorize;

function authorize() {
//    const secret = config.secret;
    return jwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
        ]
    });
}

// function authorize(roles = []) {
//     // roles param can be a single role string (e.g. Role.User or 'User') 
//     // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
//     if (typeof roles === 'string') {
//         roles = [roles];
//     }

//     return [
//         // authenticate JWT token and attach user to request object (req.user)
//         jwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
//             path: [
//                 // public routes that don't require authentication
//                 '/users/authenticate',
//                 '/users/register'
//             ]
//         }),
//         // authorize based on user role
//         async (req, res, next) => {
//          //   const user = await db.User.findById(req.user.id);

//             if (roles.length && !roles.includes(req.user.role)) {
//                 // user's role is not authorized
//                 return res.status(401).json({ message: 'Unauthorized' });
//             }

//             // if (!user || (roles.length && !roles.includes(user.role))) {
//             //     // account no longer exists or role not authorized
//             //     return res.status(401).json({ message: 'Unauthorized' });
//             // }

//             // req.user.role = user.role;
//             // authentication and authorization successful
//             next();
//         }
//     ];
// }



async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};