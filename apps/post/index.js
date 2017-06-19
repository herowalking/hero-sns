/**
 * Created by Lincoln on 6/17/2017.
 */

var model = require('../../config/model');
var express = require('express');
var router = express.Router();

const POST = model.Post;
const connect = model.connect;

router.get('/', function (req, res) {
    // res.send('hello user');

    if(req.query.offset && req.query.limit) {
        POST.findAll({
            offset: req.query.offset,
            limit: req.query.limit
        }).then(function (posts) {
            res.send(posts);
        });
    } else {
        POST.findAll().then(function (posts) {
            res.send(posts);
        });
    }
});

router.get('/detail', function (req, res) {
    // connect.query('SELECT * FROM posts JOIN users WHERE posts.userId = users.id', {method: POST})
    connect.query('SELECT * FROM posts JOIN users WHERE posts.userId = users.id', {model: POST})
        .then(function (results) {

            var jsonObj = [];
            for(var i=0; i<results.length; i++) {
                var obj = results[i].dataValues;
                console.log(obj);
                obj.user = {};
                obj.user.username = obj.username;
                obj.user.nickname = obj.nickname;
                obj.user.id = obj.userId;
                obj.user.logo = obj.logo;

                delete obj.username;
                delete obj.nickname;
                delete obj.userId;
                delete obj.logo;
                jsonObj.push(obj);
            }

            // res.send(results);
            res.send(jsonObj);
        })
});

module.exports = router;