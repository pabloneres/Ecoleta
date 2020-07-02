const knex = require('knex')

module.exports = {
    async up(knex){
        return knex.schema.createTable('items', table => {
            table.increments('id').primary()
            table.string('image').notNullable()
            table.string('title').notNullable()
        })
    },
    async down(knex){
        return knex.schema.dropTable('items')
    }
}