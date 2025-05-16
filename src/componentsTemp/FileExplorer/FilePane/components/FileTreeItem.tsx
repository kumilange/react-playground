import React, { useState } from 'react';
import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Collapse,
	List,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeNode } from '../utils/fileTreeUtils';

interface FileTreeItemProps {
	node: TreeNode;
	level: number;
	activePath?: string;
	onFileSelect: (path: string) => void;
	isRoot?: boolean;
}

const FileTreeItem: React.FC<FileTreeItemProps> = ({
	node,
	level,
	activePath,
	onFileSelect,
	isRoot = false,
}) => {
	// State to track if a folder is open/expanded
	const [open, setOpen] = useState(true);

	// Don't render the root node itself, only its children
	if (isRoot) {
		return (
			<>
				{node.children.map((child) => (
					<FileTreeItem
						key={child.path}
						node={child}
						level={level}
						activePath={activePath}
						onFileSelect={onFileSelect}
					/>
				))}
			</>
		);
	}

	// Handle folder click (toggle expand/collapse)
	const handleFolderClick = () => {
		setOpen(!open);
	};

	// Handle file click (select file)
	const handleFileClick = () => {
		if (!node.isFolder) {
			onFileSelect(node.path);
		}
	};

	const isActive = activePath === node.path;
	const indent = level * 16; // 16px indentation per level

	return (
		<>
			<ListItem
				disablePadding
				sx={{
					display: 'block',
					backgroundColor: isActive
						? 'rgba(25, 118, 210, 0.08)'
						: 'transparent',
				}}
			>
				<ListItemButton
					onClick={node.isFolder ? handleFolderClick : handleFileClick}
					sx={{
						pl: `${indent}px`,
						py: 0.5,
					}}
					dense
				>
					<ListItemIcon sx={{ minWidth: 24, mr: 1 }}>
						{node.isFolder ? (
							open ? (
								<FolderOpenIcon fontSize="small" color="primary" />
							) : (
								<FolderIcon fontSize="small" color="primary" />
							)
						) : (
							<InsertDriveFileIcon fontSize="small" color="disabled" />
						)}
					</ListItemIcon>
					<ListItemText
						primary={node.name}
						primaryTypographyProps={{
							variant: 'body2',
							fontSize: '0.875rem',
							sx: {
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
							},
						}}
					/>
					{node.isFolder &&
						node.children.length > 0 &&
						(open ? (
							<ExpandMoreIcon fontSize="small" />
						) : (
							<ChevronRightIcon fontSize="small" />
						))}
				</ListItemButton>
			</ListItem>

			{/* Render children if this is a folder and it's open */}
			{node.isFolder && node.children.length > 0 && (
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding dense>
						{node.children.map((child) => (
							<FileTreeItem
								key={child.path}
								node={child}
								level={level + 1}
								activePath={activePath}
								onFileSelect={onFileSelect}
							/>
						))}
					</List>
				</Collapse>
			)}
		</>
	);
};

export default FileTreeItem;
