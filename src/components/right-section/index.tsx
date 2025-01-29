import "rc-tooltip/assets/bootstrap.css";

import { Separator } from "../../common/seprator/separator.tsx";

import { DiaryList } from "../diary-items-list/diary-list.tsx";
import { DiaryCreateActions } from "../diary-items-list/diary-create-actions.tsx";
import { BaseFileSystemNode } from "./diary-item.type.ts";

export type ActionType = "create-file" | "create-folder";

interface RightSectionProps {
  onCreateNewItemSubmit: (file: BaseFileSystemNode) => void;
  onDiaryItemActionClick: (parentDiaryItemId: string) => void;
  fileSystem: BaseFileSystemNode[];
  selectedParentDiaryItemId: string | null;
}

export function RightSection({
  onCreateNewItemSubmit,
  onDiaryItemActionClick,
  fileSystem,
  selectedParentDiaryItemId,
}: RightSectionProps) {
  return (
    <section style={{ marginTop: "20px" }}>
      <aside style={{ maxWidth: "240px", width: "240px" }}>
        <DiaryCreateActions onCreateNewItemSubmit={onCreateNewItemSubmit} parentId={null} />
        <Separator type="horizontal" style={{ margin: "20px 0" }} />
        <DiaryList
          fileSystem={fileSystem}
          onCreateNewItemSubmit={onCreateNewItemSubmit}
          onDiaryItemActionClick={onDiaryItemActionClick}
          selectedParentDiaryItemId={selectedParentDiaryItemId}
        />
      </aside>
    </section>
  );
}
