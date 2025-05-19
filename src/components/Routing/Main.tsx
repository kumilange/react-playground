import { Link } from 'react-router-dom';

export function Main() {
	return (
		<div>
			<h1>Main Page</h1>
			<Link to="/user/1">User 1</Link>
		</div>
	);
}
