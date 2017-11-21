import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';

import * as actions from '../actions';

class ButtonStripe extends Component {
    render() {
        return (
            <StripeCheckout
                name="Emaily"
                description="Add $10 credits for 10,000 emails"
                amount={1000}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">Add credits</button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(ButtonStripe);
