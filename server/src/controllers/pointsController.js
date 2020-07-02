const knex = require('../database/connection')

class pointsController {
    async index (req, res) {
        const { city, uf, items } = req.query

        const parsedItems = String(items).split(',').map(item => Number(item.trim()))

        console.log({
            city, uf, parsedItems
        })

        
        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.items_id', parsedItems)
            .where('city', city)
            .where('uf', uf)
            .distinct()
            .select('points.*');

        return res.json(points)
    }

    async show (req, res) {
        const {id} = req.params
    
        const point = await knex('points').where('id', id).first()

        if(!point) {
            return res.status(400).json({ message: "Point not found"})
        }

        const items = await knex('items')
            .join('point_items', 'item.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title')


        return res.json({point, items})
    }

    async create (req, res) {
        const {
            image, 
            name, 
            email, 
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = req.body
    
        const trx = await knex.transaction()
    
        const point = {
            image, 
            name, 
            email, 
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const insertedIds = await trx('points').insert({
            image, 
            name, 
            email, 
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        })
    
        const point_id = insertedIds[0]
    
        const pointsItems = items.map(items_id => {
            return {
                point_id,
                items_id
            }
        })
    
        await trx('point_items').insert(pointsItems)
    
        await trx.commit()

        return res.json({
            id: point_id,
            ...point,
        })
    }

}

module.exports = pointsController