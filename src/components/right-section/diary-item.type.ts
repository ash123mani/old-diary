interface FileMetadata {
  createdAt: string; // ISO 8601 timestamp of creation
}

interface BaseFileSystemNode {
  id: string; // Unique identifier for the object
  name: string; // Name of the file or folder
  type: "file" | "folder"; // Type: file or folder
  parentId: string | null; // ID of the parent folder, null for root
  metadata: FileMetadata; // Metadata object
}

interface FileNode extends BaseFileSystemNode {
  type: "file";
  children?: never; // Files cannot have children
}

interface FolderNode extends BaseFileSystemNode {
  type: "folder";
  children: FileSystemNode[]; // Folders can have children
}

type FileSystemNode = FileNode | FolderNode;
