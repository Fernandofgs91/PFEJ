import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
import GridCards from "./components/GridCards";
import Pagina2 from "./components/Pagina2";
import "./styles/global.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
         
          <InfoBox />
          <GridCards />
        </>
      } />
      <Route path="/pagina2" element={<Pagina2 />} />
    </Routes>
  );
}

export default App;
