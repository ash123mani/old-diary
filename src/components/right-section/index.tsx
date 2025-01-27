import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import "rc-tooltip/assets/bootstrap.css";

import { Modal } from "../../common/modal/modal.tsx";
import { IFile } from "../../app.tsx";
import { Separator } from "../../common/seprator/separator.tsx";

import "./right-section.css";
import { DiaryList } from "./diary-list.tsx";

type ActionType = "create-file" | "create-folder";

interface RightSectionProps {
  onAddNewItem: (file: IFile) => void;
  files: IFile[];
}

export function RightSection({ onAddNewItem, files }: RightSectionProps) {
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const fileNameRef = useRef<IFile | null>(null);

  function handleFileNameChange(e: ChangeEvent<HTMLInputElement>) {
    const fileName = e.target.value;
    fileNameRef.current = {
      name: fileName,
      id: fileName,
      type: actionType === "create-file" ? "file" : "folder",
    };
  }

  function handleAddNewItemSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAddNewItem(fileNameRef.current!);
    fileNameRef.current = null;
    setActionType(null);
  }

  const showActionModal = !!actionType;
  return (
    <section style={{ marginTop: "20px" }}>
      <aside>
        <button className="btn btn-small" onClick={() => setActionType("create-folder")}>
          + section
        </button>
        <button className="btn btn-ghost btn-small" onClick={() => setActionType("create-file")}>
          + page
        </button>
        <Separator type="horizontal" style={{ margin: "20px 0" }} />
        <DiaryList files={files} />
        <Modal isOpen={showActionModal} onClose={() => setActionType(null)}>
          <form onSubmit={handleAddNewItemSubmit}>
            <label htmlFor="page-name" style={{ display: "grid" }}>
              {actionType === "create-file" ? "File" : "Folder"} name:
              <input type="text" id="page-name" name="pageName" onChange={handleFileNameChange} autoFocus />
            </label>
          </form>
        </Modal>
      </aside>
    </section>
  );
}
