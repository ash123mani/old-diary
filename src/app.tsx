import { PageHeader } from "./components/page-header/page-header.tsx";
import { Separator } from "./common/seprator/separator.tsx";
import { RightSection } from "./components/right-section";
import { useState } from "react";
import { LeftSection } from "./components/left-section";

import "./app.css";
import { BaseFileSystemNode } from "./components/right-section/diary-item.type.ts";

function App() {
  const [fileSystem, setFileSystem] = useState<BaseFileSystemNode[]>([]);
  const [selectedParentDiaryItemId, setSelectedParentDiaryItemId] = useState<string | null>(null);

  function handleCreateNewItemSubmit(newItem: BaseFileSystemNode) {
    if (!newItem.parentId) {
      setFileSystem([...fileSystem, newItem]);
    } else {
      const diaryItem: BaseFileSystemNode | undefined = findParentDiaryItem(fileSystem, newItem);
      if (diaryItem) {
        diaryItem.children = [...diaryItem.children!, newItem];
        setFileSystem([...fileSystem]);
      }
    }
    setSelectedParentDiaryItemId(null);
  }

  function handleDiaryItemActionClick(parentDiaryItemId: string) {
    setSelectedParentDiaryItemId(parentDiaryItemId);
  }

  return (
    <div className="app">
      <PageHeader />
      <Separator type="horizontal" />
      <main style={{ display: "flex", flex: 1, gap: "20px" }}>
        <RightSection
          onCreateNewItemSubmit={handleCreateNewItemSubmit}
          fileSystem={fileSystem}
          onDiaryItemActionClick={handleDiaryItemActionClick}
          selectedParentDiaryItemId={selectedParentDiaryItemId}
        />
        <Separator type="vertical" />
        <LeftSection />
      </main>
      <Separator type="horizontal" />
      <footer style={{ paddingTop: "12px", paddingBottom: "12px", textAlign: "center" }}>© Old diary</footer>
    </div>
  );
}

function findParentDiaryItem(
  fileSystem: BaseFileSystemNode[],
  newItem: BaseFileSystemNode,
): BaseFileSystemNode | undefined {
  let diaryItem: BaseFileSystemNode | undefined;
  diaryItem = fileSystem.find((diaryItem) => diaryItem.id === newItem.parentId);

  if (!diaryItem) {
    for (let i = 0; i < fileSystem.length; i++) {
      const parentChildren = fileSystem[i].children;
      if (parentChildren?.length) {
        diaryItem = findParentDiaryItem(parentChildren, newItem);
      }
    }
  }

  return diaryItem;
}

export default App;
