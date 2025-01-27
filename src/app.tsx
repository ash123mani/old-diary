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
    // If no parentId id present with newItem then its on the root node
    if (!newItem.parentId) {
      setFileSystem([...fileSystem, newItem]);
    } else {
      const diaryItem = fileSystem.find((diaryItem) => {
        if (diaryItem.id === newItem.parentId) {
          return diaryItem;
        }
      });
      if (diaryItem) {
        diaryItem.children = [...diaryItem.children!, newItem];
      }
      setFileSystem(fileSystem);
    }

    // If parentId is present then iterate the fileSystem to the parent Item and attach the newItem to it
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
