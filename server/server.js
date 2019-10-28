const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const loginData = require('./login');
const ClientData = require('./clientData');

const API_PORT = 4000;
const app = express();
app.use(cors());
const router = express.Router();

// this is the MongoDB database URL
const dbRoute =
  'mongodb+srv://bryant:Phokingfun9%21@fullstacktest-jcyqa.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, {useNewUrlParser: true} );

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  console.log(`[getData] Made call`);
  loginData.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post('/getLogin', (req, res) => {
  console.log(`**[getLogin] Made call`);
  loginData.findOne( { username: req.body.username, password: req.body.password },(err, result) => {
    if (err || result === null) return res.json({ success: false, error: err });
    return res.json({ success: true, validLogin: true, permission: result.permission, result: result });
  })
})

router.get('/getClients', (req, res) => {
  console.log(`**[getClients] Made call`);
  ClientData.find((err, result) => {
    if (err || result === null) return res.json({ success: false, error: err });
    //console.log(`**[getClients] result = ${result}`);
    return res.json({ success: true, client: result });
  })
})

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  console.log(`id in updateData: ${id}`);
  console.log(`update in updateData: ${req.body.update}`);
  Data.findOneAndUpdate({id: id}, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  console.log(`id in delete: ${id}`);
  Data.findOneAndDelete({id: id}, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create method
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Data();

  const { id, message, username, password } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.message = message;
  data.username = username;
  data.password = password;
  data.id = id;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));