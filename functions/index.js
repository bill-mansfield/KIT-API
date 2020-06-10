const functions = require('firebase-functions')
const admin = require('firebase-admin')
var serviceAccount = require('./permissions.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kitt-da2fa.firebaseio.com"
});

const express = require('express')
const app = express()
const db = admin.firestore()

const cors = require('cors')
app.use(cors({ origin:true }))


//Routes
app.get('/hello', (req, res) => {
    return res.status(200).send('sup')
})

//Create
app.post('/api/create', (req, res) => {
    (async () => {

        try {
            await db.collection('apiAscents').doc('/' + req.body.id + '/')
            .create({
                name: req.body.name,
                grade: req.body.grade,
                ascentType: req.body.ascentType
            })

            return res.status(200).send()
        } catch (error) {
            console.log(error) 
            return res.status(500).send(error) 
        }

    })()
})

//Read
app.get('/api/read/:id', (req, res) => {
    (async () => {

        try {
            const document = db.collection('apiAscents').doc(req.params.id)
            let ascent = await document.get()
            let response = ascent.data()

            return res.status(200).send(response)
        } catch (error) {
            console.log(error) 
            return res.status(500).send(error) 
        }

    })()
})


//Update


//Delete


//Export functions
exports.app = functions.https.onRequest(app)
