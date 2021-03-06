const { connect } = require('mongoose');

const dbConnect = () => connect('mongodb://127.0.0.1:27017/ac-membership', {useNewUrlParser: true})
    .then(console.log('Now connected to mongodb database'))
    .catch(err => console.error('Could not connect to database ', err.message));

module.exports = dbConnect;