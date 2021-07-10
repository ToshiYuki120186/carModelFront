import './App.css';
import CarsList from "./components/cars-list"

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand ml-3"  >
          Car Model List
        </a>
      </nav>
      <div className="container mt-3">
        <CarsList />
      </div>
    </div>
  );
}

export default App;
