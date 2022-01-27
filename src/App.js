import React from 'react';
import { Switch, Route } from 'react-router-dom';
import shopPage from './pages/shop/shop.component.jsx';

import './App.css';

import HomePage from './pages/homepage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import Header from './components/header/header.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';


class App extends React.Component {

  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    console.log('component did mount called');
    //Adds an observer for changes to the user's sign-in state.
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //DocumentSnapshot-> get from documentReference object
        //allows us to check if a document exists at this query using .exists prop
        //can also get actual props on the obj by calling .data(), which returns json
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        });
        console.log(this.state.currentUser);
      }
      else {
        this.setState({ currentUser: userAuth })    //if userAuth==null
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={shopPage} />
          <Route path='/signin' component={SignInAndSignUpPage}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
