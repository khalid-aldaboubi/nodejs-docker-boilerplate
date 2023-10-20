const express = require('express')
const router = express.Router()
const redisClient = require('../db/redisClient')

const users = [{ name: 'Khalid' }, { name: 'Saed' }]

router.get('/', (req, res) => {
    res.json(users)
})

router.route('/:id')
    .get(async (req, res) => {
        let username = await redisClient.get(req.params.id)
        if (username){
            res.send(`Hello :  ${username}`)
        } else {
            redisClient.set(req.params.id, req.user.name)
            res.send(`Hello :  ${req.user.name}`)
        }   
    })
    .put((req, res) => {
        res.send(`Updated ${req.user.name}`)
    })
    .delete((req, res) => {
        res.send(`Deleted ${req.user.name}`)
    })


    router.param('id', (req, res, next, id) => {
        req.user = users[id]
        next()
    })


module.exports = router