// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// this will be our data base's data structure 
const DataSchema = new Schema({
  id: Number,
  name: String,
  mail_object: {
    statementType: {
      type: String
    },
    isApproved: {
      type: String
    },
    header: {
      type: String
    },
    header: {
      type: String
    }
  },
}, { collection: 'clients' })
  
  


let UserSchema = new Schema({
  id: Number,
  name: String,
  mail_object: {
    statementType: {
      type: String
    },
    isApproved: {
      type: String
    },
    header: {
      type: String
    },
    header: {
      type: String
    }
  },
})

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("ClientData", DataSchema);