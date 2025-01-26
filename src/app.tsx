import './app.css';

import { PageHeader} from "./components/page-header/page-header.tsx";
import { Separator } from "./common/seprator/separator.tsx";
import {RightSection} from "./components/right-section";
import {useState} from "react";

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
        <section>
          <aside>
            <RightSection onAddNewItem={handleAddNewItem}/>
            <Separator type="horizontal"/>
            <nav>
              <ul>
                {allFiles.map((file: IFile) => {
                  const isFile = file.type === "file";
                  return (
                    <li key={file.id} style={{
                      fontWeight: isFile ? "normal" : "bold"
                    }}><a href={`#${file.id}`}>{file.name}</a></li>
                  )
                })}
              </ul>
            </nav>

          </aside>
        </section>

        <Separator type="vertical"/>
        <section style={{flex: 1}}>
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
      <footer style={{paddingTop: '12px', paddingBottom: '12px', textAlign: 'center'}}>© Old diary</footer>
    </div>
  )
}

export default App
