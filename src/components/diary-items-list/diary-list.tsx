import "./diary-list.css";
import { BaseFileSystemNode } from "../right-section/diary-item.type.ts";
import { ReactNode } from "react";
import { DiaryItem } from "./diary-item.tsx";

interface DiaryListProps {
  fileSystem: BaseFileSystemNode[];
  onCreateNewItem: (diaryItem: BaseFileSystemNode) => void;
}

export function DiaryList({ fileSystem, onCreateNewItem }: DiaryListProps) {
  return (
    <nav>
      <ul className="diary-ul">
        <FileSystem fileSystem={fileSystem} onCreateNewItem={onCreateNewItem} />
      </ul>
    </nav>
  );
}

interface FileSystemProps {
  fileSystem: BaseFileSystemNode[];
  depth?: number;
  onCreateNewItem: (diaryItem: BaseFileSystemNode) => void;
}

function FileSystem({ fileSystem, depth = 0, onCreateNewItem }: FileSystemProps): ReactNode | ReactNode[] {
  return fileSystem.map((diaryItem: BaseFileSystemNode) => {
    if (!diaryItem.parentId) depth = 0;

    const tree = [];
    tree.push(
      <div>
        <DiaryItem diaryItem={diaryItem} onCreateNewItem={onCreateNewItem} />
      </div>,
    );

    if (diaryItem.children?.length) {
      depth = depth + 1;
      tree.push(
        <div style={{ marginLeft: `${depth * 4}px` }}>
          <FileSystem fileSystem={diaryItem.children} depth={depth} onCreateNewItem={onCreateNewItem} />
        </div>,
      );
    }

    return tree;
  });
}
