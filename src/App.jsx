import Home from "./Pages/Home";
import DataAll from "./Pages/DataAll";
import { Routes, Route } from "react-router-dom";
import Fav from "./Pages/Fav";

function App() {
  return (
    <>
      {/* <Search /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fav" element={<Fav />} />
        <Route path="/dataAll/:id" element={<DataAll />} />
      </Routes>
    </>
  );
}

export default App;
