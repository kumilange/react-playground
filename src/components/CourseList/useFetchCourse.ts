import React, { useEffect, useState } from 'react';

interface Course {
	id: string;
	title: string;
	description: string;
}

const fetchCourses = async (): Promise<Course[]> => {
	const res = await fetch('https://api.fake-elearn.dev/courses');
	if (!res.ok) throw new Error('Network error');
	return await res.json();
};

export default function useFetchCourse() {
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const fetch = async () => {
		try {
			setLoading(true);
			const data = await fetchCourses();
			setCourses(data);
		} catch (error: any) {
			setError(error?.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (courses.length === 0) {
			fetch();
		}
	}, [courses]);

	return {
		courses,
		loading,
		error,
		reload: fetch,
	};
}
