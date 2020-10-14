import React, { useState, useEffect }  from 'react';
import { generateData } from "../../lib/dataUtil";
import Person from "../Person/Person";
import People from "../People/People";
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
    Link
} from "react-router-dom";
import logo from "../../logo.svg";

//helper function for persisting state in local storage
function usePersistedState(key, defaultValue) {
    const [state, setState] = useState(
        () => JSON.parse(localStorage.getItem(key)) || defaultValue
    );

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}

export default function WelcomeScreen() {
    const [data, setData] = usePersistedState('data', {people:{}, interactions:{}, flatInteractions:{}});
    let lowerBound = '2020-03-15';
    let upperBound = '2020-05-17';

    useEffect(() => {
        Object.keys(data.people).length === 0 && setData(generateData(50, lowerBound, upperBound));
    }, [data, setData, lowerBound, upperBound])

    const onClickGenerate = (e) => {
        e.preventDefault();
        setData(generateData(50, lowerBound, upperBound));
    }

    let peopleCount = Object.keys(data.people).length;
    let interactionCount = 0;

    for(let [k,v] of Object.entries(data.flatInteractions)){
        interactionCount += v.length;
    }

    let trackingText = `tracking ${peopleCount} people`;
    let interactionText = `that interacted with each other ${interactionCount} times`;
    let rangeText = `between ${lowerBound} and ${upperBound}`;

    return (
        <div>
        <Router>
            <Switch>
                <Route path="/person/:personId">
                    <Person people={data.people} interactions={data.interactions} flatInteractions={data.flatInteractions} />
                </Route>
                <Route exact path="/people">
                    <People people={data.people} />
                </Route>
                <Route>
                    <Redirect to="/" />
                    <div className="welcome-container">
                        <div className="typewritten">{trackingText}</div>
                        <div className="typewritten">{interactionText}</div>
                        <div className="typewritten">{rangeText}</div>
                        <div className="App-logo-container">
                            <img src={logo} className="App-logo" alt="logo" />
                        </div>
                        <div className="typewritten">this page generates test data on initial load</div>
                        <div className="typewritten">click
                            <Link to={"/people"}>
                                <button type="button">here</button>
                            </Link> to inspect the dataset
                        </div>
                        <div className="typewritten">click <button id="generateData" onClick={ onClickGenerate } >here</button> to generate new data</div>
                    </div>
                </Route>
            </Switch>
        </Router>
        </div>
    )
}