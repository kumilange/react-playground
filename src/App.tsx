import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
	// UserPage,
	// Main,
	CoursePage,
	Home,
	UserTable,
	CourseGallery,
	CourseList,
	ImageGallery,
	FileExplorer,
} from './components';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/courses/:courseId" element={<CoursePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
