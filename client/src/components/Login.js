import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

function Login() {
	let [name, setName] = useState();
	let [password, setPassword] = useState();

	const navigate = useNavigate();
	const handleSubmit = async (event) => {
		if (!name || !password) {
			return;
		}
		const credentials = {
			username: name,
			password: password,
		};

		try {
			await axios
				.post('/auth/login', credentials)
				.then((res) => {
					navigate('/user', { state: { userData: res.data } });
				})
				.catch((err) => alert(err));
		} catch (error) {
			alert(error.response.data.error);
		}
	};

	return (
		<div className='field-wrapper'>
			<TextField
				className='field'
				label='Username'
				variant='standard'
				margin='normal'
				onChange={(event) => {
					setName(event.target.value);
				}}
			/>
			<TextField
				className='field'
				label='Password'
				variant='standard'
				type='password'
				margin='normal'
				onChange={(event) => {
					setPassword(event.target.value);
				}}
			/>
			<Button
				className='submit-button'
				variant='outlined'
				onClick={handleSubmit}>
				Let's Go
			</Button>
		</div>
	);
}

export default Login;
