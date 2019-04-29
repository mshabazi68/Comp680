import React, { Component } from 'react';
import FirstPageForm from './Pages/firstPage';
import SecondPageResult from './Pages/secondPage';
import Profile from './Pages/profile';
import NavigatorBar from './components/globalNavBar';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { Authenticator } from 'aws-amplify-react';
import { Auth, Hub, Logger } from 'aws-amplify';
import { SignIn, SignOut, Loading } from 'aws-amplify-react/dist/Auth';
import Greetings from 'aws-amplify-react/dist/Auth/Greetings';
Amplify.configure(aws_exports);


const logger = new Logger('App');


class App extends Component {
  state = {
    email : ""
  }
  constructor(props) {
    super(props);

    this.loadUser = this.loadUser.bind(this);

    Hub.listen('auth', this, 'main');

    this.state = { user: null }
  }
  componentDidMount() {
    this.loadUser();
  }
  onHubCapsule(capsule) {
    logger.info('on Auth event', capsule);
    this.loadUser();
  }
  loadUser() {
    Auth.currentAuthenticatedUser()
      .then(user => this.setState({ user: user }))
      .catch(err => this.setState({ user: null }));
      Auth.currentUserInfo().then((userInfo) => {
        const { attributes = {} } = userInfo;
        this.setState({email: attributes["email"]})
      })
      .catch(err => this.setState({ email: null }));
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavigatorBar/>
        <Authenticator hide={[Loading,Greetings]}/>
        <HashRouter>
            <Switch>
              <Route exact={true} path='/' render={(props) => (
              <center>
                <FirstPageForm user={user}/>
              </center>
              )}/>
              <Route exact={true} path='/result' render={(props) => (
                <center>
                <SecondPageResult user={user} email={this.state.email}/>
                </center>
              )}/>
              <Route exact={true} path='/Profile' render={(props) => (
                <center>
                <Profile user={user}/>
                </center>
              )}/>
            </Switch>
          </HashRouter>
      </React.Fragment>
    );
  }
}

export default App;

// npm install --save react-router-dom
