const user_model = require('../models/user.js');

const login = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({message: 'Missing username or password.'});
    }
    try {
        const user = await user_model.find({username: username})
        if (!user) {
            return res.status(403).json({message: 'Incorrect username or password.'});
        } else {
            if (user[0].password === password) {
                return res.status(200).json({message: 'Login successful.'});
            }else{
                return res.status(403).json({message: 'Incorrect username or password.'});
            }
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

const prev_login = async (req, res) => {
    const {user_id} = req.body;
    if (!user_id) {
        return res.status(400).json({message: 'Missing user id.'});
    }
    try {
        const user = await user_model.findById(user_id);
        if (!user) {
            return res.status(404);
        }else{
            return res.status(200).json({message: 'Login successful.'});
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

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
        return res.status(400).json({ message: 'Missing user id.' });
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

module.exports = {register, fetchUser, login, prev_login};