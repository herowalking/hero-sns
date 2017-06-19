/**
 * Created by Lincoln on 6/17/2017.
 */

var express = require('express');
var router = express.Router();

var model = require('../../config/model');
const COMMENT = model.Comment;

router.get('/', function (req, res) {
    // res.send('hello user');

    if(req.query.offset && req.query.limit) {
        COMMENT.findAll({
            offset: req.query.offset,
            limit: req.query.limit
        }).then(function (comments) {
            res.send(comments);
        });
    } else {
        COMMENT.findAll().then(function (comments) {
            res.send(comments);
        });
    }
});

module.exports = router;