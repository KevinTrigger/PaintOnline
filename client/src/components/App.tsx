import "../styles/index.scss";
import * as palette from "../styles/variables";
import { Toolbar } from "./Toolbar";
import { SettingsPanel } from "./SettingsPanel";
import { Canvas } from "./Canvas";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Layout = palette.Layout;

const uniqRoomId = `/f${(+new Date()).toString(16)}`;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/:id"
          element={
            <Layout>
              <Toolbar />
              <SettingsPanel />
              <Canvas />
            </Layout>
          }
        />
        <Route path="/" element={<Navigate to={uniqRoomId} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
