import "./App.css";
import MainPages from "./pages/pages";
import MainNav from "./components/MainNav";
import Layout from "antd/lib/layout/layout";
import "antd/dist/antd.css";

function App() {
  return (
    <Layout style={{ background: "inherit" }}>
      <MainNav />
      <MainPages />
    </Layout>
  );
}

export default App;
