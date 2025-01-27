import { type ChangeEvent, type FormEvent, Fragment, useRef, useState } from "react";

import { ActionType } from "./index.tsx";
import { Modal } from "../../common/modal/modal.tsx";
import { IFile } from "../../app.tsx";

interface DiaryCreateActionProps {
  onCreateNewItem: (file: IFile) => void;
}

export function DiaryCreateActions({ onCreateNewItem }: DiaryCreateActionProps) {
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
    onCreateNewItem(fileNameRef.current!);
    fileNameRef.current = null;
    setActionType(null);
  }

  const showActionModal = !!actionType;
  return (
    <Fragment>
      <button className="btn btn-small" onClick={() => setActionType("create-folder")}>
        + section
      </button>
      <button className="btn btn-ghost btn-small" onClick={() => setActionType("create-file")}>
        + page
      </button>

      <Modal isOpen={showActionModal} onClose={() => setActionType(null)}>
        <form onSubmit={handleAddNewItemSubmit}>
          <label htmlFor="page-name" style={{ display: "grid" }}>
            {actionType === "create-file" ? "File" : "Folder"} name:
            <input type="text" id="page-name" name="pageName" onChange={handleFileNameChange} autoFocus />
          </label>
        </form>
      </Modal>
    </Fragment>
  );
}
