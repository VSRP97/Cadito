const review_model = require('../models/reviews');

const postReview = async (req, res) => {
    const {user_id, product_id, rating, description} = req.body;
    try {
        const review = await review_model.create({ user_id, product_id, rating, description });
        return res.status(201).json(review);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const fetchReviews = async (req, res) => {
    const {product_id, user_id} = req.query;
    if (!product_id && !user_id) {
        return res.status(400).json({message: 'Missing one of product or user id.'});
    }
    try {
        if (product_id) {
            const product_reviews = await review_model.find({ product_id: product_id });
            return res.status(200).json(product_reviews);
        }
        if (user_id) {
            const user_reviews = await review_model.find({ user_id: user_id });
            return res.status(200).json(user_reviews);
        }
        return res.status(400).json({message: 'Missing one of product or user id.'});
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {postReview, fetchReviews};