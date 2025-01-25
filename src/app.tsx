import './app.css';

import { PageHeader} from "./components/page-header.tsx";

function App() {

  return (
    <div className="app">
      <PageHeader />
      <hr />
      <main style={{ display: 'flex' }}>
        <section>
          Right secti
        </section>
        <section>Left Secion</section>
      </main>
      <footer>© Old diary</footer>
    </div>
  )
}

export default App
