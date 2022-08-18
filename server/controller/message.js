const User = require('../models/user');
const Message = require('../models/message');

exports.getMess = async (req, res, next) => {
    let query = req.query;
    console.log(query)
	let queryString = {
		$or: [
			{ $and: [{ sender: query.user_id }, { receiver: query.friend_id }] },
			{ $and: [{ sender: query.friend_id }, { receiver: query.user_id }] },
		],
	};
	let messages = Message.find(queryString);
    messages = await messages.sort('date');
    console.log(messages)
	res.status(200).json(messages);
};

exports.addMess = async (req, res, next) => {
	try {
		let data = req.body;
		let message = await Message.create(data);
        res.status(201).json({
            sender: message.sender,
            receiver: message.receiver,
            message : message.message
        });
	} catch (error) {
		res.status(404).json(error);
	}
};
