import './app.css';

import { PageHeader} from "./components/page-header.tsx";
import { Separator } from "./common/separator.tsx";
import {RightSection} from "./components/right-section";

function App() {
  return (
    <div className="app">
      <PageHeader />
      <Separator type="horizontal" />
      <main style={{display: 'flex', flex: 1}}>
        <section style={{paddingTop: '12px', paddingBottom: '12px'}}>
          <RightSection />
          <Separator type="horizontal"/>
        </section>

        <Separator type="vertical"/>
        <section style={{padding: '12px'}}>Directory Item Content</section>
      </main>
      <footer style={{paddingTop: '12px', paddingBottom: '12px', textAlign: 'center' }}>© Old diary</footer>
    </div>
  )
}

export default App
