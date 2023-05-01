import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/About";
import NoMatch from "./pages/NoMatch";

const App = () => {
  return (
    <div className="App">
      <div className="App-header ">
        <nav style={{ gap: "1rem", display: "flex", marginBottom: "1rem" }}>
          <Link to="/">Contant</Link>

          <Link to="/about">About</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
