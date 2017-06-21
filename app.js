/**
 * Created by Lincoln on 6/11/2017.
 */

var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.set('json spaces', 4);
app.use(bodyParser({
    urlencoded:false
}));

var user = require('./apps/user');
var post = require('./apps/post');
var comment = require('./apps/comment');

app.get('/', function (req, res) {
    res.send('hello node')
})

app.use(cors());
app.use('/user', user);
app.use('/post', post);
app.use('/comment', comment);

app.listen(3000, function () {
    console.log("server is running on port 3000");
});