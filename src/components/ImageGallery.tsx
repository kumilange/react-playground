import React, { useEffect, useState, useCallback, useRef } from 'react';
import ImageCard from './ImageCard';
import './ImageGallery.css';

interface PicsumImage {
	id: string;
	author: string;
	width: number;
	height: number;
	url: string;
	download_url: string;
}

const MAX_PAGE = 5;

const ImageGallery: React.FC = () => {
	const [images, setImages] = useState<PicsumImage[]>([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const loaderRef = useRef<HTMLDivElement>(null);
	const hasMore = page <= MAX_PAGE;

	const loadImages = useCallback(async () => {
		if (loading || !hasMore) return;

		setLoading(true);

		try {
			const response = await fetch(
				`https://picsum.photos/v2/list?page=${page}&limit=10`,
			);

			if (!response.ok) {
				throw new Error('Error fetching images');
			}

			const newImages = await response.json();

			setImages((prevImages) => [...prevImages, ...newImages]);
			setPage((prevPage) => prevPage + 1);
		} catch (error) {
			console.error('Error fetching images:', error);
		} finally {
			setLoading(false);
		}
	}, [page, loading, hasMore]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !loading) {
					loadImages();
				}
			},
			{ threshold: 0.1 },
		);

		if (loaderRef.current) {
			observer.observe(loaderRef.current);
		}

		return () => {
			if (loaderRef.current) {
				observer.unobserve(loaderRef.current);
			}
		};
	}, [loading, loadImages]);

	return (
		<>
			<div className="image-grid">
				{images.map((image) => (
					<ImageCard
						key={image.id}
						imageUrl={image.download_url}
						author={image.author}
					/>
				))}
			</div>
			{hasMore && (
				<div className="loading" ref={loaderRef}>
					{loading ? 'Loading images...' : 'Scroll for more images'}
				</div>
			)}
		</>
	);
};

export default ImageGallery;
