exports.up = function(knex) {
    return knex.schema.table('milestones', (table) => {
        table.integer('achievement_id').notNullable();
        table.foreign('achievement_id').references('famous_people.id')
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('milestones', function(table){
      table.dropForeign('achievement_id');
      table.dropColumn('achievement_id');
    });
}