import { BaseFileSystemNode } from "../right-section/diary-item.type.ts";
import { useState } from "react";
import fileClosed from "../../assets/file-closed.svg";
import folderClosed from "../../assets/folder-closed.svg";
import Tooltip from "rc-tooltip";
import { DiaryItemActionsOverlay } from "./diary-item-actions-overlay.tsx";

interface DiaryItemProps {
  diaryItem: BaseFileSystemNode;
  onCreateNewItem: (diaryItem: BaseFileSystemNode) => void;
}

export function DiaryItem({ diaryItem, onCreateNewItem }: DiaryItemProps) {
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);

  function handleDiaryItemActionClick(parentId: string) {
    setSelectedParentId(parentId);
  }

  const isFile = diaryItem.type === "file";
  const icon = isFile ? fileClosed : folderClosed;
  return (
    <Tooltip
      placement="right"
      classNames={{ root: "old-diary-tooltip-root", body: "old-diary-tooltip-body" }}
      trigger={["click"]}
      overlay={<DiaryItemActionsOverlay onCreateNewItem={onCreateNewItem} parentId={selectedParentId} />}
    >
      <li
        key={diaryItem.id}
        className="diary-li diary"
        role="button"
        id={diaryItem.id}
        onClick={() => handleDiaryItemActionClick(diaryItem.id)}
      >
        <img width="24" height="24" src={icon} alt={diaryItem.name} />
        <span>{diaryItem.name}</span>
      </li>
    </Tooltip>
  );
}
