import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Nannies from "./pages/Nannies/Nannies";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nannies" element={<Nannies />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
