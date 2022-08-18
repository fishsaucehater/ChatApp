const User = require('../models/user');

exports.getUser = async (req, res) => {
	try {
		const query = User.find({ username: req.query.username });
		const user = await query.populate('friends');
		res.status(200).json({
			user: user,
		});
	} catch (error) {
		console.error(error);
	}
};
