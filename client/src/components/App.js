import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import '../App.css';
import ErrorScreen from './Error';
import Chat from './Chat';
import Login from './Login';
import SignIn from './SignIn';
import axios from 'axios';

function Layout() {
	let path = useLocation().pathname.split('/')[2];

	return (
		<div className='sign-page'>
			<div className='picture'></div>
			<div className='content-wrapper'>
				<div className='navbar'>
					<span className={'nav nav-btn'}>
						<Link to='signup' className={path === 'signup' ? 'focused' : ''}>
							Sign Up
						</Link>
					</span>
					<span className='nav'>/</span>
					<span className={'nav nav-btn'}>
						<Link to='login' className={path === 'login' ? 'focused' : ''}>
							Login
						</Link>
					</span>
				</div>
				<div className='input-fields'>
					<Outlet />
				</div>
			</div>
		</div>
	);
}

function App() {
	axios.interceptors.response.use(
		(res) => {
			return res;
		},
		async (err) => {
			const config = err.config;
			if (
				err.response.data.message.name === 'TokenExpiredError' &&
				!config._retry
			) {
				console.log(config);
				config._retry = true;
				let newToken = await axios.get('/auth/refresh');
				config.headers.authorization = 'Bearer ' + newToken.data.accessToken;
				console.log(config);
				try {
					return axios.request(config);
				} catch (error) {
					return Promise.reject(error);
				}
			} else {
				return Promise.reject(err);
			}
		},
	);
	return (
		<Routes>
			<Route path='/home' element={<Layout />}>
				<Route path='login' element={<Login />} />
				<Route path='signup' element={<SignIn />} />
				<Route path='*' element={<Navigate to='/login' />} />
			</Route>
			<Route path='/user' element={<Chat />} />
			<Route path='/err' element={<ErrorScreen />} />
			<Route path='*' element={<Navigate to={'home/login'} />} />
		</Routes>
	);
}

export default App;
