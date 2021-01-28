import React, { Component, Suspense } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
import Spinner from './components/UI/Spinner/Spinner';
import * as actions from './store/actions/index';
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    return (
      <Layout>
        <>
          <Route path='/' exact component={BurgerBuilder} />
          <Suspense fallback={<Spinner />}>
            <Route path='/auth' component={Auth} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/logout' component={Logout} />
            <Route path='/orders' component={Orders} />
          </Suspense>
          <Redirect to='/' />
        </>
      </Layout>
    );
  }
}

const mapStatechToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStatechToProps, mapDispatchToProps)(App));
