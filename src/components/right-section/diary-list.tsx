import Tooltip from "rc-tooltip";

import fileClosed from "../../assets/file-closed.svg";
import folderClosed from "../../assets/folder-closed.svg";

import { DiaryCreateActions } from "./diary-create-actions.tsx";

import "./diary-list.css";
import { BaseFileSystemNode } from "./diary-item.type.ts";
import { useRef } from "react";

interface DiaryListProps {
  fileSystem: BaseFileSystemNode[];
  onCreateNewItem: (diaryItem: BaseFileSystemNode) => void;
}

export function DiaryList({ fileSystem, onCreateNewItem }: DiaryListProps) {
  const selectedParentIdRef = useRef<string | null>(null);

  function handleDiaryItemActionClick(parentId: string) {
    selectedParentIdRef.current = parentId;
  }

  return (
    <nav>
      <ul className="diary-ul">
        {fileSystem.map((file: BaseFileSystemNode) => {
          const isFile = file.type === "file";
          const icon = isFile ? fileClosed : folderClosed;
          return (
            <Tooltip
              placement="right"
              classNames={{ root: "old-diary-tooltip-root", body: "old-diary-tooltip-body" }}
              trigger={["click"]}
              overlay={
                <DiaryItemActionsOverlay onCreateNewItem={onCreateNewItem} parentId={selectedParentIdRef.current} />
              }
            >
              <li
                key={file.id}
                className="diary-li diary"
                role="button"
                id={file.id}
                onClick={() => handleDiaryItemActionClick(file.id)}
              >
                <img width="24" height="24" src={icon} alt={file.name} />
                <span>{file.name}</span>
              </li>
            </Tooltip>
          );
        })}
      </ul>
    </nav>
  );
}

interface DiaryItemActionsOverlayProps {
  onCreateNewItem: (diaryItem: BaseFileSystemNode) => void;
  parentId: string | null;
}

const DiaryItemActionsOverlay = ({ onCreateNewItem, parentId }: DiaryItemActionsOverlayProps) => {
  return (
    <div className="old-diary-tooltip-content">
      <div>
        <DiaryCreateActions onCreateNewItem={onCreateNewItem} parentId={parentId} />
      </div>
    </div>
  );
};
