const history_model = require('../models/history');

const fetchHistory = async (req, res) => {
    const { user_id } = req.query;
    if (!user_id) {
        return res.status(400).json('Missing user id.');
    }
    try {
        const histories = await history_model.find({ user_id: user_id });
        return res.status(200).json(histories);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {fetchHistory};