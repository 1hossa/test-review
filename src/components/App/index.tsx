// TODO: Remove unused imports
import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import MainApp from '../MainApp';
import {
    useSelector,
} from 'react-redux';

function App() {
    // TODO: Define proper state type instead of 'any[]'
    const todos = useSelector((state: {list: { todos: any[] }}) => state.list.todos);
  return (
      // TODO: Unnecessary comment
      // туду лист для юзеров:
    <div className="App main">
      <header className="App-header">
        TODO list with users:
        {/* TODO: Remove commented out code if not needed */}
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
      </header>
        {/* MAIN APP: */}
        <MainApp todos={todos}/>

        <footer className='App-footer'>
          {/* TODO: Inconsistent indentation (mixed 2 and 4 spaces) */}
              <a
                href="https://example.org"
                target="_blank"
                className={"App-footer-link"}
              >
                All right reserved
              </a>
        </footer>
    </div>
  );
}

export default App;
