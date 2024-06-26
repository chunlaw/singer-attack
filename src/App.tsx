import { Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import GameBoard from "./pages/GameBoard";
import NewWorld from "./pages/endings/NewWorld";
import Loop from "./pages/endings/Loop";
import Destroy from "./pages/endings/Destroy";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="ending/new-world" element={<NewWorld />} />
        <Route path="ending/good" />
        <Route path="ending/loop" element={<Loop />} />
        <Route path="ending/destroy" element={<Destroy />} />
        <Route index element={<GameBoard />} />
      </Route>
    </Routes>
  );
}

export default App;
