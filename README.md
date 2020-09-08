This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Set up

### Prerequisites
Install firebase cli tools

```
yarn global add firebase-tools
```

Login to firebase

```
firebase login
```

### Emulator
Run cloud function with emulator

```
yarn emulate:func
```

### Testing

Run cypress test with cli mode

```
yarn test:e2e
```

Run cypress test with gui mode

```
yarn test:e2e-gui
```

### Deployment
Deploy cloud function to firebase

```
yarn deploy:func
```

Deploy everything (including hosting) to firebase (after yarn build)
```
yarn deploy
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
