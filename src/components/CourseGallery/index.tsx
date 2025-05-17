// A small e-learning feature component where users browse course thumbnails
// This example includes lazy loading bugs and performance issues

import React, { useEffect, useState, useRef } from 'react';

interface CourseCardProps {
	id: string;
	author: string;
	download_url: string;
}

const LazyImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
	const imgRef = useRef<HTMLImageElement | null>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					if (entry.target) observer.unobserve(entry.target);
				}
			});
		});

		const element = imgRef.current;

		if (element) {
			observer.observe(element);
		}

		return () => {
			if (element) observer.unobserve(element);
		};
	}, []);

	return isVisible ? (
		<img
			ref={imgRef}
			src={src}
			alt={alt}
			style={{ width: '100%' }}
			loading="lazy"
		/>
	) : (
		<div
			ref={imgRef}
			style={{ width: '100%', height: 200, backgroundColor: '#eee' }}
			aria-label="Image loading placeholder"
		/>
	);
};

const CourseCard: React.FC<CourseCardProps> = ({
	id,
	author,
	download_url,
}) => {
	return (
		<div
			className="course-card"
			style={{
				border: '1px solid #ccc',
				padding: 10,
				marginBottom: 12,
				width: '500px',
				height: '400px',
			}}
		>
			<h3>{author}</h3>
			<LazyImage src={download_url} alt={author} />
		</div>
	);
};

const CourseGallery: React.FC = () => {
	const [courses, setCourses] = useState<CourseCardProps[]>([]);

	useEffect(() => {
		fetch('https://picsum.photos/v2/list?page=1&limit=20')
			.then((res) => res.json())
			.then((data) => setCourses(data));
	}, []);

	return (
		<div style={{ maxWidth: 600, margin: '0 auto' }}>
			<h2>Course Thumbnails</h2>
			{courses.map((course) => (
				<CourseCard key={course.id} {...course} />
			))}
		</div>
	);
};

export default CourseGallery;
