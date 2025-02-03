import { DiaryCreateActions } from "./diary-create-actions.tsx";
import { BaseFileSystemNode } from "../right-section/diary-item.type.ts";

interface DiaryItemActionsOverlayProps {
  onCreateNewItemSubmit: (diaryItem: BaseFileSystemNode) => void;
  onCreateNewItemClick: () => void;
  onCloseDiaryItemActionClick: () => void;
  parentId: string | null;
}

export function DiaryItemActionsOverlay({
  onCreateNewItemSubmit,
  onCreateNewItemClick,
  onCloseDiaryItemActionClick,
  parentId,
}: DiaryItemActionsOverlayProps) {
  return (
    <div className="old-diary-tooltip-content">
      <div>
        <div style={{ marginTop: "16px" }}>
          <DiaryCreateActions
            onCreateNewItemSubmit={onCreateNewItemSubmit}
            onCreateNewItemClick={onCreateNewItemClick}
            parentId={parentId}
          />
        </div>
        <button className="tooltip-close-btn" onClick={onCloseDiaryItemActionClick}>
          &times;
        </button>
      </div>
    </div>
  );
}
