const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')

const routes = require('./routes/routes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'main' }));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')))

app.use(routes)


const port = process.env.port || 3000

app.listen(port, () => {
    console.log('Server On')
    console.log('break server CTRL + C')
})