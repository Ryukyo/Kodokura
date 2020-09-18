const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const uuid = require("uuid");
const cors = require("cors")({ origin: true });

// init express server
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors);

// init firestore connection
admin.initializeApp();
const db = admin.firestore();

// TODO need JWT token(issued by firebase auth) check before apis are used with middleware

app.get("/", (req, res) => {
  functions.logger.log("GET /");

  res.status(404).json({ message: "Not Found" });
});

// USER RELATED ENDPOINTS
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
        userScore: 0,
      },
      { merge: true }
    )
    .catch((err) => {
      functions.logger.log("err, ", err);
      return res.status(500).send({
        message: "failed",
      });
    });

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
  return res.status(200).send({ message: `User id ${userId} was deleted` });
});

app.put("/users/:id", async (req, res) => {
  functions.logger.log("PUT /users/", req.params.id);

  const userId = req.params.id;
  let body = req.body;

  const targetUserDoc = db.collection("users").doc(userId);

  const ref = await targetUserDoc.get();
  if (!ref.exists) {
    functions.logger.log("No matching entity");
    return res.status(404).send({ message: "Not Found" });
  }

  const updatedUser = { ...ref.data(), ...body };
  await targetUserDoc.set(updatedUser);

  const result = await targetUserDoc.get();
  return res.status(200).send({ id: userId, ...result.data() });
});

// MATCHMAKING RELATED ENDPOINTS
app.post("/chatqueue", async (req, res) => {
  functions.logger.log("POST /chatqueue");

  const targetUserDoc = db.collection("users").doc(req.body.id);

  const ref = await targetUserDoc.get();
  if (!ref.exists) {
    functions.logger.log("No matching entity");
    return res.status(404).send({ message: "Not Found" });
  }

  const doc = await db
    .collection("chatqueue")
    .add(
      {
        id: req.body.id,
        createdAt: Date.now(),
        queueStatus: "Waiting",
        ...ref.data(),
      },
      { merge: true }
    )
    .catch((err) => {
      functions.logger.log("err, ", err);
      return res.status(500).send({
        message: "failed",
      });
    });

  functions.logger.log("chatqueue doc", doc);
  return res.status(201).json({ message: "success" });
});

app.get("/chatqueue/:userId", async (req, res) => {
  functions.logger.log("GET /chatqueue/:userId");
  const batch = db.batch();
  const userId = req.params.userId;

  const currentTimestamp = Date.now();
  let threshold = currentTimestamp - 900000; // 15 min
  // functions.logger.log("date now, ", currentTimestamp);
  // functions.logger.log("threshold, ", threshold);

  try {
    const snapshotByUserId = await db
      .collection("chatqueue")
      .where("id", "==", userId)
      .get();

    if (snapshotByUserId.empty) {
      functions.logger.log("No matching entity");
      return res.status(404).send({ message: "Not Found" });
    }

    let matchingResult;
    snapshotByUserId.forEach((doc) => {
      let data = doc.data();
      if (data.matchingResult) {
        matchingResult = data.matchingResult;
      }
    });
    if (matchingResult) {
      return res.status(200).json(matchingResult);
    }

    const snapshot = await db
      .collection("chatqueue")
      .where("queueStatus", "==", "Waiting")
      .where("createdAt", ">", threshold)
      .get();
    if (snapshot.empty) {
      functions.logger.log("No matching documents");
      return res.status(404).send({ message: "Not Found" });
    }

    let user1Data = {};
    const checkUserMatching = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.id === userId) {
        user1Data = data;
        user1Data["chatqueueId"] = doc.id;
      } else {
        checkUserMatching.push({ ...data, chatqueueId: doc.id });
      }
    });

    // TODO Return those who have waited too long first.

    if (checkUserMatching.length < 1) {
      functions.logger.log("No matching User");
      return res.status(404).send({ message: "Not Found" });
    }

    const canBeMatched = (accessUser, targetUser) => {
      // Blocklist
      //{ name: foo, id: egawegawe }
      for (let block of accessUser.blocklist) {
        if (block.id === targetUser.id) return false;
      }

      // Language
      if (accessUser.lang !== targetUser.lang) return false;

      // User Status
      if (targetUser.status !== "ACTIVE") return false;

      return true;
    };

    // TODO matched recently? (opt)
    const calculateMatchingScore = (user1, user2) => {
      let matchingScore = 0;

      for (let key in user1.answers) {
        for (let i = 0; i < user1.answers[key].length; i++) {
          if (
            user1.answers[key][i] === true &&
            user2.answers[key][i] === true
          ) {
            matchingScore++;
          }
        }
      }
      return matchingScore;
    };

    let matchedUser;
    checkUserMatching.forEach((waitingUser) => {
      if (canBeMatched(user1Data, waitingUser)) {
        const currentScore = calculateMatchingScore(user1Data, waitingUser);
        if (!matchedUser || matchedUser.score < currentScore) {
          matchedUser = { score: currentScore, ...waitingUser };
        }
      }
    });

    if (!matchedUser) {
      functions.logger.log("No matching User");
      return res.status(404).send({ message: "Not Found" });
    }

    const chatroom = {
      id: uuid.v4(),
    };

    matchingResult = { chatroom, user1: user1Data, user2: matchedUser };

    const user1Ref = db.collection("chatqueue").doc(user1Data.chatqueueId);
    const user2Ref = db.collection("chatqueue").doc(matchedUser.chatqueueId);

    batch.set(
      user1Ref,
      {
        matchingResult,
        queueStatus: "Matched",
      },
      { merge: true }
    );

    batch.set(
      user2Ref,
      {
        matchingResult,
        queueStatus: "Matched",
      },
      { merge: true }
    );

    await batch.commit().catch((err) => {
      functions.logger.log("err, ", err);
      return res.status(500).send({
        message: "failed",
      });
    });
    return res.status(200).json(matchingResult);
  } catch (error) {
    functions.logger.log("err, ", error);
    return res.status(500).json({ message: "failed to get users" });
  }
});

app.delete("/chatqueue/:chatroomId", async (req, res) => {
  functions.logger.log("DELETE /chatqueue/:chatroomId", req.params.chatroomId);
  const batch = db.batch();
  const chatroomId = req.params.chatroomId;

  try {
    const snapshot = await db
      .collection("chatqueue")
      .where("matchingResult.chatroom.id", "==", chatroomId)
      .get();

    if (snapshot.empty) {
      functions.logger.log("No matching documents");
      return res
        .status(200)
        .send({ message: `Chatroom id ${chatroomId} was deleted` });
    }
    snapshot.forEach((doc) => {
      functions.logger.log(`doc ${doc.id} ${doc.ref}`);
      batch.delete(doc.ref);
    });

    await batch.commit();

    functions.logger.log(`Chatroom id ${chatroomId} was deleted`);
    return res
      .status(200)
      .send({ message: `Chatroom id ${chatroomId} was deleted` });
  } catch (error) {
    functions.logger.log("Chatroom deletion error, ", error);
    return res.status(500).send({ message: "Server error" });
  }
});
exports.app = functions.https.onRequest(app);
