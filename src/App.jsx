import Home from "./Pages/Home";
import DataAll from "./Pages/DataAll";
import Fav from "./Pages/Fav";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fav" element={<Fav />} />
        <Route path="/dataAll/:id" element={<DataAll />} />
      </Routes>
    </>
  );
}

export default App;
