const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const views = require('./views/index');
const layout = require('./views/layout');
const models = require('./models');

const app = express();
const staticMiddleware = express.static(__dirname + '/public');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(staticMiddleware);

app.get('/', function(req, res, next) {
  res.send(layout(views.main));
});

models.db.authenticate().then(() => {
  console.log('connected to the database');
});
const port = 1337;

const init = async () => {
  await models.db.sync({ force: true });

  app.listen(port, () => {
    console.log(`listening to ${port}`);
  });
};

init();
