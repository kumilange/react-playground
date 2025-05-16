import React from 'react';
import ReactDOM from 'react-dom/client';
import { FileExplorer } from './components';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<FileExplorer />
	</React.StrictMode>,
);
