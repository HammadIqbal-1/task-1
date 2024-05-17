import Home from "./Pages/Home";
import DataAll from "./Pages/DataAll";
import Fav from "./Pages/Fav";
import { Routes, Route } from "react-router-dom";
import Protected from "./Components/Protected";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Protected />}>
          <Route path="/home" element={<Home />} />
          <Route path="/fav" element={<Fav />} />
          <Route path="/dataAll/:id" element={<DataAll />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
