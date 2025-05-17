import { Suspense } from 'react';
import {
	UserTable,
	CourseGallery,
	CourseList,
	ImageGallery,
	FileExplorer,
} from './components';

function App() {
	return (
		<div className="container">
			<Suspense fallback={<p>Loading courses...</p>}>
				<UserTable />
			</Suspense>
		</div>
	);
}

export default App;
