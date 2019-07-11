exports.up =async function(knex, Promise) {
    await knex.schema.hasTable('events');
    return await knex.schema.createTable('events', table=>{
        table.increments('eventid');
        table.string('eventname');
        table.string('eventaddress');
        table.string('eventstarttime');
        table.string('eventendtime');
        table.string('eventdate');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events')
};