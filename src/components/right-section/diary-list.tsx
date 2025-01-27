import { IFile } from "../../app.tsx";
import fileClosed from "../../assets/file-closed.svg";
import folderClosed from "../../assets/folder-closed.svg";
import Tooltip from "rc-tooltip";

interface DiaryListProps {
  files: IFile[];
}

export function DiaryList({ files }: DiaryListProps) {
  return (
    <nav>
      <ul style={{ gap: "8px" }}>
        {files.map((file: IFile) => {
          const isFile = file.type === "file";
          const icon = isFile ? fileClosed : folderClosed;
          return (
            <Tooltip
              placement="right"
              classNames={{ root: "old-diary-tooltip-root", body: "old-diary-tooltip-body" }}
              trigger={["click"]}
              overlay={<span style={{ color: "var(--invert-font-color)" }}>tooltip</span>}
            >
              <li key={file.id} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
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
