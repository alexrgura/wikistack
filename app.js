const morgan = require('morgan')
const express =require('express')
const bodyParser = require('body-parser')

const app = express();
const staticMiddleware = express.static(__dirname + '/public')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(staticMiddleware)

app.get('/', function(req,res,next){
  res.send('Hello World')
})

const port = 1337;

app.listen(port, () => {
  console.log(`listening to ${port}`)
})
