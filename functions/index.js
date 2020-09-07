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

app.get("/", (req, res) => {
    functions.logger.log("GET /");

    res.status(404).json({ message: "Not Found" });
});

app.post("/users", async(req, res) => {
    functions.logger.log("POST /users");

    const doc = await db
        .collection("users")
        .add({
            name: req.body.name,
            email: req.body.email,
            avatar_url: "",
            answers: [],
            status: "ACTIVE",
            lang: "en",
            friendlist: [],
            blocklist: [],
        }, { merge: true })
        .catch((err) => {
            functions.logger.log("err, ", err);
            return res.status(500).send({
                message: "failed",
            });
        });

    return res.status(201).json({ id: doc.id });
});

app.get("/users/:email", async(req, res) => {
    functions.logger.log("GET /users/email");

    const snapshot = await db
        .collection("users")
        .where("email", "==", req.params.email)
        .get();
    if (snapshot.empty) {
        functions.logger.log("No matching documents");
        return res.status(404).send({ message: "Not Found" });
    }

    const docs = [];
    snapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
    });
    functions.logger.log(docs[0]);
    return res.status(200).json(docs[0]);
});


app.get("/users", async (req, res) => {
  functions.logger.log("GET /users");

  const snapshot = await db.collection("users").get();
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
  functions.logger.log(docs);
  return res.status(200).json(docs);
});

app.delete("/users/:id", async (req, res) => {
  functions.logger.log("DELETE /users/:id", req.params.id);

  const userId = req.params.id;

  const targetUserDoc = db.collection("users").doc(userId).delete();

  if (!targetUserDoc) {
    functions.logger.log("No matching entity");
    return res.status(404).send({ message: "Not Found" });
  }

  functions.logger.log(`User id ${userId} was deleted`);
  return res.status(200).send(`User id ${userId} was deleted`);
});
exports.app = functions.https.onRequest(app);

app.put("/users/:id", async(req, res) => {
    functions.logger.log("PUT /users/", req.params.id);

    const userId = req.params.id;
    let body = req.body;

    const targetUserDoc = db.collection("users").doc(userId);

    const ref = await targetUserDoc.get();
    if (!ref.exists) {
        functions.logger.log("No matching entity");
        return res.status(404).send({ message: "Not Found" });
    }

    const updatedUser = {...ref.data(), ...body };
    await targetUserDoc.set(updatedUser);

    const result = await targetUserDoc.get();
    return res.status(200).send({ id: userId, ...result.data() });
});

exports.app = functions.https.onRequest(app);

