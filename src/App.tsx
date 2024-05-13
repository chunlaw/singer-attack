import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import GameBoard from "./pages/GameBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path=":path?" element={<GameBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
