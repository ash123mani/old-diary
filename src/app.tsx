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

  function handleCreateNewItem(newItem: BaseFileSystemNode) {
    if (!newItem.parentId) {
      setFileSystem([...fileSystem, newItem]);
    } else {
      const parentItem = fileSystem.find((diaryItem) => diaryItem.id === newItem.parentId);
      if (parentItem) {
        parentItem.children = [...parentItem.children!, newItem];
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
