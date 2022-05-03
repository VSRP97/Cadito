const cart_model = require('../models/cart');
const history_model = require('../models/history.js');
const { default: mongoose } = require('mongoose');

const fetchCart = async (req, res) => {
    const {user_id} = req.query;
    if (!user_id)  {
        return res.status(400).json({message: 'Missing user id.'});
    }
    try{
        const cart = await cart_model.findOne({user_id: user_id}) ?? await cart.create({ user_id: user_id });
        if (!cart) {
            return res.status(403).json({message: 'Incorrect user id.'});
        } else {
            return res.status(200).json(cart);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

const addToCart = async (req, res) => {
    const {user_id, product_id} = req.body;
    if (!user_id) {
        return res.status(400).json({message: 'Missing user id.'});
    }
    if (!product_id) {
        return res.status(400).json({message: 'Missing product id.'});
    }
    try {
        const new_product = {
            _id: new mongoose.Types.ObjectId(),
            product_id: product_id
        }
        const filter = { user_id: user_id }, 
            update = { $push: { items: new_product } },
            options = { new: true, upsert: true };
        const cart = await cart_model.findOneAndUpdate(filter, update, options);
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const removeFromCart = async (req, res) => {
    const { item_id } = req.query;
    if (!item_id) {
        return res.status(400).json({message: 'Missing item id.'});
    }
    try {
        const filter = { 'items._id': item_id },
            update = { $pull: { items: { _id: item_id } } },
            options = { new: true, upsert: true };
        const cart = await cart_model.findOneAndUpdate(filter, update, options);
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const buyCart = async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) {
        return res.status(400).json({message: 'Missing user id.'});
    }
    try {
        const cart = await cart_model.findOne({ user_id: user_id });
        await history_model.create({
            user_id: user_id,
            items: cart.items
        });
        cart.items = [];
        await cart.save();
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {fetchCart, addToCart, removeFromCart, buyCart}