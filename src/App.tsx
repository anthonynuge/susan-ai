import { useState } from 'react';
import { Outlet, useNavigation, useParams } from 'react-router-dom';

import PageTitle from './components/PageTitle';
import NavBar from './components/NavBar';
import SidePanel from './components/SidePanel';
import Welcome from './pages/Welcome';
import ChatInput from './components/ChatInput';

const App = () => {
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const param = useParams()
  const navigation = useNavigation();

  const toggleSidePanel = () => {
    setSidePanelOpen((prev) => !prev);
  };

  // page load or reload without form
  const isPageLoad = navigation.state === 'loading' && !navigation.formData;

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
          <div className="px-4 pb-4 flex flex-col overflow-y-auto mb-6">
            <div className="max-w-[830px] w-full mx-auto h-full">
              {isPageLoad ? null : param.chatId ? (
                <Outlet />
              ) : (
                <Welcome />
              )}
            </div>
          </div>

          {/* Chat area */}
          <div className="flex flex-col mx-auto justify-center items-center max-w-[830px] w-full gap-3">
            <ChatInput />
            <p>Susan can make mistakes. Check important info.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
