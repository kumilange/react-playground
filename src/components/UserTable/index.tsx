import React, { useEffect, useState, useMemo } from 'react';

interface User {
	id: number;
	name: string;
	email: string;
}

const USERS_PER_PAGE = 10;

const UserTable: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [page, setPage] = useState(1);
	const [filterText, setFilterText] = useState('');
	const [sortKey, setSortKey] = useState<'name' | 'email' | null>(null);
	const [sortAsc, setSortAsc] = useState({
		name: false,
		email: false,
	});

	// derived state
	const filtered = useMemo(() => {
		return users.filter((user) =>
			user.name.toLowerCase().includes(filterText.toLowerCase()),
		);
	}, [users, filterText]);
	const sorted = useMemo(() => {
		if (!sortKey) return filtered;
		return [...filtered].sort((a, b) => {
			const key = sortKey as 'name' | 'email';
			const aVal = a[key].toLowerCase();
			const bVal = b[key].toLowerCase();
			return sortAsc[key] ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
		});
	}, [filtered, sortKey, sortAsc]);
	const paginated = sorted.slice(
		(page - 1) * USERS_PER_PAGE,
		page * USERS_PER_PAGE,
	);
	const maxPage = Math.ceil(sorted.length / USERS_PER_PAGE);

	const handleSort = (key: 'name' | 'email') => {
		setSortKey(key);
		setSortAsc({
			...sortAsc,
			[key]: !sortAsc[key],
		});
	};

	useEffect(() => {
		async function loadUsers() {
			try {
				const res = await fetch(
					'https://randomuser.me/api/?results=21&inc=name,email,login,id',
				);
				const data = await res.json();
				const users = data.results.map((user: any) => ({
					id: user.id?.value ?? user.login.uuid,
					name: `${user.name.first} ${user.name.last}`,
					email: user.email,
				}));

				setUsers(users);
			} catch (error) {
				console.log('error', error);
			}
		}

		loadUsers();
	}, []);

	useEffect(() => {
		setPage(1);
	}, [filterText, sortKey, sortAsc]);

	return (
		<div style={{ padding: 20 }}>
			<h2>User List</h2>

			<input
				placeholder="Filter by name"
				value={filterText}
				onChange={(e) => setFilterText(e.target.value)}
			/>

			<table border={1} cellPadding={6} style={{ marginTop: 12 }}>
				<thead>
					<tr>
						<th>#</th>
						<th onClick={() => handleSort('name')}>
							Name {sortKey === 'name' && (sortAsc.name ? '▲' : '▼')}
						</th>
						<th onClick={() => handleSort('email')}>
							Email {sortKey === 'email' && (sortAsc.email ? '▲' : '▼')}
						</th>
					</tr>
				</thead>
				<tbody>
					{paginated.map((user) => (
						<tr key={user.id}>
							<td>{user.id}</td>
							<td>{user.name}</td>
							<td>{user.email}</td>
						</tr>
					))}
				</tbody>
			</table>

			<div style={{ marginTop: 12 }}>
				<button
					onClick={() => setPage((p) => Math.max(1, p - 1))}
					disabled={page === 1}
				>
					Prev
				</button>
				<span style={{ margin: '0 8px' }}>Page {page}</span>
				<button
					onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
					disabled={page === maxPage}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default UserTable;
