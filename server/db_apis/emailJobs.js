const database = require('../services/database.js');
var PropertiesReader = require('properties-reader');

let path = '//10.8.8.221/d/processing-ui/conf'

//Used to get email list from oracle DB
async function find(context) {
  let baseQuery =
    `select * from email`;

  let query = baseQuery;
  let schema, properties; 
  const binds = {};
  console.log(context)

  if (context.CID ) {
    binds.CID = context.CID;
    console.log(`context.CID`)
    console.log(context.CID)

    properties = PropertiesReader(`${path}/${context.CID}.conf`);
    console.log(properties.get('global.default.desc'))

    query += `\n where org_id=getorgid(:CID) `;
  }
  if (context.schema) {
    schema = context.schema;
  }

  console.log(`query: ${query}`)
  console.log(binds)

  const result = await database.simpleExecute(query, binds, {}, schema);
  console.log(`result`)
  //test = (result) => {
    result.rows.map((email) => {
      if(properties.get(`global.${email.STMT_TYPE}.desc`)) {
        email.STMT_TYPE = properties.get(`global.${email.STMT_TYPE}.desc`)
      }
      //console.log(properties.get(`global.${email.STMT_TYPE}.desc`))
    })  
  return result.rows;
}
module.exports.find = find;

//Used to unapprove email
async function update(context) {
  let baseQuery =
    `UPDATE email SET EM_IS_APPROVED = 'N' WHERE ORG_ID=getorgid(:CID) AND STMT_TYPE = :statementType`;

  let query = baseQuery;
  let schema; 
  const binds = {};
  console.log(`in update`)
  console.log(context)

  if (context.CID ) {
    binds.CID = context.CID;
    console.log(`if context.CID`)
    console.log(context.CID)
  }
  if (context.statementType) {
    binds.statementType = context.statementType;
    console.log(`if context.statementType`)
    console.log(context.statementType)
  }
  if (context.schema) {
    schema = context.schema;
    console.log(`if context.schema`)
    console.log(schema)
  }

  console.log(`query2: ${query}`)
  console.log(binds)

  const result = await database.simpleExecute(query, binds, {}, schema);


  return result.rows;
}

module.exports.update = update;
