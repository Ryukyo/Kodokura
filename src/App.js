import React from 'react';
import './App.css';

// Components
import Main from './components/Main/Main';
import Home from './components/Home/Home'
import CreateAccount from './components/CreateAccount/CreateAccount';
import LogIn from './components/LogIn/LogIn';
import FriendList from './components/FriendList/FriendList';
import BlockList from './components/BlockList/BlockList';
import AvatarSelector from './components/AvatarSelector/AvatarSelector'
import Profile from './components/Profile/Profile';
import Questions from './components/Questions/Questions'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>KodoKura</p>
      </header>

      <Main />
      <br/>
      <Home />
      <br/>
      <CreateAccount />
      <br/>
      <LogIn />
      <br/>
      <FriendList/>
      <br/>
      <BlockList/>
      <br/>
      <AvatarSelector />
      <br/>
      <Profile/>
      <br/>
      <Questions />
      <br/>
  

    </div>

  );
}

export default App;
