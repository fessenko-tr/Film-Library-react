import { NavLink } from "react-router-dom";
import s from "./MainNav.module.css";
import { Header } from "antd/lib/layout/layout";
import { Button } from "antd";
import { Space } from "antd";

function MainNav() {
  const { NavHeader } = s;
  return (
    <Header className={NavHeader}>
      <div>
        <Space size="large">
          <NavLink to="/">
            <Button type="default">Home</Button>
          </NavLink>
          <NavLink to="/movies">
            <Button type="default">Movies</Button>
          </NavLink>
        </Space>
      </div>
    </Header>
  );
}

export default MainNav;
