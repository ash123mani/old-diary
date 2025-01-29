import { DiaryCreateActions } from "./diary-create-actions.tsx";
import { BaseFileSystemNode } from "../right-section/diary-item.type.ts";

interface DiaryItemActionsOverlayProps {
  onCreateNewItem: (diaryItem: BaseFileSystemNode) => void;
  parentId: string | null;
}

export function DiaryItemActionsOverlay({ onCreateNewItem, parentId }: DiaryItemActionsOverlayProps) {
  return (
    <div className="old-diary-tooltip-content">
      <div>
        <DiaryCreateActions onCreateNewItem={onCreateNewItem} parentId={parentId} />
      </div>
    </div>
  );
}
