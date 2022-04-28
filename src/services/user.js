const user_model = require('../models/user.js');

const register = async (req, res) => {
    const {display_name, username, password} = req.body;
    try {
        const user = await user_model.create({ display_name, username, password });
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const fetchUser = async (req, res) => {
    const {user_id} = req.query;
    if (!user_id) {
        req.status(400).json({ message: 'Missing user id.' });
    }
    try {
        const user = await user_model.findById(user_id);
        if (!user) {
            return res.status(404)
        } else {
            return res.status(200).json(user)
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {register, fetchUser};