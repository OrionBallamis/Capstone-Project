const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

const { submit, getHistory, historyDelete } = require(`./controller`)

app.get('/', (req,res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/home.html'))

})

app.post(`/8ball`, submit)
app.get(`/8ball`, getHistory)
app.delete(`/8ball/:index`, historyDelete)

app.listen(4000, console.log('server running on port 4000'))