import React from 'react';
import { Box } from '@mui/material';
import { FilePane } from './FilePane';
import { Editor } from './Editor';
import { WorkspaceProvider } from './Workspace/WorkspaceContext';
import defaultFiles from './Workspace/defaultFiles';

const FileExplorer = () => {
	return (
		<WorkspaceProvider files={defaultFiles}>
			<Box display="flex" height="100%">
				<FilePane />
				<Editor />
			</Box>
		</WorkspaceProvider>
	);
};

export default FileExplorer;
