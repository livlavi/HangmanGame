import React from 'react';
import Hangman from './components/Hangman';

// this is the main component for the application

function App() {
  return (
    // the main div for the entire application
    <div className="App">
      <Hangman />
    </div>
  );
}

// export the app component for use in other parts of the application
export default App;