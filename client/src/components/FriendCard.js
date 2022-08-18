import React from 'react';

function Friend({ user, setFriend }) {
	const handleClick = () => {
		setFriend(user);
	};

	return (
		<div className='card' onClick={handleClick}>
			<div className='avatar'></div>
			<div className='name-wrapper'>
				<div className='name'>{user.name}</div>
				<div className='username'>{user.username}</div>
			</div>
		</div>
	);
}

export default Friend;
