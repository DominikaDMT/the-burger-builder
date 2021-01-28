import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
class Checkout extends Component {
  // niepotrzebne, gdy używany jest redux

  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     // ['salad', '1']
  //     if (param[0] === 'price') {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, totalPrice: price });
  // }

  onCheckoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  onCheckoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to='/' />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to='/' />
      ) : null;
      summary = (
        <>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.onCheckoutCancelledHandler}
            checkoutContinued={this.onCheckoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
            // zamiana z component na render, aby przekazać przy okazji propsy
            // - po przekstałceniu stanu na użycie Reduxa, jest to już niepotrzebne
            // render={(props) => <ContactData ingredients={this.state.ingredients} price={this.props.price} {...props} />}
          />
        </>
      );
    }

    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps, null)(Checkout);
