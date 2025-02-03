interface FileMetadata {
  createdAt: number; // ISO 8601 timestamp of creation
}

// TODO: Make this children filed dynamic based on the type
export interface BaseFileSystemNode {
  id: string; // Unique identifier for the object
  name: string; // Name of the file or folder
  type: "file" | "folder"; // Type: file or folder
  parentId: string | null; // ID of the parent folder, null for root
  metadata: FileMetadata; // Metadata object
  // TODO: Make this children filed dynamic based on the type
  children?: BaseFileSystemNode[]; // children will only be there for Files
}
