import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputBase, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router';

function ChatBox({ user, friend, token }) {
	let [mess, setMess] = useState();
	let [messages, setMessages] = useState([]);
	const navigate = useNavigate();

	const list = () => {
		let list = messages.map((mess) => (
			<Message
				key={mess._id}
				mess={mess}
				isSender={mess.sender === user._id ? 'sender' : 'receiver'}
			/>
		));
		return list;
	};
	useEffect(() => {
		console.log(user);
		axios
			.get(`/mess?user_id=${user._id}&friend_id=${friend._id}`, {
				headers: {
					authorization: 'Bearer ' + token,
				},
			})
			.then((res) => {
				console.log(res);
				setMessages(res.data);
			})
			.catch((err) => {
				alert(err);
				navigate('/err');
			});
	}, []);

	const handleClick = async () => {
		if (!setMess) {
			return;
		}
		try {
			let res = await axios.post(
				'/mess',
				{
					message: mess,
					sender: user._id,
					receiver: friend._id,
				},
				{
					headers: {
						authorization: 'Bearer ' + token,
					},
				},
			);
			setMessages([...messages, res.data]);
		} catch (error) {
			navigate('/err');
		}
	};

	return (
		<div className='chat-box-wrapper'>
			<div className='mess-list'>{list()}</div>
			<div className='mess-wrapper'>
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder='Search Google Maps'
					inputProps={{ 'aria-label': 'Input message' }}
					fullWidth
					onChange={(event) => {
						setMess(event.target.value);
					}}
				/>
				<div className='submit-btn' onClick={handleClick}>
					<SendIcon />
				</div>
			</div>
		</div>
	);
}

function Message({ mess, isSender }) {
	return (
		<div className='message-wrapper'>
			<div className={`message ${isSender}`}>{mess.message}</div>
		</div>
	);
}

export default ChatBox;
