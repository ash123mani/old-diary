import "./diary-list.css";
import { BaseFileSystemNode } from "../right-section/diary-item.type.ts";
import { ReactNode } from "react";
import { DiaryItem } from "./diary-item.tsx";

interface DiaryListProps {
  fileSystem: BaseFileSystemNode[];
  onCreateNewItemSubmit: (diaryItem: BaseFileSystemNode) => void;
  onDiaryItemActionClick: (parentDiaryItemId: string) => void;
  selectedParentDiaryItemId: string | null;
}

export function DiaryList({
  fileSystem,
  onCreateNewItemSubmit,
  onDiaryItemActionClick,
  selectedParentDiaryItemId,
}: DiaryListProps) {
  return (
    <nav>
      <ul className="diary-ul">
        <FileSystem
          fileSystem={fileSystem}
          onCreateNewItemSubmit={onCreateNewItemSubmit}
          onDiaryItemActionClick={onDiaryItemActionClick}
          selectedParentDiaryItemId={selectedParentDiaryItemId}
        />
      </ul>
    </nav>
  );
}

interface FileSystemProps {
  fileSystem: BaseFileSystemNode[];
  depth?: number;
  onCreateNewItemSubmit: (diaryItem: BaseFileSystemNode) => void;
  onDiaryItemActionClick: (parentDiaryItemId: string) => void;
  selectedParentDiaryItemId: string | null;
}

function FileSystem({
  fileSystem,
  depth = 0,
  onCreateNewItemSubmit,
  onDiaryItemActionClick,
  selectedParentDiaryItemId,
}: FileSystemProps): ReactNode | ReactNode[] {
  return fileSystem.map((diaryItem: BaseFileSystemNode) => {
    if (!diaryItem.parentId) depth = 0;

    const tree = [];
    tree.push(
      <div style={{ marginLeft: `${depth * 4}px` }}>
        <DiaryItem
          diaryItem={diaryItem}
          onCreateNewItemSubmit={onCreateNewItemSubmit}
          onDiaryItemActionClick={onDiaryItemActionClick}
          selectedParentDiaryItemId={selectedParentDiaryItemId}
        />
        {!!diaryItem.children?.length && (
          <FileSystem
            fileSystem={diaryItem.children}
            depth={depth + 1}
            onCreateNewItemSubmit={onCreateNewItemSubmit}
            onDiaryItemActionClick={onDiaryItemActionClick}
            selectedParentDiaryItemId={selectedParentDiaryItemId}
          />
        )}
      </div>,
    );

    return tree;
  });
}
