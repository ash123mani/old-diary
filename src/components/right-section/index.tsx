import "rc-tooltip/assets/bootstrap.css";

import { IFile } from "../../app.tsx";
import { Separator } from "../../common/seprator/separator.tsx";

import { DiaryList } from "./diary-list.tsx";
import { DiaryCreateActions } from "./diary-create-actions.tsx";

export type ActionType = "create-file" | "create-folder";

interface RightSectionProps {
  onCreateNewItem: (file: IFile) => void;
  files: IFile[];
}

export function RightSection({ onCreateNewItem, files }: RightSectionProps) {
  return (
    <section style={{ marginTop: "20px" }}>
      <aside>
        <DiaryCreateActions onCreateNewItem={onCreateNewItem} />
        <Separator type="horizontal" style={{ margin: "20px 0" }} />
        <DiaryList files={files} onCreateNewItem={onCreateNewItem} />
      </aside>
    </section>
  );
}
