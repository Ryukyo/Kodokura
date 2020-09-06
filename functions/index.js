const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");

// init express server
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// init firestore connection
admin.initializeApp();
const db = admin.firestore();

// TODO need JWT token(issued by firebase auth) check before apis are used with middleware
// TODO need to access firestore

app.get("/", (req, res) => {
  functions.logger.log("GET /");

  res.status(404).send("Not Found");
});

app.post("/users", async (req, res) => {
  functions.logger.log("POST /users");

  const doc = await db
    .collection("users")
    .add(
      {
        name: req.body.name,
        email: req.body.email,
        avatar_url: "",
        answers: [],
        status: "ACTIVE",
        lang: "en",
        friendlist: [],
        blocklist: [],
      },
      { merge: true }
    )
    .catch((err) => {
      functions.logger.log("err, ", err);
      return res.status(500).send("failed");
    });

  functions.logger.log("stored, ", doc.id);
  return res.status(201).json({ id: doc.id });
});

app.get("/users/:email", async (req, res) => {
  functions.logger.log("GET /users/email");

  const snapshot = await db
    .collection("users")
    .where("email", "==", req.params.email)
    .get();
  if (snapshot.empty) {
    functions.logger.log("No matching documents");
    return res.status(404).send();
  }

  const docs = [];
  snapshot.forEach((doc) => {
    functions.logger.log("doc, ", doc);
    functions.logger.log("doc id, ", doc.id);
    docs.push({ id: doc.id, ...doc.data() });
  });
  functions.logger.log(docs[0]);
  return res.status(200).json(docs[0]);
});
exports.app = functions.https.onRequest(app);
