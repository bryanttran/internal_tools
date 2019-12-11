const database = require('../services/database.js');

/*const baseQuery =
 `select employee_id "id",
    first_name "first_name",
    last_name "last_name",
    email "email",
    phone_number "phone_number",
    hire_date "hire_date",
    job_id "job_id",
    salary "salary",
    commission_pct "commission_pct",
    manager_id "manager_id",
    department_id "department_id"
  from employees`;*/

const baseQuery =
 `select *
  from p_user`;

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.username && context.password) {
    binds.username = context.username;
    binds.password = context.password;
    console.log(`context.id`)
    console.log(context.username)
    console.log(context.password)

    query += `\n where username = :username and passwd = :password`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;
