const Pool = require('pg').Pool
const pool = new Pool({
  user: 'dfhhzifanwocgt',
  host: 'ec2-54-170-90-26.eu-west-1.compute.amazonaws.com',
  database: 'dfd28959ibbmsv',
  password: '7289851ff7f8ec85fabd4e539f334873ac3dff791f6336e219c75753050cb8e8',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
})

const sign_up_user = (request, response) => {
    pool.query('INSERT INTO  ."Users"() ',[], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows);
    })
}

module.exports = {
    sign_up_user,
}

