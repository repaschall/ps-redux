import PropTypes from "prop-types";
import React, { useState } from "react";
import "./Aside.scss";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
  FaChevronCircleLeft
} from "react-icons/fa";

const Aside = ({
  image,
  collapsed: initalCollapsed,
  rtl,
  toggled,
  handleToggleSidebar
}) => {
  const [collapsed, setCollapsed] = useState(initalCollapsed);

  return (
    <ProSidebar
      image={image}
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div className="aside-header-wrapper">
          <Menu iconShape="circle">
            <MenuItem
              icon={<FaChevronCircleLeft />}
              onClick={() => setCollapsed(!collapsed)}
            >
              Pro Sidebar
            </MenuItem>
          </Menu>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaTachometerAlt />}
            suffix={<span className="badge red">NEW</span>}
          >
            Dashboard
          </MenuItem>
          <MenuItem icon={<FaGem />}>Components</MenuItem>
        </Menu>
        <Menu iconShape="circle">
          <SubMenu
            suffix={<span className="badge yellow">3</span>}
            title="With Suffix"
            icon={<FaRegLaughWink />}
          >
            <MenuItem>Submenu 1</MenuItem>
            <MenuItem>Submenu 2</MenuItem>
            <MenuItem>Submenu 3</MenuItem>
          </SubMenu>
          <SubMenu
            prefix={<span className="badge gray">3</span>}
            title="With Prefix"
            icon={<FaHeart />}
          >
            <MenuItem>Submenu 1</MenuItem>
            <MenuItem>Submenu 2</MenuItem>
            <MenuItem>Submenu 3</MenuItem>
          </SubMenu>
          <SubMenu title="Mult Level" icon={<FaList />}>
            <MenuItem>Submenu 1 </MenuItem>
            <MenuItem>Submenu 2 </MenuItem>
            <SubMenu title="Submenu 3">
              <MenuItem>Submenu 3.1 </MenuItem>
              <MenuItem>Submenu 3.2 </MenuItem>
              <SubMenu title="Submenu 3.3">
                <MenuItem>Submenu 3.3.1 </MenuItem>
                <MenuItem>Submenu 3.3.2 </MenuItem>
                <MenuItem>Submenu 3.3.3 </MenuItem>
              </SubMenu>
            </SubMenu>
          </SubMenu>
        </Menu>
      </SidebarContent>
      <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: "20px 24px"
          }}
        >
          <a
            href="https://github.com/azouaoui-med/react-pro-sidebar"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <FaGithub />
            <span
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden"
              }}
            >
              View Source
            </span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

Aside.propTypes = {
  image: PropTypes.string,
  collapsed: PropTypes.bool,
  rtl: PropTypes.bool,
  toggled: PropTypes.bool,
  handleToggleSidebar: PropTypes.func
};

Aside.defaultProps = {
  image: "",
  collapsed: false,
  rtl: false,
  toggled: false,
  handleToggleSidebar: null
};

export default Aside;
