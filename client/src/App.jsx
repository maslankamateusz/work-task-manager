import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Summary from './components/Summary/Summary';



function App() {
  const [showSummary, setShowSummary] = useState(false);

    const handleToggle = () => {
        setShowSummary(!showSummary);
    };
    return (
      <div>
          <button 
              className='absolute shadow-sm btn btn-white btn-sm h-10 px-3 my-2' 
              type='button' 
              onClick={handleToggle}
          >
              {showSummary ? 'Show Manager' : 'Show Summary'}
          </button>
          
          {showSummary ? (
              <>
                <Header />
                <Summary />
              </>
          ) : (
              <>
                  <Header />
                  <Main />
              </>
          )}
      </div>
  );
}


export default App;
