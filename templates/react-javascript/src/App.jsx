import "./index.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  GridContainer,
  Title,
  NavMenuButton,
  PrimaryNav,
  Header,
} from "@trussworks/react-uswds";
import { useState } from "react";

import HomePage from "./pages/Home";

function App() {
  return (
    <>
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>
      <main id="main-content">
        <GridContainer>
          <BrowserRouter>
            <Header basic={true} showMobileOverlay={isExpanded}>
              <div className="usa-nav-container">
                <div className="usa-navbar">
                  <Title>RADFish Application</Title>
                  <NavMenuButton
                    onClick={() => setExpanded((prvExpanded) => !prvExpanded)}
                    label="Menu"
                  />
                </div>
                <PrimaryNav
                  items={[<Link to="/">Home</Link>]}
                  mobileExpanded={isExpanded}
                  onToggleMobileNav={() =>
                    setExpanded((prvExpanded) => !prvExpanded)
                  }
                ></PrimaryNav>
              </div>
            </Header>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </BrowserRouter>
        </GridContainer>
      </main>
    </>
  );
}

export default App;
