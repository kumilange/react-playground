import { Link } from 'react-router-dom';

export default function Home() {
	return (
		<div>
			<h1>Courses</h1>
			<ul>
				<li>
					<Link to="/courses/1">React Fundamentals</Link>
				</li>
				<li>
					<Link to="/courses/2">TypeScript for Pros</Link>
				</li>
			</ul>
		</div>
	);
}
