require('dotenv').config();

const app = require('./src/server')

app.listen(app.get('port'), ()=>{
    console.log(`Api running into port: ${app.get('port')}`)
});