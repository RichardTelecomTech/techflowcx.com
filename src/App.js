import React from 'react';
import Repositories from './components/Repositories';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>Welcome to my portfolio!</p>
            </header>
            <Repositories />
        </div>
    );
}

export default App;
