import { PageHeader } from "./components/page-header/page-header.tsx";
import { Separator } from "./common/seprator/separator.tsx";
import { RightSection } from "./components/right-section";
import { useState } from "react";
import { LeftSection } from "./components/left-section";

import "./app.css";

export type ItemType = "file" | "folder";

export interface IFile {
  name: string;
  id: string;
  type: ItemType;
}

function App() {
  const [allFiles, setAllFiles] = useState<IFile[]>([]);

  function handleCreateNewItem(file: IFile) {
    setAllFiles((allFiles) => [...allFiles, file]);
  }

  return (
    <div className="app">
      <PageHeader />
      <Separator type="horizontal" />
      <main style={{ display: "flex", flex: 1, gap: "20px" }}>
        <RightSection onCreateNewItem={handleCreateNewItem} files={allFiles} />
        <Separator type="vertical" />
        <LeftSection />
      </main>
      <Separator type="horizontal" />
      <footer style={{ paddingTop: "12px", paddingBottom: "12px", textAlign: "center" }}>© Old diary</footer>
    </div>
  );
}

export default App;
