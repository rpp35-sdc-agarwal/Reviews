const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const reviews = require('./routes/reviews.js');
const generateMeta = require('./middlewares/generateMeta.js');
const markHelpful = require('./middlewares/markHelpful.js');
const reportReview = require('./middlewares/reportReview.js');

app.use(express.json()); // for using req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/reviews', reviews);

// GET /reviews/meta
// Returns review metadata for a given product
// Response Status: 200 OK
app.get('/reviews/meta', async (req, res) => {
  try {
    // console.log(typeof req.body.product_id);
    let productId = req.body.product_id;
    let metaData = await generateMeta(productId);
    res.status(200).json(metaData);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
  
});

// PUT /reviews/:review_id/helpful
// Updates a review to show it was found helpful.
// Reponse Status: 204 NO CONTENT
app.put('/reviews/:review_id/helpful', async (req, res) => {
  try {
    let reviewId = req.params.review_id;
    await markHelpful(reviewId);
    res.status(204).send('Review was marked as helpful');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// PUT /reviews/:review_id/report
// Updates a review to show it was reported. Note, this action does not delete the review, but the review will not be returned in the above GET request.
// Reponse Status: 204 NO CONTENT
app.put('/reviews/:review_id/report', async (req, res) => {
  try {
    let reviewId = req.params.review_id;
    await reportReview(reviewId);
    res.status(204).send('Review was reported');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});


app.get('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = app;