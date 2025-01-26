import './page-header.css';

export function PageHeader() {
  return (
    <header>
      <nav aria-label="Main navigation">
        <ul className="header-nav-list">
          <li><a href="#home">Old Diary</a></li>
        </ul>
      </nav>
    </header>
  )
}