import "rc-tooltip/assets/bootstrap.css";

import { Separator } from "../../common/seprator/separator.tsx";

import { DiaryList } from "../diary-items-list/diary-list.tsx";
import { DiaryCreateActions } from "../diary-items-list/diary-create-actions.tsx";
import { BaseFileSystemNode } from "./diary-item.type.ts";

export type ActionType = "create-file" | "create-folder";

interface RightSectionProps {
  onCreateNewItem: (file: BaseFileSystemNode) => void;
  fileSystem: BaseFileSystemNode[];
}

export function RightSection({ onCreateNewItem, fileSystem }: RightSectionProps) {
  return (
    <section style={{ marginTop: "20px" }}>
      <aside>
        <DiaryCreateActions onCreateNewItem={onCreateNewItem} parentId={null} />
        <Separator type="horizontal" style={{ margin: "20px 0" }} />
        <DiaryList fileSystem={fileSystem} onCreateNewItem={onCreateNewItem} />
      </aside>
    </section>
  );
}
