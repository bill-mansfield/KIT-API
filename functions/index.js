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

//Read all 
app.get('/api/read', (req, res) => {
    (async () => {

        try {
            const query = db.collection('apiAscents')
            let response = []

            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs

                for (let doc of docs) {
                    const item = {
                        id: doc.id,
                        name: doc.data().name,
                        grade: doc.data().grade,
                        ascentType: doc.data().ascentType,
                    }
                    response.push(item)
                }
                return response
            })

            return res.status(200).send(response)
        } catch (error) {
            console.log(error) 
            return res.status(500).send(error) 
        }

    })()
})


//Read by id
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
app.put('/api/update/:id', (req, res) => {
    (async () => {

        try {
            const document = db.collection('apiAscents').doc(req.params.id)
            
            await document.update({
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


//Delete
app.delete('/api/delete/:id', (req, res) => {
    (async () => {

        try {
            const document = db.collection('apiAscents').doc(req.params.id)
            await document.delete()

            return res.status(200).send()
        } catch (error) {
            console.log(error) 
            return res.status(500).send(error) 
        }

    })()
})


//Export functions
exports.app = functions.https.onRequest(app)
