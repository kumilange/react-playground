import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';

type Lesson = {
	id: number;
	title: string;
	completed: boolean;
};

const fakeLessons: Record<string, Lesson[]> = {
	'1': [
		{ id: 1, title: 'Intro to React', completed: false },
		{ id: 2, title: 'JSX and Props', completed: false },
		{ id: 3, title: 'State & Effects', completed: false },
	],
	'2': [
		{ id: 1, title: 'Type Basics', completed: false },
		{ id: 2, title: 'Advanced Types', completed: false },
		{ id: 3, title: 'Generics', completed: false },
	],
};

export default function CoursePage() {
	const { courseId } = useParams();
	const [course, setCourse] = useState<Record<string, Lesson[]>>({});
	const lessons = course[courseId!] || [];
	const progress = useMemo(() => {
		const completed = lessons.filter((l) => l.completed).length;
		return (completed / (lessons.length || 1)) * 100;
	}, [lessons]);

	// ❌ Bug 1: race condition, async not cleaned up
	useEffect(() => {
		if (course[courseId!]) return;
		let timer: any = null;
		let isMounted = true;

		timer = setTimeout(() => {
			if (isMounted) {
				setCourse((prev) => ({
					...prev,
					[courseId!]: fakeLessons[courseId!] || [],
				}));
			}
		}, 500);

		return () => {
			isMounted = false;
			clearTimeout(timer);
		};
	}, [course, courseId]);

	// ❌ Bug 2: not recalculated correctly

	// ❌ Bug 3: state update not preserved
	const handleToggle = useMemo(() => {
		return (id: number) => {
			setCourse((prev: Record<string, Lesson[]>) => {
				const updatedLesson = prev[courseId!].map((l: Lesson) =>
					l.id === id ? { ...l, completed: !l.completed } : l,
				);
				return { ...prev, [courseId!]: updatedLesson };
			});
		};
	}, [courseId]);

	return (
		<div>
			<h1>Course #{courseId}</h1>
			<li>
				<Link to="/courses/1">React Fundamentals</Link>
			</li>
			<li>
				<Link to="/courses/2">TypeScript for Pros</Link>
			</li>
			<progress value={progress} max="100" />
			<ul>
				{lessons.map((lesson) => (
					<li key={lesson.id}>
						<label>
							<input
								type="checkbox"
								checked={lesson.completed}
								onChange={() => handleToggle(lesson.id)}
							/>
							{lesson.title}
						</label>
					</li>
				))}
			</ul>
		</div>
	);
}
