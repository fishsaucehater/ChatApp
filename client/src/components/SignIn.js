import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { emailValidator } from '../utils/validator';
import { useNavigate } from 'react-router';

function SignIn() {
	let [username, setUserName] = useState();
	let [name, setName] = useState();
	let [email, setEmail] = useState();
	let [password, setPassword] = useState();
	let [confirmPassword, setConfirm] = useState();
	let [passwordError, setPassError] = useState(false);
	let [emailError, setEmailError] = useState(false);

	const navigate = useNavigate();

	const handleBlur = (event) => {
		if (confirmPassword && confirmPassword !== password) {
			setPassError(true);
		} else if (confirmPassword && confirmPassword == password) {
			setPassError(false);
		}
		if (email && !email.match(emailValidator)) {
			setEmailError(true);
		}
	};

	const handleSubmit = (event) => {
		let err = false;
		if (confirmPassword !== password) {
			setPassError(true);
			err = true;
		}
		if (email && !email.match(emailValidator)) {
			setEmailError(true);
			err = true;
		}
		if (err) return;
		const newUser = {
			username: username,
			name: name,
			email: email,
			password: password,
		};
		fetch('/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newUser),
		})
			.then((response) => {
				console.log(response.status);
				if (response.status >= 200 && response.status < 300) {
					response.json().then((data) => {
						console.log(data);
						navigate('/user', { state: { user: data } });
					});
				}
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className='field-wrapper'>
			<TextField
				label='Name'
				margin='dense'
				variant='standard'
				onChange={(event) => {
					setName(event.target.value);
				}}
			/>
			<TextField
				label='Username'
				margin='dense'
				variant='standard'
				onChange={(event) => {
					setUserName(event.target.value);
				}}
			/>
			{emailError ? (
				<TextField
					error
					margin='dense'
					label='Email'
					variant='standard'
					helperText='Incorrect email format.'
					onChange={(event) => {
						setEmail(event.target.value);
					}}
				/>
			) : (
				<TextField
					margin='dense'
					label='Email'
					onBlur={handleBlur}
					variant='standard'
					onChange={(event) => {
						setEmail(event.target.value);
					}}
				/>
			)}
			<TextField
				label='Password'
				variant='standard'
				margin='dense'
				onChange={(event) => {
					setPassword(event.target.value);
				}}
			/>
			{!passwordError ? (
				<TextField
					label='Confirm Password'
					variant='standard'
					margin='dense'
					onBlur={handleBlur}
					onChange={(event) => {
						setConfirm(event.target.value);
					}}
				/>
			) : (
				<TextField
					error
					label='Confirm Password'
					variant='standard'
					margin='dense'
					helperText='Passwords does not match'
					onChange={(event) => {
						setConfirm(event.target.value);
					}}
				/>
			)}
			<Button
				variant='outlined'
				className='submit-button'
				onClick={handleSubmit}>
				Let's Go
			</Button>
		</div>
	);
}

export default SignIn;
