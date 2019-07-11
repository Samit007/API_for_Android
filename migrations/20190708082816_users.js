exports.up =async function(knex, Promise) {
    await knex.schema.hasTable('users');
    return await knex.schema.createTable('users', table=>{
        table.increments('userid');
        table.string('firstname');
        table.string('lastname');
        table.string('password');
        table.string('email');
        table.string('address');
        table.string('phone');
        table.string('gender');
        table.string('blood_group');
        table.string('date_of_birth')
        table.string('imagename');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};