import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FindRide from "./pages/FindRide";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/find-ride" element={<FindRide />} />
    </Routes>
  );
}

export default App;