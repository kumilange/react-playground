import { useParams } from 'react-router-dom';
import { useUser } from './useUser';

export function UserPage() {
	const { userId } = useParams();
	const { user, loading, error } = useUser(userId!);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div>
			<h1>{user?.name}</h1>
			<p>Email: {user?.email}</p>
		</div>
	);
}
