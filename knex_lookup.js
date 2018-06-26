// const pg = require("pg");
const settings = require("./settings"); // settings.json
const knex = require('knex')({
  client: 'pg',
  connection: {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl},
  // searchPath: ['knex', 'test_db'],
});

let person = process.argv[2];

knex.select('*').from('famous_people')
.where('first_name', '=', person)
.asCallback(function(err, rows) {
  rows.map((i, index) => {
    console.log(`${index + 1}: ${i.first_name} ${i.last_name}, born ${i.birthdate.getFullYear()}-${i.birthdate.getMonth()}-${i.birthdate.getDay() + 1}`);
  })
  return knex.destroy();
});