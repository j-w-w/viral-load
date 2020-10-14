

## Viral Load

This is a toy app intended to demonstrate proficiency in JavaScript and React while having some fun with data.

### Premise

This app presents a variation on a simple rewards program. Rather than accumulating points based on purchases, subjects in the dataset are awarded "Covids" corresponding to their interactions with other individuals.  All inputs are user-configurable.

On initial load, change or demand, a dataset is created with a random name generator and an arbitrary range of dates. Individuals within the dataset are then randomly coupled with between one and (n) other individuals in the set for a set of interactions across the daterange.

If the number of people that each person interacts with in a ten day period exceeds a configurable target, that person earns one Covid; if that number exceeds a configurable second target, that person earns two Covids. Additional thresholds and Covid payout amounts can be added as desired.

Generated datasets are saved in localstorage, persisted across pageloads and route traversals and updated in real time.

Whoever gets the most Covids gets to be president!

## Notable files

### App.js

Entry point and react router setup.

### lib/dataUtil.js

Library functions for generating data.

### lib/timeUtil.js

Library functions for manipulating time.

### components/WelcomeScreen

Home page, variable configuration and summmary.

### components/People

Summary of generated people, each navigable to a summry of that person's interactions

### components/Person

Summary of this person's interactions in the given timeframe

### components/Interactions

Component for displaying and summarizing interactions for the given person in the given timeframe

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).