import "rc-tooltip/assets/bootstrap.css";

import { Separator } from "../../common/seprator/separator.tsx";

import { DiaryList } from "./diary-list.tsx";
import { DiaryCreateActions } from "./diary-create-actions.tsx";
import { BaseFileSystemNode } from "./diary-item.type.ts";

export type ActionType = "create-file" | "create-folder";

interface DiaryItemsTreeProps {
  onCreateNewItemSubmit: (file: BaseFileSystemNode) => void;
  onDiaryItemActionClick: (parentDiaryItemId: string) => void;
  onDiaryItemExpand: (diaryItem: BaseFileSystemNode) => void;
  diaryItems: BaseFileSystemNode[];
  selectedParentDiaryItemId: string | null;
}

export function DiaryItemsTree({
  onCreateNewItemSubmit,
  onDiaryItemActionClick,
  onDiaryItemExpand,
  diaryItems,
  selectedParentDiaryItemId,
}: DiaryItemsTreeProps) {
  return (
    <section style={{ marginTop: "20px" }}>
      <aside style={{ maxWidth: "240px", width: "240px" }}>
        <DiaryCreateActions onCreateNewItemSubmit={onCreateNewItemSubmit} parentId={null} />
        <Separator type="horizontal" style={{ margin: "20px 0" }} />
        <DiaryList
          diaryItems={diaryItems}
          onCreateNewItemSubmit={onCreateNewItemSubmit}
          onDiaryItemActionClick={onDiaryItemActionClick}
          selectedParentDiaryItemId={selectedParentDiaryItemId}
          onDiaryItemExpand={onDiaryItemExpand}
        />
      </aside>
    </section>
  );
}
