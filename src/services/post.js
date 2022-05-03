const post_model = require('../models/posts.js');

const createPost = async (req, res) => {
    const {owner_id, image_url, display_name, description, price} = req.body
    try {
        const post = await post_model.create({owner_id, image_url, display_name, description, price })
        return res.status(201).json(post)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const fetchPost = async (req, res) => {
    if (req.query.post_id){
        return fetchPostId(req, res);
    } else if (req.query.user_id) {
        return fetchUserPosts(req, res);
    }
}

const fetchPostId = async (req, res) => {
    const {post_id} = req.query;
    if (!post_id) {
        return res.status(400).json({message: 'Missing post id.'});
    }
    try {
        const post = await post_model.findById(post_id);
        if (!post) {
            return res.status(400);
        }else{
            return res.status(200).json(post)
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

const fetchRecentPosts = async (req, res) => {
    try {
        const posts = await post_model.find().sort('-created_date').limit(10);
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const fetchUserPosts = async (req, res) => {
    const {user_id} = req.query;
    if (!user_id) {
        return res.status(400).json({message: 'Missing user id.'});
    }
    try {
        const posts = await post_model.find({owner_id: user_id});
        if (!post) {
            return res.status(403).json({message: 'Incorrect user id.'});
        } else {
            return res.status(200).json(posts)
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {createPost, fetchPost, fetchRecentPosts}