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
});

let person = process.argv.slice(2);

knex.insert({id: person[0], first_name: person[1], last_name: person[2], birthdate: person[3]}).into("famous_people")
.asCallback(function(err) {
  return knex.destroy();
});
