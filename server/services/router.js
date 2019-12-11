const express = require('express');
const router = new express.Router();
const login = require('../controllers/login.js');
const getClients = require('../controllers/getClients.js');
const emailJobs = require('../controllers/emailJobs.js');
const audit = require('../controllers/audit.js');

//used to get p_user internal user
router.route('/login')
  .post(login.post);

//Used to get list of clients from organization
router.route('/getClients')
  .get(getClients.get);

//used to get email list in email table
router.route('/getEmailList')
  .post(emailJobs.post);
  
//used to unapprove email status in email table
router.route('/unapproveEmail')
  .put(emailJobs.put);

//
router.route('/insertAuditLog')
  .post(audit.post);

module.exports = router;
