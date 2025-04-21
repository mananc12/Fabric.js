import CanvasEditor from "./CanvasEditor";
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
    <div>
      <CanvasEditor/>
    </div>
    </Provider>
  );
}

export default App;
