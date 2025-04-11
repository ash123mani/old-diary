import { PageHeader } from "./components/page-header/page-header.tsx";
import { Separator } from "./common/seprator/separator.tsx";
import { DiaryItemsTree } from "./components/diary-items-tree";
import { useState } from "react";
import { DiaryItemContent } from "./components/diary-item-content";

import "./app.css";
import { BaseFileSystemNode } from "./components/diary-items-tree/diary-item.type.ts";

function App() {
  const [diaryItems, setDiaryItems] = useState<BaseFileSystemNode[]>([]);
  const [selectedParentDiaryItemId, setSelectedParentDiaryItemId] = useState<string | null>(null);
  const [expandedDiaryItems, setExpandedDiaryItems] = useState<string[]>([]);

  function handleCreateNewItemSubmit(newItem: BaseFileSystemNode) {
    if (!newItem.parentId) {
      setDiaryItems([...diaryItems, newItem]);
    } else {
      const diaryItem: BaseFileSystemNode | undefined = findParentDiaryItem(diaryItems, newItem);
      if (diaryItem) {
        diaryItem.children = [...diaryItem.children!, newItem];
        setDiaryItems([...diaryItems]);
      }
    }
    setSelectedParentDiaryItemId(null);
  }

  function handleDiaryItemActionClick(parentDiaryItemId: string) {
    setSelectedParentDiaryItemId(parentDiaryItemId);
  }

  function handleDiaryItemExpand(diaryItem: BaseFileSystemNode) {
    setExpandedDiaryItems((allExpandedItems) => {
      const diaryItemIndex = allExpandedItems.indexOf(diaryItem.id);
      if (diaryItemIndex !== -1) {
        return allExpandedItems.toSpliced(diaryItemIndex, 1);
      } else {
        return [...allExpandedItems, diaryItem.id];
      }
    });
  }

  console.log("expandedDiaryItems", expandedDiaryItems);

  return (
    <div className="app">
      <PageHeader />
      <Separator type="horizontal" />
      <main style={{ display: "flex", flex: 1, gap: "20px" }}>
        <DiaryItemsTree
          onCreateNewItemSubmit={handleCreateNewItemSubmit}
          diaryItems={diaryItems}
          onDiaryItemActionClick={handleDiaryItemActionClick}
          onDiaryItemExpand={handleDiaryItemExpand}
          selectedParentDiaryItemId={selectedParentDiaryItemId}
        />
        <Separator type="vertical" />
        <DiaryItemContent />
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
