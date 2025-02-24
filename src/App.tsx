import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Editor from "./screens/Editor";
import Info from "./screens/Info";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Editor />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </Router>
  );
}
