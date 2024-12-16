import "../styles/index.scss";
import * as palette from "../styles/variables";
import { Toolbar } from "./Toolbar";
import { SettingsPanel } from "./SettingsPanel";
import { Canvas } from "./Canvas";

const Layout = palette.Layout;

function App() {
  return (
    <Layout>
      <Toolbar />
      <SettingsPanel />
      <Canvas />
    </Layout>
  );
}

export default App;
