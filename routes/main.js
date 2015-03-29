var express = require('express');
var models = require('../models');
var utils = require('../utils');

var router = express.Router();

/**
 * Render the home page.
 */
router.get('/', function (req, res) {
    res.render('index.jade');
});

/**
 * Render the dashboard page.
 */
router.get('/dashboard', utils.requireLogin, function (req, res) {
    models.Todo.find({
        user: req.session.user.email
    }, function (err, todos) {
        utils.createUserTodos(req, res, todos);

        res.render('dashboard.jade', {
            csrfToken: req.csrfToken()
        });
    });
});

router.post('/dashboard', function (req, res) {
    var todo = new models.Todo({
        body: req.body.body,
        user: req.session.user.email
    });

    todo.save(function (err) {
        var error = 'Something bad happened!';
        if (err) {
            res.redirect('/dashboard', {
                err: error
            });
        }
    });
    res.redirect('/dashboard');
});

router.post('/deleteTodo', function (req, res) {
    console.log(req.body.id);
    models.Todo.remove({
        id: req.body.id
    });
    res.redirect('/dashboard', {
        csrfToken: req.csrfToken()
    });
})
module.exports = router;