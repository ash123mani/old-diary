import "./diary-list.css";
import { BaseFileSystemNode } from "../right-section/diary-item.type.ts";
import { ReactNode } from "react";
import { DiaryItem } from "./diary-item.tsx";

interface DiaryListProps {
  diaryItems: BaseFileSystemNode[];
  onCreateNewItemSubmit: (diaryItem: BaseFileSystemNode) => void;
  onDiaryItemActionClick: (parentDiaryItemId: string) => void;
  onDiaryItemExpand: (diaryItem: BaseFileSystemNode) => void;
  selectedParentDiaryItemId: string | null;
}

export function DiaryList({
  diaryItems,
  onCreateNewItemSubmit,
  onDiaryItemActionClick,
  selectedParentDiaryItemId,
  onDiaryItemExpand,
}: DiaryListProps) {
  return (
    <nav>
      <ul className="diary-ul">
        <FileSystem
          diaryItems={diaryItems}
          onCreateNewItemSubmit={onCreateNewItemSubmit}
          onDiaryItemActionClick={onDiaryItemActionClick}
          onDiaryItemExpand={onDiaryItemExpand}
          selectedParentDiaryItemId={selectedParentDiaryItemId}
        />
      </ul>
    </nav>
  );
}

interface FileSystemProps {
  diaryItems: BaseFileSystemNode[];
  depth?: number;
  onCreateNewItemSubmit: (diaryItem: BaseFileSystemNode) => void;
  onDiaryItemActionClick: (parentDiaryItemId: string) => void;
  onDiaryItemExpand: (diaryItem: BaseFileSystemNode) => void;
  selectedParentDiaryItemId: string | null;
}

function FileSystem({
  diaryItems,
  depth = 0,
  onCreateNewItemSubmit,
  onDiaryItemActionClick,
  onDiaryItemExpand,
  selectedParentDiaryItemId,
}: FileSystemProps): ReactNode | ReactNode[] {
  return diaryItems.map((diaryItem: BaseFileSystemNode) => {
    if (!diaryItem.parentId) depth = 0;

    const tree = [];
    tree.push(
      <div style={{ marginLeft: `${depth * 4}px` }} id={diaryItem.id}>
        <DiaryItem
          diaryItem={diaryItem}
          onCreateNewItemSubmit={onCreateNewItemSubmit}
          onDiaryItemActionClick={onDiaryItemActionClick}
          selectedParentDiaryItemId={selectedParentDiaryItemId}
          onDiaryItemExpand={onDiaryItemExpand}
        />
        {!!diaryItem.children?.length && (
          <FileSystem
            diaryItems={diaryItem.children}
            depth={depth + 1}
            onCreateNewItemSubmit={onCreateNewItemSubmit}
            onDiaryItemActionClick={onDiaryItemActionClick}
            onDiaryItemExpand={onDiaryItemExpand}
            selectedParentDiaryItemId={selectedParentDiaryItemId}
          />
        )}
      </div>,
    );

    return tree;
  });
}
