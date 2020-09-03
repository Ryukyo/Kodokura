const functions = require("firebase-functions");

exports.helloWorld = functions
    .region("asia-northeast1")
    .https.onRequest((request, response) => {
        response.send("Hello from Firebase!");
    });