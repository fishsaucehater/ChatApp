const User = require('../models/user');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const sendTokens = async (user, statusCode, res) => {
	const accessToken = jwt.sign(
		{ id: user._id, name: user.name, username: user.username },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.ACCESS_JWT_EXPIRE },
	);
	const refreshToken = jwt.sign(
		{ id: user._id, name: user.name, username: user.username },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.REFRESH_JWT_EXPIRE },
	);
	res.status(statusCode);
	res.cookie('jwt', refreshToken, {
		expires: new Date(
			Date.now() +
				process.env.REFRESH_JWT_EXPIRE_MULTIPLIER * 1000 * 60 * 60 * 24,
		),
	});
	res.json({
		accessToken,
		user: user,
	});
};

exports.makeNewToken = async (req, res) => {
	try {
		const token = req.cookies.jwt;
		if (!token) {
			throw 'No token';
		} 
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log(decoded)
		const user = await User.findById(decoded.id);
		if (!user) {
			throw 'User no longer exist';
		}
		sendTokens(user, 200, res);
	} catch (error) {
		res.status(401).json({
			message: error,
		});
	}
};

exports.signup = async (req, res) => {
	try {
		const data = req.body;

		const newUser = await User.create({
			name: data.name,
			username: data.username,
			email: data.email,
			password: data.password,
		});
		sendTokens(newUser, 201, res);
	} catch (error) {
		res.status(401).json({
			success: false,
			message: 'failed to authenticate',
		});
	}
};

exports.login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			throw 'Please enter password';
		}
		const user = await User.findOne({ username: username });
		if (!user) {
			throw 'user not found';
		}
		let correct = true;
		bcrypt.compare(password, user.password, function (err, suc) {
			if (err) {
				correct = false;
			}
			if (suc) {
				sendTokens(user, 200, res);
				next();
			} else {
				res.status(401).json({
					success: false,
					error: 'wrong password',
				});
			}
		});
	} catch (error) {
		res.status(401).json({
			success: false,
			error,
		});
	}
};

exports.protect = async (req, res, next) => {
	try {
		if (
			!req.headers.authorization ||
			!req.headers.authorization.startsWith('Bearer')
		) {
			throw 'Not authenticated';
		}
		const accessToken = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id);
		if (!user) {
			throw 'User no longer exists';
		}
		next();
	} catch (error) {
		res.status(401).json({
			success: false,
			message: error,
		});
	}
};
