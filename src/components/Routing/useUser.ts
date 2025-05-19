import { useEffect, useState } from 'react';
import { fetchUser } from './userApi';

export function useUser(userId: string) {
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const abortController = new AbortController();
		setLoading(true);

		fetchUser(userId, abortController.signal)
			.then((data) => {
				if (!abortController.signal.aborted && data) {
					const { name, email } = data.results[0];
					setUser({ name: `${name.first} ${name.last}`, email });
				}
			})
			.catch((error) => {
				if (error.name === 'AbortError') {
					console.log('Fetch aborted');
				} else {
					console.error('Error fetching user:', error);
					setError('Failed to fetch user');
				}
			})
			.finally(() => {
				setLoading(false);
			});

		return () => {
			abortController.abort();
		};
	}, [userId]);

	return { user, loading, error };
}
