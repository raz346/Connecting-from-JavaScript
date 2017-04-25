const firstName = process.argv[2];
const lastName = process.argv[3];
const date = process.argv[4];
const settings = require("./settings"); // settings.json
var knex = require('knex')({
  client: 'pg',
  connection: {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
  }
});

function addPeople (first, last, date) {
  knex('famous_people').insert({first_name: first, last_name: last, birthdate: date})
  .then(function(rows){
    console.log(rows);
  });
  knex.destroy()
}

addPeople(firstName, lastName, date);