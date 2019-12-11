const oracledb = require('oracledb');
const dbConfig = require('../config/database.js');

async function initialize() {
  await oracledb.createPool(dbConfig.defaultPool); 
  await oracledb.createPool(dbConfig.bankPool);
  await oracledb.createPool(dbConfig.cuPool);

}

module.exports.initialize = initialize;

async function close() {
  await oracledb.getPool(dbConfig.defaultPool.poolAlias).close();
  await oracledb.getPool(dbConfig.bankPool.poolAlias).close();
  await oracledb.getPool(dbConfig.cuPool.poolAlias).close();
}

module.exports.close = close;

function simpleExecute(query, binds = [], opts = {}, schema) {
  return new Promise(async (resolve, reject) => {
    let defaultConn, bankConn, cuConn;

    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;

    try {
      const defaultPool = oracledb.getPool(dbConfig.defaultPool.poolAlias);
      const bankPool = oracledb.getPool(dbConfig.bankPool.poolAlias);
      const cuPool = oracledb.getPool(dbConfig.cuPool.poolAlias);

      defaultConn = await oracledb.getConnection(dbConfig.defaultPool.poolAlias);
      bankConn = await oracledb.getConnection(dbConfig.bankPool.poolAlias);
      cuConn = await oracledb.getConnection(dbConfig.cuPool.poolAlias);

      let result;

      console.log(`schema`);
      //console.log(binds.schema);
      //console.log(bankPool);
      //console.log(dbConfig.defaultPool);

      if(schema === bankPool.poolAlias) {
        console.log(`bankPool.user`);
        console.log(query)
        console.log(binds)
        console.log(opts)
        result = await bankConn.execute(query, binds, opts);
        console.log(`after bankPool.user`);
      }
      else if(schema === cuPool.poolAlias) {
        console.log(`cuPool.user`);
        result = await cuConn.execute(query, binds, opts);
        console.log(`after cuPool.user`);
      } 
      else {
        console.log(`defaultPool.user`);
        result = await defaultConn.execute(query, binds, opts);
        console.log(`after defaultPool.user`);
      }
      console.log(query)
      console.log(schema)
      console.log(opts)
      resolve(result);
      console.log(`after result`)
      //await doRelease(defaultConn);
      //await doRelease(bankConn);
      //await doRelease(cuConn);

    } catch (err) {
      reject(err);
    } finally {
      if (defaultConn || bankConn || cuConn) { // conn assignment worked, need to close
        try {
          console.log(`defaultConn.close`)
          await defaultConn.close();
          console.log(`bankConn.close`)
          await bankConn.close();
          console.log(`cuConn.close`)
          await cuConn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}

function doRelease(connection)
{
  connection.release(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
    
}

module.exports.simpleExecute = simpleExecute;
