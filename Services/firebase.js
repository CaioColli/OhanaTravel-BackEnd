const admin = require('firebase-admin')
const serviceAccount = require('../Key/ohanatravel-83c1c-firebase-adminsdk-x9x2d-9a73080bbb.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://ohanatravel-83c1c.appspot.com',
})

const db = admin.firestore()
const bucket = admin.storage().bucket()

module.exports = { admin, db, bucket }
