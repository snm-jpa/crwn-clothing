import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import shopPage from './pages/shop/shop.component.jsx';

import './App.css';

import HomePage from './pages/homepage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import Header from './components/header/header.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentuser } from './redux/user/user.actions';


class App extends React.Component {

  // constructor() {
  //   super();

  //   this.state = {
  //     currentUser: null
  //   }
  // }

  unsubscribeFromAuth = null;

  componentDidMount() {
    console.log('component did mount called');

    //this.props = { setCurrentuser: user => dispatch(setCurrentuser(user)) } @ line # 88
    //this.props = { setCurrentuser: user => dispatch({type: 'SET_CURRENT_USER', payload: user})}
    //cuz, setCurrentuser(user) ---returns---> {type: 'SET_CURRENT_USER', payload: user} from user.actions.js
    //dispatch is a fn of the redux store. Can call by store.dispatch to dispatch an action. Only way to trigger a state change.
    const { setCurrentuser } = this.props; //setCurrentUser = user => dispatch(setCurrentuser(user)), so dispatch(action)


    //Adds an observer for changes to the user's sign-in state.
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //DocumentSnapshot-> get from documentReference object
        //allows us to check if a document exists at this query using .exists prop
        //can also get actual props on the obj by calling .data(), which returns json
        userRef.onSnapshot(snapshot => {
          // this.setState({
          //   currentUser: {
          //     id: snapshot.id,
          //     ...snapshot.data()
          //   }
          // })

          setCurrentuser({
            id: snapshot.id,
            ...snapshot.data()  //snapshot.data() = {createdAt: at, displayName: 'snm jpa', email: 'snm.jpa@gmail.com'} coming from [[Prototype]]
          })
        });
      }
      else {
        //this.setState({ currentUser: userAuth })    //if userAuth==null

        setCurrentuser(userAuth);

      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={shopPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ?
                (<Redirect to='/' />) : (
                  <SignInAndSignUpPage />)}>
          </Route>
        </Switch>
      </div>
    );
  }
}

//mapStateToProps is used for selecting the part of the data from the store that the connected component needs.
//-It is called every time the store state changes.
//-It receives the entire store state, and should return an object of data this component needs.
// If don't like to subscribe to the store, pass null or undefined
/*
  @param state: Entire Redux store state (same as store.getState())
  @param ownProps (optional)
  function mapStateToProps(state, ownProps?)
  const mapStateToProps = (state) => { }

  return: plain js object, that contains the data the comopnent needs.
*/
/*
state = {
cart: {hidden: true, cartItems: Array(0)}
user: {currentUser: null}
}
*/
/*
const mapStateToProps = function(state) {
  console.log(state);
  const {user} = state;
  return{
    currentUser: user.currentUser
  }
}*/
const mapStateToProps = ({ user }) => ({    //just destrucuting the state
  currentUser: user.currentUser
});

// mapDispatchToProps is used for dispatching actions to the store.
// normally referred to as mapDispatch
//dispatch is a Fn of the redux store
//Because we provided mapDispatchToProps in the connect() Fn, It lets us provide ACTION DISPATCHING FUNCTION as props in the component.
//So we may call props.increment() instead of props.dispatch(()=> increment()).
//There are 2 forms of mapDispatchToProps 1) Function form (more customization, gain access to dispatch * ownProps) 2) Object shorthand form (Redux recommend this form)
const mapDispatchToProps = dispatch => ({
  setCurrentuser: user => dispatch(setCurrentuser(user))
})


/*
With React Redux, your components never access the store directly - connect does it for you. React Redux gives you two ways to let components dispatch actions:
  1)By default, a connected component receives props.dispatch and can dispatch actions itself.
  2)connect can accept an argument called mapDispatchToProps, which lets you create functions that dispatch when called, and ****pass those functions as props to your component***.
It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store.
It does not modify the component class passed to it; instead, it returns a new, connected component class that wraps the component you passed in.
*/
export default connect(mapStateToProps, mapDispatchToProps)(App); /*connects App to a Redux store. connect fn has access to the store becuase of <Providor/> in index.js*/ 

//export default connect(null, null)(App); /*if 2nd arg null, then this.props = {dispatch: f} 
