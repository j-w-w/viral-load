import React from 'react';
import "./App.css";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    return (
        <div className="App">
            <header className="App-header">
                <WelcomeScreen />
            </header>
        </div>
    );
}