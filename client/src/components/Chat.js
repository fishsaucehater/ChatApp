import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Friend from './FriendCard';
import {  TextField } from '@mui/material';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import ChatBox from './ChatBox';

function Chat() {
	let [token, setToken] = useState();
	let [isAuthenticated, setAuth] = useState();
	let [currentFriend, setCurr] = useState();
	let [friends, setFriends] = useState([]);
	let [currentUser, setUser] = useState();
	const { state } = useLocation();
	const { userData } = state;
	const { accessToken, user } = userData;

	const list = () => {
		let list = friends.map((friend) => (
			<Friend key={friend._id} user={friend} setFriend={setCurr} />
		));
		return list;
	};

	useEffect(() => {
		setToken(accessToken);
		axios
			.get(`/user?username=${user.username}`, {
				headers: {
					authorization: 'Bearer ' + accessToken,
				},
			})
			.then((res) => {
				setUser(res.data.user[0]);
				setFriends(res.data.user[0].friends);
				setAuth(true);
			})
			.catch((err) => {
				if ((err.response.data.message.message = 'jwt expired')) {
					console.log('expired');
				}
			});
	}, []);

	return !isAuthenticated ? (
		<div>Not authenticated</div>
	) : (
		<div className='chat-screen-wrapper'>
			<div className='friends-list'>
				<div className='info-bar'>
					<Link to='/login' className='logo' />
				</div>
				<div className='search-wrapper'>
					<TextField variant='outlined' placeholder='Search' />
				</div>
				<div className='list'>{list()}</div>
			</div>
			<div className='chat-box'>
				<div className='info-bar'></div>
				{!currentFriend ? (
					<div>Not In conversation</div>
				) : (
					<ChatBox user={currentUser} friend={currentFriend} token={token} />
				)}
			</div>
		</div>
	);
}

export default Chat;
