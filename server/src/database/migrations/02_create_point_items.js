const knex = require('knex')

module.exports = {
    async up(knex){
        return knex.schema.createTable('point_items', table => {
            table.increments('id').primary()
            table.integer('point_id').notNullable().references('id').inTable('points')
            table.integer('items_id').notNullable().references('id').inTable('items')
        })
    },
    async down(knex){
        return knex.schema.dropTable('point_items')
    }
}