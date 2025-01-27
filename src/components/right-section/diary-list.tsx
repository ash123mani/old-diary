import Tooltip from "rc-tooltip";

import { IFile } from "../../app.tsx";
import fileClosed from "../../assets/file-closed.svg";
import folderClosed from "../../assets/folder-closed.svg";

import { DiaryCreateActions } from "./diary-create-actions.tsx";

import "./diary-list.css";

interface DiaryListProps {
  files: IFile[];
  onCreateNewItem: (file: IFile) => void;
}

export function DiaryList({ files, onCreateNewItem }: DiaryListProps) {
  const overlay = () => {
    return (
      <div className="old-diary-tooltip-content">
        <div>
          <DiaryCreateActions onCreateNewItem={onCreateNewItem} />
        </div>
      </div>
    );
  };

  return (
    <nav>
      <ul className="diary-ul">
        {files.map((file: IFile) => {
          const isFile = file.type === "file";
          const icon = isFile ? fileClosed : folderClosed;
          return (
            <Tooltip
              placement="right"
              classNames={{ root: "old-diary-tooltip-root", body: "old-diary-tooltip-body" }}
              trigger={["click"]}
              overlay={overlay}
            >
              <li key={file.id} className="diary-li">
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
