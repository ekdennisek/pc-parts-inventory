import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./pages/HomePage";
import { PartPage } from "./pages/PartPage";
import { BuildPlannerPage } from "./pages/BuildPlannerPage";
import { BuildsPage } from "./pages/BuildsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/build-planner" element={<BuildPlannerPage />} />
            <Route path="/builds" element={<BuildsPage />} />
            <Route path="/:partType" element={<PartPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
