export async function fetchUser(userId: string, signal: AbortSignal) {
	try {
		const response = await fetch(
			`https://randomuser.me/api/?user_id=${userId}`,
			{
				signal,
			},
		);
		if (!response.ok) {
			throw new Error('Failed to fetch user');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			// Log and rethrow AbortError so it can be caught in the hook
			console.log('Fetch aborted');
			throw error;
		} else {
			console.error('Error fetching user:', error);
			throw error;
		}
	}
}
