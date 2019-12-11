const audit = require('../db_apis/audit.js');

async function post(req, res, next) {
  try {
    const context = {};
    console.log(`req.body audit log`)
    console.log(req.body)
    //console.log(res.data)
    //console.log(next)

    //context.id = parseInt(req.params.id, 10);
    context.id = req.params.id;

    const rows = await audit.insert(req.body);

    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}
module.exports.post = post;