import Tooltip from "rc-tooltip";

import fileClosed from "../../assets/file-closed.svg";
import folderClosed from "../../assets/folder-closed.svg";

import { DiaryCreateActions } from "./diary-create-actions.tsx";

import "./diary-list.css";
import { BaseFileSystemNode } from "./diary-item.type.ts";
import { ReactNode, useState } from "react";

interface DiaryListProps {
  fileSystem: BaseFileSystemNode[];
  onCreateNewItem: (diaryItem: BaseFileSystemNode) => void;
}

export function DiaryList({ fileSystem, onCreateNewItem }: DiaryListProps) {
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);

  function handleDiaryItemActionClick(parentId: string) {
    setSelectedParentId(parentId);
  }

  const renderDiaryItem = (diaryItem: BaseFileSystemNode) => {
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
  };

  const renderFileSystem = (fileSystem: BaseFileSystemNode[]): ReactNode | ReactNode[] => {
    return fileSystem.map((diaryItem) => {
      const tree = [];
      tree.push(renderDiaryItem(diaryItem));
      if (diaryItem.children?.length) {
        tree.push(<div style={{ marginLeft: "8px" }}>{renderFileSystem(diaryItem.children)}</div>);
      }
      return tree;
    });
  };

  return (
    <nav>
      <ul className="diary-ul">{renderFileSystem(fileSystem)}</ul>
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
