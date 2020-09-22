<!-- <div align="center">
  <img src="https://github.com/Ryukyo/Kodokura/blob/development/showcase2.PNG?raw=true" alt="screenshot-collection"/>
</div> -->

![Homepage](/showcase2.PNG?raw=true "screenshot-collection")

# Kodokura

Senior project during our time at Code Chrysalis

You can find a video showcase of our application here: >insert YouTube URL when available<
</br>
You can find a live demo of our application here: https://kodokura-eb787.web.app/

## About Kodokura

A desire to belong is deeply rooted in people. That's because our ancestors depended on group cohesion to survive.
Unfortunately we are experiencing a loneliness epidemic that is growing every year…
Kodokura will help you to quickly connect with others so you wont feel lonely anymore.

### The goal of the application

After analysing the interests of the users the matching algorithm will find the perfect partner to chat with.

### Features

- Matching algorithm based on your interests and the languages you speak.
- A selection of 3D avatars to choose from.
- Kodobot, our chatbot that will join your chat and help engaging in conversation

### Future Features

- Report users
- Chat emojis and GIFs
- Friend list
- Mini games for chat participants
- Score system to unlock new avatars
- Internationalization

### Tech Stack

- Javascript
- React
- React Router
- React Three Fiber
- Sass
- Node JS
- Express
- Firebase

## Getting Started

The following commands are useful for running the application locally and deploying it to Firebase.

### Prerequisites

Install Firebase CLI tools

```
yarn global add firebase-tools
```

Login to Firebase

```
firebase login
```

### Install

Install all required dependencies

```
yarn install
```

### Run locally

Run cloud function with emulator

```
yarn emulate:func
```

Start the application locally (default: localhost:3000)

```
yarn start
```

### Testing

Run Cypress test in CLI mode

```
yarn test:e2e
```

Run Cypress test in GUI mode

```
yarn test:e2e-gui
```

### Deployment

Deploy cloud function to Firebase

```
yarn deploy:func
```

Deploy everything (including hosting) to Firebase (after yarn build)

```
yarn deploy
```

## Authors

- [Tomoyuki](https://github.com/bakisunsan)
- [Florian](https://github.com/Ryukyo)
- [Vincent](https://github.com/TwenLeMammouth)
- [Philippe](https://github.com/pw-yuu)
- [Edu](https://github.com/eduru)

## License

MIT License

Copyright (c) 2020, see Authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
