import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recommendation from "./pages/Recommendation";
import Favorites from "./pages/Favorites";
import DestinationDetail from "./pages/DestinationDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/destinations/:id" element={<DestinationDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
