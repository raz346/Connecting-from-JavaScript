const myArgs = process.argv[2];
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
function getPeople (name, done) {
  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
    client.query("SELECT * FROM famous_people WHERE  first_name = $1::text" ,[name], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      done(result.rows);
      client.end();
    });
  });
}
function showPeople (rows) {
console.log(rows);
  rows.forEach(function(people) {
  console.log(`found ${people.id} person by the name ${myArgs} \n - ${people.id}: ${people.first_name} ${people.last_name} born in ${people.birthdate} `);
  });
}
getPeople(myArgs,showPeople)