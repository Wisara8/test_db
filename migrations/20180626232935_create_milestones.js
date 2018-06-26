
exports.up = function(knex) {
    return knex.schema.createTable('milestones', (table) => {
        table.increments(); // Creates an auto-incrementing primary key called id
        table.string('description').notNullable(); // string is varchar(255)
        table.date('date_achieved').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('milestones');
}
