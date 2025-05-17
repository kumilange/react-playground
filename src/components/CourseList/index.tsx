// This is a small e-learning React app in TypeScript with global state, async fetch, and subtle bugs.
// Your task is to debug and improve its behavior.

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createContext, useContext } from 'react';
import useFetchCourse from './useFetchCourse';

// Types
interface Course {
	id: string;
	title: string;
	description: string;
}

// Context Setup
interface AppState {
	user: string;
	courses: Course[];
	setCourses: (courses: Course[]) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [courses, setCourses] = useState<Course[]>([]);

	return (
		<AppContext.Provider value={{ user: 'kumiko', courses, setCourses }}>
			{children}
		</AppContext.Provider>
	);
};

const useApp = () => {
	const context = useContext(AppContext);
	if (!context) throw new Error('AppContext must be used within AppProvider');
	return context;
};

// Course List Component with subtle bugs
const CourseList: React.FC = () => {
	const { courses, loading, error, reload } = useFetchCourse();

	if (loading) return <p>Loading courses...</p>;
	if (error)
		return (
			<div>
				<p style={{ color: 'red' }}>Error: {error}</p>
				<button onClick={() => reload()}>Retry</button>
			</div>
		);

	return (
		<ul>
			{courses.map((course) => (
				<li key={course.id}>
					<strong>{course.title}</strong>: {course.description}
				</li>
			))}
		</ul>
	);
};

export default CourseList;
