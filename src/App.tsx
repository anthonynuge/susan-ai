import React from 'react';

import PageTitle from './components/PageTitle';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <>
      <PageTitle title="Susan AI" />
      <div className="">
        {/* sidebar */}

        <div className="">
          {/* Nav bar */}
          <NavBar />

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
