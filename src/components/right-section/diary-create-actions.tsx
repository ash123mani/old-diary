import { type ChangeEvent, type FormEvent, Fragment, useRef, useState } from "react";
import { nanoid } from "nanoid";

import { ActionType } from "./index.tsx";
import { Modal } from "../../common/modal/modal.tsx";
import { BaseFileSystemNode } from "./diary-item.type.ts";

interface DiaryCreateActionProps {
  onCreateNewItem: (file: BaseFileSystemNode) => void;
  parentId: string | null;
}

export function DiaryCreateActions({ onCreateNewItem, parentId }: DiaryCreateActionProps) {
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const fileNameRef = useRef<string | null>(null);

  console.log("Passed Parent Id", parentId);

  function handleFileNameChange(e: ChangeEvent<HTMLInputElement>) {
    fileNameRef.current = e.target.value;
  }

  function handleAddNewItemSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let item: BaseFileSystemNode | null = null;
    if (actionType === "create-file") {
      item = {
        name: fileNameRef.current!,
        id: nanoid(),
        type: "file",
        parentId: parentId,
        metadata: {
          createdAt: Date.now(),
        },
      };
    } else {
      item = {
        name: fileNameRef.current!,
        id: nanoid(),
        type: "folder",
        parentId: parentId,
        metadata: {
          createdAt: Date.now(),
        },
        children: [],
      };
    }
    onCreateNewItem(item);
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
