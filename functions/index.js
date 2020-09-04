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

app.get("/timestamp", (req, res) => {
  functions.logger.log("GET /timestamp");

  res.json({
    result: `${Date.now()}`,
  });
});

app.get("/data", async (req, res) => {
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

app.post("/users", async (req, res) => {
  functions.logger.log("POST /users");

  const doc = await db
    .collection("users")
    .add(
      {
        name: "name",
        email: "email",
        avatar_url: "avatar_url",
        answers: [true, false],
        status: "ACTIVE",
        lang: "en",
        friendlist: ["name1", "name2"],
        blocklist: ["name3"],
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
