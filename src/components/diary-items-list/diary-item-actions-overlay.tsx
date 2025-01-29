import { DiaryCreateActions } from "./diary-create-actions.tsx";
import { BaseFileSystemNode } from "../right-section/diary-item.type.ts";

interface DiaryItemActionsOverlayProps {
  onCreateNewItemSubmit: (diaryItem: BaseFileSystemNode) => void;
  onCreateNewItemClick: () => void;
  parentId: string | null;
}

export function DiaryItemActionsOverlay({
  onCreateNewItemSubmit,
  onCreateNewItemClick,
  parentId,
}: DiaryItemActionsOverlayProps) {
  return (
    <div className="old-diary-tooltip-content">
      <div>
        <DiaryCreateActions
          onCreateNewItemSubmit={onCreateNewItemSubmit}
          onCreateNewItemClick={onCreateNewItemClick}
          parentId={parentId}
        />
      </div>
    </div>
  );
}
