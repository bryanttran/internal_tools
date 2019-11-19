const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const loginData = require('./loginData');
const ClientData = require('./clientData');
const emailData = require('./emailData');
const userData = require('./userData');

const API_PORT = 4000;
const app = express();
app.use(cors());
const router = express.Router();

// this is the MongoDB database URL
const dbRoute =
  'mongodb+srv://test:test123@fullstacktest-jcyqa.mongodb.net/test?retryWrites=true&w=majority';

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
  loginData.findOne( { username: req.body.username, password: req.body.password }, (err, result) => {
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

router.post('/getEmails', (req, res) => {
  console.log(`**[getEmails] Made call`);
  emailData.findOne( { name: req.body.client }, (err, result) => {
    if (err || result === null) return res.json({ success: false, error: err });
    return res.json({ success: true, result: result.emailList });
  })
})

router.post('/getUsers', (req, res) => {
  console.log(`**[getUsers] Made call`);
  userData.findOne( { name: req.body.client }, (err, result) => {
    if (err || result === null) return res.json({ success: false, error: err });
    return res.json({ success: true, result: result });
  })
})

// this is our update method
// this method overwrites existing data in our database
router.post('/updateEmail', (req, res) => {
  const { client, statementType , update } = req.body;
    emailData.updateOne( 
      {"name": client, "emailList.statementType": statementType},
      update,
      (err, result) => {
        if (err) {
          console.log(err); 
          return res.json({ success: false, error: err });
        }
        return res.json({ success: true, result: result});
    });
  });

// this is our update method
// this method overwrites existing data in our database
router.post('/updateUserPassword', (req, res) => {
  const { client, username, password , update } = req.body;
  console.log(req.body)
  userData.updateOne( 
      {"name": client, "userList.username": username},
      update,
      (err, result) => {
        if (err) {
          console.log(err); 
          return res.json({ success: false, error: err });
        }
      return res.json({ success: true, result: result});
    });
  });

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));