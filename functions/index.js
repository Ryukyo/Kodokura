const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");

// init express server
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// init firestore connection
admin.initializeApp();
const db = admin.firestore();

// TODO need JWT token(issued by firebase auth) check before apis are used with middleware
// TODO need to access firestore

app.get("/", (req, res) => {
    functions.logger.log("GET /");

    res.status(404).send("Not Found");
});

app.get("/timestamp", (req, res) => {
    functions.logger.log("GET /timestamp");

    res.json({
        result: `${Date.now()}`
    });
});

app.get("/data", async(req, res) => {
    functions.logger.log("GET /data");

    const docs = db
        .collection("test")
        .get()
        .then((doc) => {
            functions.logger.log("success, ", doc.docs[0].data());
            return res.json(doc.docs[0].data());
        })
        .catch((e) => {
            functions.logger.log("error, ", e);
            return res.status(500).send();
        });
});

exports.app = functions.https.onRequest(app);