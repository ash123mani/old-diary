import { BaseFileSystemNode } from "./diary-item.type.ts";
import { type ReactElement, useState } from "react";
import fileClosed from "../../assets/file-closed.svg";
import folderClosed from "../../assets/folder-closed.svg";
import Tooltip from "rc-tooltip";
import { DiaryItemActionsOverlay } from "./diary-item-actions-overlay.tsx";

interface DiaryItemProps {
  diaryItem: BaseFileSystemNode;
  onCreateNewItemSubmit: (diaryItem: BaseFileSystemNode) => void;
  onDiaryItemActionClick: (parentDiaryItemId: string) => void;
  onDiaryItemExpand: (diaryItem: BaseFileSystemNode) => void;
  selectedParentDiaryItemId: string | null;
}

export function DiaryItem({
  diaryItem,
  onCreateNewItemSubmit,
  onDiaryItemActionClick,
  selectedParentDiaryItemId,
  onDiaryItemExpand,
}: DiaryItemProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  function handleDiaryItemActionClick(parentId: string) {
    onDiaryItemActionClick(parentId);
    setShowTooltip(true);
  }

  function handleCreateNewItemClick() {
    setShowTooltip(false);
  }

  function handleCreateNewItemSubmit(diaryItem: BaseFileSystemNode) {
    onCreateNewItemSubmit(diaryItem);
    onDiaryItemActionClick("");
  }

  const isFile = diaryItem.type === "file";
  const icon = isFile ? fileClosed : folderClosed;
  const selectedCls = selectedParentDiaryItemId === diaryItem.id ? "diary-li__selected" : "diary-li";

  function tooltip(children: ReactElement) {
    return (
      <Tooltip
        placement="bottomRight"
        classNames={{ root: "old-diary-tooltip-root", body: "old-diary-tooltip-body" }}
        trigger="click"
        overlay={
          <DiaryItemActionsOverlay
            onCreateNewItemSubmit={handleCreateNewItemSubmit}
            parentId={selectedParentDiaryItemId}
            onCreateNewItemClick={handleCreateNewItemClick}
            onCloseDiaryItemActionClick={() => setShowTooltip(false)}
          />
        }
        visible={diaryItem.id === selectedParentDiaryItemId && showTooltip}
        showArrow={false}
      >
        {children}
      </Tooltip>
    );
  }

  function diaryListItem(diaryItem: BaseFileSystemNode) {
    return (
      <li
        key={diaryItem.id}
        className={`diary ${selectedCls}`}
        role="button"
        onContextMenu={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleDiaryItemActionClick(diaryItem.id);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onDiaryItemExpand(diaryItem);
        }}
      >
        <img width="24" height="24" src={icon} alt={diaryItem.name} />
        <span>{diaryItem.name}</span>
      </li>
    );
  }

  return isFile ? diaryListItem(diaryItem) : tooltip(diaryListItem(diaryItem));
}
