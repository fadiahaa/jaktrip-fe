import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wisata from "./pages/Wisata";
import DetailWisata from "./pages/DetailWisata";
import Planner from "./pages/Planner";
import HasilPlanner from "./pages/HasilPlanner";
import History from "./pages/History";
import HistoryDetail from "./pages/HistoryDetail";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/wisata" element={<Wisata />} />
        <Route path="/wisata/:id" element={<DetailWisata />} />

        <Route path="/planner" element={<Planner />} />
        <Route path="/planner/hasil" element={<HasilPlanner />} />

        <Route path="/history" element={<History />} />
        <Route path="/history/:id" element={<HistoryDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
