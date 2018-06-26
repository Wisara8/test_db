const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

let person = process.argv[2];

// client.connect((err) => {
//   if (err) {
//     return console.error("Connection Error", err);
//   }

//   client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1", [person], (err, result) => {
//     if (err) {
//       return console.error("error running query", err);
//     }
//     for (let i in result.rows) {
//       let index = (i + 1);
//       console.log(`${index}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born ${result.rows[i].birthdate.getFullYear()}-${result.rows[i].birthdate.getMonth()}-${result.rows[i].birthdate.getDay() + 1}`);
//     }
//     client.end();
//   });
// });

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  function getName(name, cb) {
    client.query('SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1', [name], (err, result) => {
      if (err) {
        return console.error("Connection Error", err);
      }
      cb(result.rows)
    })
  };

  getName(person, (resultrows) => {
   resultrows.map((i, index) => {
      console.log(`${index + 1}: ${i.first_name} ${i.last_name}, born ${i.birthdate.getFullYear()}-${i.birthdate.getMonth()}-${i.birthdate.getDay() + 1}`);
    })
    client.end()
  })


  });