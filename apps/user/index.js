/**
 * Created by Lincoln on 6/17/2017.
 */

var express = require('express');
var router = express.Router();

var model = require('../../config/model');
const USER = model.User;

router.get('/', function (req, res) {
    // res.send('hello user');

    if(req.query.offset && req.query.limit) {
        USER.findAll({
            offset: req.query.offset,
            limit: req.query.limit
        }).then(function (users) {
            res.send(users);
        });
    } else {
        USER.findAll().then(function (users) {
            res.send(users);
        });
    }
});

module.exports = router;