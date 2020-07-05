const mongoDB = require('mongoose');

const { DATA_SOURCE } = process.env;
const uri = DATA_SOURCE;

mongoDB.set('useUnifiedTopology', true);
mongoDB.connect(uri,{
    useNewUrlParser: true
}).then(db => console.log('DB is connect'))
.catch(err => console.log('ERROR', err));