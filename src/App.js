import React from 'react';
import { Switch, Route } from 'react-router-dom';
import shopPage from './pages/shop/shop.component.jsx';

import './App.css';

import HomePage from './pages/homepage.component';
import Header from './components/header/header.component.jsx';

function App() {
  return <div>
    <Header/>
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route  path='/shop' component={shopPage} />
    </Switch>
  </div>
}

export default App;
