import React from 'react';
import { MetaProvider } from './hook/DataManger'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QueryByText from './pages/QueryByText';

import PlayerControls from './components/player_controls/Player_Controls'


function App() {
  return (
    <div className="App">
    <>
    <MetaProvider>
        {/* <BrowserRouter>
          <Routes>
              <Route
                  path={ `${ process.env.PUBLIC_URL + "/" }` }
                  component={ QueryByText }/
              />
          </Routes>
        </BrowserRouter> */}
        <QueryByText/>
        <PlayerControls/>
    </MetaProvider>
    </>
  </div>
  );
}

export default App;
