/**
 * Created by Lincoln on 6/11/2017.
 */

var config = require('./config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('hero_sns', config.username, config.password);

const User = sequelize.define('user', {
    username: Sequelize.STRING,
    nickname: Sequelize.STRING,
    password: Sequelize.STRING,
    logo: Sequelize.STRING
});

const Post = sequelize.define('post', {
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    image: Sequelize.STRING
})
Post.belongsTo(User);

const Comment = sequelize.define('comment', {
    content: Sequelize.STRING
})
Comment.belongsTo(User);
Comment.belongsTo(Post);

const Star = sequelize.define('star', {

})
Star.belongsTo(User);
Star.belongsTo(Post);

const Reply = sequelize.define('reply', {
    content: Sequelize.STRING
})
Reply.belongsTo(Comment);

const Request = sequelize.define('request', {
    content: Sequelize.STRING,
    response: Sequelize.BOOLEAN,
    read: Sequelize.BOOLEAN
})

Request.belongsTo(User, {as: 'from'});
Request.belongsTo(User, {as: 'to'});

const Relation = sequelize.define('relation', {

})

User.belongsToMany(User, {as:'friend', through:Relation});

// const Friendship = sequelize.default('friendship', {
//
// })
// User.belongsToMany(User, {through:Friendship, as:'friend'})

// sequelize.sync({force: true});
sequelize.sync();

// sequelize.sync()
//     .then(() => User.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20)
// }))
// .then(jane => {
//     console.log(jane.get({
//     plain: true
// }));
// });

module.exports = {
    User,
    Post,
    Comment,
    Star,
    Reply,
    Request,
    Relation,
    connect:sequelize
}