import { PageHeader } from "./components/page-header/page-header.tsx";
import { Separator } from "./common/seprator/separator.tsx";
import { RightSection } from "./components/right-section";
import { useState } from "react";
import { LeftSection } from "./components/left-section";

import "./app.css";
import { BaseFileSystemNode } from "./components/right-section/diary-item.type.ts";

function App() {
  const [fileSystem, setFileSystem] = useState<BaseFileSystemNode[]>([]);

  console.log("fileSystem", fileSystem);
  console.log("fatted-fileSystem", fileSystem[0]?.children?.flat());

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

  function handleCreateNewItem(newItem: BaseFileSystemNode) {
    if (!newItem.parentId) {
      setFileSystem([...fileSystem, newItem]);
    } else {
      const diaryItem: BaseFileSystemNode | undefined = findParentDiaryItem(fileSystem, newItem);
      if (diaryItem) {
        diaryItem.children = [...diaryItem.children!, newItem];
        setFileSystem([...fileSystem]);
      }
    }
  }

  return (
    <div className="app">
      <PageHeader />
      <Separator type="horizontal" />
      <main style={{ display: "flex", flex: 1, gap: "20px" }}>
        <RightSection onCreateNewItem={handleCreateNewItem} fileSystem={fileSystem} />
        <Separator type="vertical" />
        <LeftSection />
      </main>
      <Separator type="horizontal" />
      <footer style={{ paddingTop: "12px", paddingBottom: "12px", textAlign: "center" }}>© Old diary</footer>
    </div>
  );
}

export default App;
