const express = require('express')
const mongoose = require('mongoose')
const { Client } = require('pg')
const os = require('os')
const app = express()
require('dotenv').config()



// connect postgres
const PG_URI = `postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}`
const client = new Client({
    connectionString: PG_URI
})

client.connect()
    .then(() => {
        console.log('\u2713 PostgreSQL database connected...');
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database:', err);
    });


// connect db  
const URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`
mongoose.connect(URI).then(() => console.log('\u2713 Mongo Database Connected...')).catch((e) => console.log('Database Failure Connected !', e))
app.use('/users', require('./users/index'))

app.get('/', (req, res) => {
    console.log(`Traffic from : ${os.hostname}`)
    res.send(`Full Nodejs Docker Boilerplate from ${os.hostname}`)
})

// function asyncTask() {
//     console.log('Task 1');
//     setTimeout(() => {
//         console.log('Task 2 (async)');
//     }, 1000);
//     console.log('Task 3');
// }

// asyncTask();
// console.log('All tasks initiated asynchronously.');


const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`\u2713 Server is up as ${process.env.NODE_ENV}...`)
})