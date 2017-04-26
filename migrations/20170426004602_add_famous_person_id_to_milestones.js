
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', function (table) {
      table.integer('people_id').unsigned()
      table.foreign('people_id').references('id').inTable('famous_people')
   })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', function (table){
      table.dropForeign('people_id')
      table.dropColumn('people_id')
    })
  ])
};
