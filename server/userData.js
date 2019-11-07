// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// this will be our data base's data structure 
const DataSchema = new Schema({
  id: Number,
  name: String,
  userList: [{
    username: {
      type: String
    },
    password: {
      type: String
    }
  }],
}, { collection: 'users' })


// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("userData", DataSchema);