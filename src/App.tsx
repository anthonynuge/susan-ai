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
      <div className="lg:grid lg:grid-cols-[330px_1fr]">
        {/* sidebar */}
        <SidePanel
          sidePanelOpen={sidePanelOpen}
          toggleSidePanel={toggleSidePanel}
        />

        <div className="h-dvh grid grid-rows-[max-content_minmax(0,1fr)_max-content]">
          {/* Nav bar */}
          <NavBar toggleSidePanel={toggleSidePanel} />

          {/* Response area area */}
          <div className="px-4 pb-4 flex flex-col overflow-y-auto ">
            <div className="max-w-[830px] w-full mx-auto">
              This is where main goes
            </div>
          </div>

          {/* Chat area */}
          <div className="flex flex-col items-center h-[200px]">
            <p>Susan can make mistakes. Check important info.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
