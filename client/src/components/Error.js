import React from 'react';
import { Link } from 'react-router-dom';

function ErrorScreen() {
	return <Link to={'/home/login'}>Go back to main screen</Link>;
}

export default ErrorScreen;
