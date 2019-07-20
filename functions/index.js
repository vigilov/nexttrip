const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const util = require('util');
const app = express();

app.use(cors({ origin: true }));

app.get('/instagram/auth-callbcak', (req, res) => {
 console.log(req.params.code);
 res.send();
});

exports.api = functions.https.onRequest(app);
