import SearchFilter from "./components/SearchFilter";
import "./App.css";

function App() {
  return (
    <main className="app-shell">
      <header className="page-header">
        <div className="eyebrow">REACT + TYPESCRIPT PRACTICE</div>
        <h1>Find what you’re looking for.</h1>
        <p>Search products by name, then narrow the results by category and price.</p>
      </header>

      <SearchFilter />
      <footer className="page-footer">A small, practical search and filter application.</footer>
    </main>
  );
}

export default App;
