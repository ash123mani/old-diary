interface FileMetadata {
  createdAt: number; // ISO 8601 timestamp of creation
}

export interface BaseFileSystemNode {
  id: string; // Unique identifier for the object
  name: string; // Name of the file or folder
  type: "file" | "folder"; // Type: file or folder
  parentId: string | null; // ID of the parent folder, null for root
  metadata: FileMetadata; // Metadata object
  children?: BaseFileSystemNode[];
}
