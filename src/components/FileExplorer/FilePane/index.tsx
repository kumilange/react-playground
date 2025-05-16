import React, { useMemo } from 'react';
import { Box, List, Typography } from '@mui/material';
import { useWorkspaceContext } from '../Workspace/WorkspaceContext';
import FileTreeItem from './components/FileTreeItem';
import { buildFileTree } from './utils/fileTreeUtils';

export const FilePane: React.FC = () => {
	const { files, activeFile, activateFile } = useWorkspaceContext();

	// Build nested file tree structure
	const fileTree = useMemo(() => buildFileTree(files), [files]);
	console.log(fileTree);

	return (
		<Box
			width="250px"
			sx={{
				borderRight: '1px solid #e0e0e0',
				height: '100%',
				overflowY: 'auto',
			}}
		>
			<Typography variant="h6" p={2}>
				Files
			</Typography>
			<List dense component="nav" sx={{ p: 0 }}>
				<FileTreeItem
					node={fileTree}
					level={0}
					activePath={activeFile?.path}
					onFileSelect={activateFile}
					isRoot
				/>
			</List>
		</Box>
	);
};
