const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const boot = require('./config/boot')
const cors = require('cors')

boot.client()

app.use(cors())

const routes = require('./routes/routes')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //The ionic server
    next();
});


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'main' }));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')))

app.use(routes)


const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log('Server On')
    console.log('break server CTRL + C')
})