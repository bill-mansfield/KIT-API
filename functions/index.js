const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const cores = require('cors')
const app = express()


//Routes
app.get('/hello', (req, res) => {
    return res.status(200).send('sup')
})

//Create


//Read


//Update


//Delete


//Export functions
exports.app = functions.https.onRequest(app)
