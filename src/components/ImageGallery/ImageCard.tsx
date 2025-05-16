import React, { useState } from 'react';
import './ImageCard.css';

interface ImageCardProps {
	imageUrl: string;
	author?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, author }) => {
	const [loaded, setLoaded] = useState(false);

	return (
		<div className={`image-item ${loaded ? 'loaded' : ''}`}>
			<img
				src={imageUrl}
				alt={`Photo by ${author || 'unknown'}`}
				loading="lazy"
				onLoad={() => setLoaded(true)}
			/>
			{author && <div className="image-author">📸 {author}</div>}
		</div>
	);
};

export default ImageCard;
