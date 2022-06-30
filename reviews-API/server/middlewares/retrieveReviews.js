const db = require('../../database/index.js');
const retrievePhotos = require('./retrievePhotos.js');

const formatDate = (dateNum) => {
  let date = new Date(dateNum);
  return date;
}
const retrieveReviews = async (productId) => {
  try {
    let allReviews = await db.query(`SELECT * FROM reviews WHERE product_id=${productId}`);

    let result = allReviews.rows.map(async (review) => {
      review.date = formatDate(Number(review.date));
      review.photos = await retrievePhotos(review.id);
      return review;
    })
    
    return await Promise.all(result);
  } catch (err) {
    console.log(err);
  }
}

module.exports = retrieveReviews;