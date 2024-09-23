const admin = require('firebase-admin')
const serviceAccount = require('../key/ohanatravel-83c1c-firebase-adminsdk-x9x2d-0c36ac3515.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://ohanatravel-83c1c.appspot.com',
})

const db = admin.firestore()
const bucket = admin.storage().bucket()

module.exports = { db, bucket }
