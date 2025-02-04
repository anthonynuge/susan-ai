import React from 'react';

import { useState } from 'react';

import PageTitle from './components/PageTitle';
import NavBar from './components/NavBar';
import SidePanel from './components/SidePanel';

const App = () => {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  console.log(sidePanelOpen);

  const toggleSidePanel = () => {
    setSidePanelOpen((prev) => !prev);
    console.log('Toggled New state is:', sidePanelOpen);
  };

  return (
    <>
      <PageTitle title="Susan AI" />
      <div className="">
        {/* sidebar */}

        <SidePanel
          sidePanelOpen={sidePanelOpen}
          toggleSidePanel={toggleSidePanel}
        />

        <div className="">
          {/* Nav bar */}
          <NavBar toggleSidePanel={toggleSidePanel} />

          {/* Response area area */}
          <div className="">
            <div className=""></div>
          </div>

          {/* Chat area */}
          <div>
            <p>Susan can make mistakes. Check important info.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
