import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import styles from "./sidebar.module.scss";

const Sidebar = ({ option, activeList, handleNavClick }) => {
  const [expanded, setExpanded] = useState(false);
  console.log("activeList", activeList);
  return (
    <div className={styles.sidebar_wrap}>
      <Navbar
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        expand="lg"
      >
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className={styles.navList}>
            {option.map((item, index) => (
              <Nav.Link
                data-bs-toggle="collapse"
                key={item.id}
                onClick={() => {
                  handleNavClick(item.id);
                  setExpanded(false);
                }}
                className={item.id === activeList ? styles.active : ""}
              >
                {item.navIcon} {item.navText}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Sidebar;
