import './app.css';

import { PageHeader} from "./components/page-header/page-header.tsx";
import { Separator } from "./common/seprator/separator.tsx";
import {RightSection} from "./components/right-section";
import {useState} from "react";
import fileClosed from './assets/file-closed.svg';
import folderClosed from './assets/folder-closed.svg';

export type ItemType = "file" | "folder";

export interface IFile {
  name: string;
  id: string;
  type: ItemType;
}

function App() {
  const [allFiles, setAllFiles] = useState<IFile[]>([]);

  function handleAddNewItem(file: IFile) {
    setAllFiles((allFiles) => [...allFiles, file]);
  }

  return (
    <div className="app">
      <PageHeader />
      <Separator type="horizontal" />
      <main style={{display: 'flex', flex: 1, gap: '20px'}}>
        <section style={{ marginTop: '20px' }}>
          <aside>
            <RightSection onAddNewItem={handleAddNewItem}/>
            <Separator type="horizontal"/>
            <nav>
              <ul style={{gap: '8px'}}>
                {allFiles.map((file: IFile) => {
                  const isFile = file.type === "file";
                  const icon = isFile ? fileClosed : folderClosed;
                  return (
                    <li key={file.id} style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                        <img width="24" height="24" src={icon} alt={file.name}/>
                        <span>{file.name}</span>
                    </li>
                  )
                })}
              </ul>
            </nav>

          </aside>

        </section>
        <Separator type="vertical"/>

        <section style={{flex: 1, marginTop: '20px'}}>
          <div className="terminal-card">
            <header>Card Title</header>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, quas
              ex vero enim in doloribus officiis ullam vel nam esse sapiente velit
              incidunt. Eaque quod et, aut maiores excepturi sint.          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, quas
              ex vero enim in doloribus officiis ullam vel nam esse sapiente velit
              incidunt. Eaque quod et, aut maiores excepturi sint.          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, quas
              ex vero enim in doloribus officiis ullam vel nam esse sapiente velit
              incidunt. Eaque quod et, aut maiores excepturi sint.          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, quas
              ex vero enim in doloribus officiis ullam vel nam esse sapiente velit
              incidunt. Eaque quod et, aut maiores excepturi sint.          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, quas
              ex vero enim in doloribus officiis ullam vel nam esse sapiente velit
              incidunt. Eaque quod et, aut maiores excepturi sint.
            </div>
          </div>
        </section>
      </main>
      <Separator type="horizontal" />
      <footer style={{paddingTop: '12px', paddingBottom: '12px', textAlign: 'center'}}>© Old diary</footer>
    </div>
  )
}

export default App
