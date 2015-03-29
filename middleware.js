var models = require('./models');
var utils = require('./utils');

module.exports.simpleAuth = function (req, res, next) {
    if (req.session && req.session.user) {
        models.User.findOne({
            email: req.session.user.email
        }, 'firstName lastName email', function (err, user) {
            if (user) {
                utils.createUserSession(req, res, user);
            }
            next();
        });
    } else {
        next();
    }
};