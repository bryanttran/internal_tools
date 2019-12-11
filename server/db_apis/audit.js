const database = require('../services/database.js');

//Used to insert into audit_log_CID
async function insert(context) {
  let baseQuery =
    `insert into audit_log_${context.CID} values `;

  let query = baseQuery;
  let schema; 
  const binds = {};
  console.log(context)

  if (context.username && context.event && context.date && context.statementType && context.CID ) {
    binds.username = context.username;
    binds.event = context.event;
    binds.currentDate = context.date;
    binds.newValue = `${context.CID}|${context.statementType}`;
    console.log(`context.username`)
    console.log(context.username)
    console.log(`context.event`)
    console.log(context.event)
    console.log(`context.date`)
    console.log(context.date)
    console.log(`context.statementType`)
    console.log(context.statementType)
    console.log(`context.CID`)
    console.log(context.CID)

    query += ` (:username, to_date(:currentDate, 'YYYY-MM-DD HH24-MI-SS'), null, null, 'internal', :event, null , :newValue ) `;
  }
  if (context.schema) {
    schema = context.schema;
  }

  console.log(`query: ${query}`)
  console.log(binds)

  const result = await database.simpleExecute(query, binds, {}, schema);


  return result.rows;
}
module.exports.insert = insert;