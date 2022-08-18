const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = mongoose.Schema({
	message: {
		type: String,
	},
	sender: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true],
	},
	receiver: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true],
	},
	date: {
		type: Date,
		default: Date.now(),
	}
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
