const myArgs = process.argv[2];
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

function getPeople (name, done) {
  knex.select("*")
  .from("famous_people")
  .where("first_name", name )
  .then(function(rows){
    done(rows);
  });
  knex.destroy();
}
function showPeople (rows) {
  rows.forEach(function(people) {
  console.log(`found ${people.id} person by the name ${myArgs} \n - ${people.id}: ${people.first_name} ${people.last_name} born in ${people.birthdate} `);
  });
}
getPeople(myArgs,showPeople)