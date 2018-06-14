/* global paypal */
/* The `paypal` global comes from a script included in _document.js */

import React from 'react';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import TierComponent from '../components/Tier';
import InputField from '../components/InputField';
<<<<<<< HEAD
import RequestBitcoin from '../components/RequestBitcoin';
=======
import MatchingFundWithData from '../components/MatchingFundWithData';
>>>>>>> 8221aaf... fixes opencollective/opencollective#759
import ActionButton from '../components/Button';
=======
import TierComponent from './Tier';
import InputField from './InputField';
import MatchingFundWithData from './MatchingFundWithData';
import ActionButton from './Button';
import SectionTitle from './SectionTitle';
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 614e52e... updating style for /donate and createOrder
import { Button, Row, Col, Form, InputGroup, FormControl } from 'react-bootstrap';
=======
import { Button, Row, Col, Form } from 'react-bootstrap';
>>>>>>> 0d14167... eslint feedback in components
=======
import { Button, Row, Col, Form, FormGroup } from 'react-bootstrap';
<<<<<<< HEAD
>>>>>>> 36167e8b... Add PayPal as new payment method option to the OrderForm (#494)
import { defineMessages, FormattedMessage, FormattedDate, FormattedTime } from 'react-intl';
=======
import { defineMessages, FormattedMessage } from 'react-intl';
>>>>>>> 98357603... eslint
import { capitalize, formatCurrency, isValidEmail, getEnvVar } from '../lib/utils';
import { getStripeToken } from '../lib/stripe';
import { pick, get } from 'lodash';
import withIntl from '../lib/withIntl';
import { checkUserExistence, signin } from '../lib/api';
import { getPrepaidCardBalanceQuery } from '../graphql/queries';
import colors from '../constants/colors';

class OrderForm extends React.Component {

  static propTypes = {
    order: PropTypes.object.isRequired, // { tier: {}, quantity: Int, interval: String, totalAmount: Int }
    collective: PropTypes.object.isRequired,
    LoggedInUser: PropTypes.object,
    onSubmit: PropTypes.func,
    matchingFund: PropTypes.string,
    redeemFlow: PropTypes.bool,
    intl: PropTypes.object,
    client: PropTypes.object
  }

  constructor(props) {
    super(props);
    const { intl, order } = props;
    const tier = { ...order.tier };

    this.state = {
      isNewUser: true,
      loginSent: false,
      user: {},
      fromCollective: {},
      paymentMethod: {
        type: 'creditcard'
      },
      creditcard: {
        show: !this.props.redeemFlow,
        save: true,
      },
      prepaidcard: {
        applySent: false,
        loading: false,
        expanded: this.props.redeemFlow
      },
      orgDetails: {
        show: false
      },
      order: order || {},
      result: {}
    };

    this.state.order.totalAmount = this.state.order.totalAmount || tier.amount * (tier.quantity || 1);

    this.paymentMethodsOptions = [];
    this.allowOrganizations = (order.tier.type !== 'TICKET');

    this.messages = defineMessages({
      'order.contributeAs': { id: 'tier.order.contributeAs', defaultMessage: `Contribute as` },
      'order.rsvpAs': { id: 'tier.order.rsvpAs', defaultMessage: `RSVP as` },
      'order.profile.myself': { id: 'tier.order.profile.myself', defaultMessage: `myself` },
      'order.success': { id: 'tier.order.success', defaultMessage: '🎉 Your order has been processed successfully' },
      'order.error': { id: 'tier.order.error', defaultMessage: `An error occured 😳. The order didn't go through. Please try again in a few.` },
      'order.button': { id: 'tier.order.button', defaultMessage: 'place order' },
      'order.organization.create': { id: 'tier.order.organization.create', defaultMessage: `create an organization` },
      'order.profile.logout': { id: 'tier.order.profile.logout', defaultMessage: `logout to create a new profile` },
      'order.organization.name': { id: 'tier.order.organization.name', defaultMessage: `name` },
      'order.organization.website': { id: 'tier.order.organization.website', defaultMessage: `website` },
      'order.organization.twitterHandle': { id: 'tier.order.organization.twitterHandle', defaultMessage: `Twitter` },
      'error.email.invalid': { id: 'error.email.invalid', defaultMessage: 'Invalid email address' },
      'creditcard.label': { id: 'creditcard.label', defaultMessage: 'Credit Card' },
      'creditcard.save': { id: 'creditcard.save', defaultMessage: 'Save credit card to {type, select, user {my account} other {{type} account}}' },
      'creditcard.missing': { id: 'creditcard.missing', defaultMessage: 'Credit card missing' },
      'creditcard.error': { id: 'creditcard.error', defaultMessage: 'Invalid credit card' },
      'paymentMethod.type': { id: 'paymentMethod.type', defaultMessage: 'Payment method' },
      'paymentMethod.creditcard': { id: 'paymentMethod.creditcard', defaultMessage: 'credit card' },
      'paymentMethod.bitcoin': { id: 'paymentMethod.bitcoin', defaultMessage: 'bitcoin' },
      'paymentMethod.paypal': { id: 'paymentMethod.paypal', defaultMessage: 'paypal' },
      'prepaidcard.label': {id: 'prepaidcard.label', defaultMessage: 'Gift Card'},
      'prepaidcard.apply': {id: 'prepaidcard.apply', defaultMessage: 'Apply'},
      'prepaidcard.invalid': {id: 'prepaidcard.invalid', defaultMessage: 'Invalid code'},
      'prepaidcard.expired': {id: 'prepaidcard.expired', defaultMessage: 'Expired code'},
      'prepaidcard.loading': {id: 'prepaidcard.loading', defaultMessage: 'Please wait...'},
      'prepaidcard.amountremaining': {id: 'prepaidcard.amountremaining', defaultMessage: 'Valid code. Amount available: '},
      'prepaidcard.amounterror': {id: 'prepaidcard.amounterror', defaultMessage: 'You can only contribute up to the amount available on your gift card.'},

      'ticket.title': { id: 'tier.order.ticket.title', defaultMessage: 'RSVP' },
      'backer.title': { id: 'tier.order.backer.title', defaultMessage: 'Become a {name}' },
      'sponsor.title': { id: 'tier.order.sponsor.title', defaultMessage: 'Become a {name}' },
      'type.label': { id: 'tier.type.label', defaultMessage: 'type' },
      'firstName.label': { id: 'user.firstName.label', defaultMessage: 'first name' },
      'lastName.label': { id: 'user.lastName.label', defaultMessage: 'last name' },
      'company.label': { id: 'user.company.label', defaultMessage: 'company' },
      'website.label': { id: 'user.website.label', defaultMessage: 'website' },
      'twitterHandle.label': { id: 'user.twitterHandle.label', defaultMessage: 'twitter' },
      'twitterHandle.description': { id: 'user.twitterHandle.description', defaultMessage: 'If any' },
      'email.label': { id: 'user.email.label', defaultMessage: 'email' },
      'email.description': { id: 'user.email.description', defaultMessage: '* required' },
      'email.description.login': { id: 'signin.createAccount.description', defaultMessage: 'There is no user with this email address. Click on "Sign Up" to create a new Open Collective Account.' },
      'email.description.signup': { id: 'signin.emailSent.description', defaultMessage: 'Login email sent. Please follow the instructions in that email to proceed.'},
      'description.label': { id: 'user.description.label', defaultMessage: 'Short bio' },
      'description.description': { id: 'user.description.description', defaultMessage: 'Present yourself in 60 characters or less, if you can!' },
      'totalAmount.label': { id: 'tier.totalAmount.label', defaultMessage: 'Total amount' },
      'startsAt.label': { id: 'tier.startsAt.label', defaultMessage: 'start date and time' },
      'endsAt.label': { id: 'tier.endsAt.label', defaultMessage: 'end date and time' },
      'order.error.organization.name.required': { id: 'order.error.organization.name.required', defaultMessage: 'Please provide a name for the new organization' },
      'order.error.organization.website.required': { id: 'order.error.organization.website.required', defaultMessage: 'Please provide a website for the new organization' },
      'order.publicMessage.placeholder': { id: 'order.publicMessage.placeholder', defaultMessage: 'Use this space to add a personal message (public)' },
      'newsletterOptIn.description': {
        id: 'user.newsletterOptIn.description',
        defaultMessage: 'Subscribe to the Open Collective newsletter.',
      },
    });

    this.fields = [
      {
        name: 'firstName',
        maxLength: 127
      },
      {
        name: 'lastName',
        maxLength: 128
      },
      {
        name: 'company',
        maxLength: 255
      },
      {
        name: 'website',
        maxLength: 255
      },
      {
        name: 'twitterHandle',
        pre: '@',
        maxLength: 255,
        validate: (val) => val.match(/^[A-Za-z0-9_]{1,15}$/)
      },
      {
        name: 'description',
        maxLength: 255
      },
    ]

    this.fields = this.fields.map(field => {
      if (this.messages[`${field.name}.label`]) {
        field.label = intl.formatMessage(this.messages[`${field.name}.label`]);
      }
      if (this.messages[`${field.name}.description`]) {
        field.description = intl.formatMessage(this.messages[`${field.name}.description`]);
      }
      return field;
    })

    this.populateProfiles();
  }

  componentDidMount() {
    this._isMounted = true;
    this.UNSAFE_componentWillReceiveProps(this.props);
  }

  UNSAFE_componentWillReceiveProps(props) {
    const { LoggedInUser } = props;
    if (!LoggedInUser) return;
    if (!this._isMounted) return; // Fixes error: Can only update a mounted or mounting component
    this.setState({ LoggedInUser, isNewUser: !LoggedInUser });
    this.populateProfiles(LoggedInUser);
    setTimeout(() => this.selectProfile(LoggedInUser.CollectiveId), 0); // need to pass a cycle to let setState take effect
  }

  // All the following methods are arrow functions and auto-bind

  populatePaymentMethodTypes = (hostId) => {
    const { intl, LoggedInUser } = this.props;
    const paymentMethodTypeOptions = [
      { creditcard: intl.formatMessage(this.messages['paymentMethod.creditcard']) },
    ];
    /* We only support paypal for the open source collective for now */
    if (hostId === 11004 && LoggedInUser && LoggedInUser.isRoot()) {
      paymentMethodTypeOptions.push({
        paypal: intl.formatMessage(this.messages['paymentMethod.paypal'])
      });
    }
    this.paymentMethodTypeOptions = paymentMethodTypeOptions;
  }

  paymentMethodsOptionsForCollective = (paymentMethods, collective) => {
    return paymentMethods.map(pm => {
      const value = pm.uuid
      const label = `💳  \xA0\xA0${collective.name} - ${get(pm, 'data.brand')} ${pm.name} - exp ${get(pm, 'data.expMonth')}/${get(pm, 'data.expYear')}`;
      const option = {};
      option[value] = label;
      return option;
    });
  }

  populatePaymentMethods = (CollectiveId) => {
    const { LoggedInUser } = this.props;

    let paymentMethodsOptions = [];

    const collective = this.collectivesById[CollectiveId];

    const filterPMs = input => (input || [])
      .filter((pm) => ['stripe', 'paypal'].includes(pm.service));

    if (collective) {
      const paymentMethods = filterPMs(collective.paymentMethods);
      paymentMethodsOptions = this.paymentMethodsOptionsForCollective(paymentMethods, collective);
    }

    if (LoggedInUser && CollectiveId !== LoggedInUser.CollectiveId) {
      const userCollective = this.collectivesById[LoggedInUser.CollectiveId];
      const paymentMethods = filterPMs(LoggedInUser.collective.paymentMethods);
      paymentMethodsOptions = [...paymentMethodsOptions, ... this.paymentMethodsOptionsForCollective(paymentMethods, userCollective)];
    }

    if (paymentMethodsOptions.length > 0) {
      paymentMethodsOptions.push({ other: 'other' });
    }

    this.paymentMethodsOptions = paymentMethodsOptions;
  }

  /**
   * Populate the profiles available based on the current logged in user
   * If the tier is a ticket, you can only order the ticket as an individual
   * Otherwise, you can order a tier as an individual or as any organization that you are an admin of
   * @param {*} LoggedInUser
   */
  populateProfiles = (LoggedInUser) => {
    const { intl } = this.props;
    const fromCollectiveOptions = [], collectivesById = {};

    if (LoggedInUser) {
      fromCollectiveOptions.push({ [LoggedInUser.CollectiveId]: LoggedInUser.collective.name });
      collectivesById[LoggedInUser.CollectiveId] = LoggedInUser.collective;
      LoggedInUser.memberOf.map(membership => {
        if (membership.collective.type === 'COLLECTIVE') return;
        if (membership.collective.type === 'EVENT') return;
        if (membership.collective.type === 'ORGANIZATION' && !this.allowOrganizations) return;
        if (['ADMIN','HOST'].indexOf(membership.role) === -1) return;
        const value = get(membership, 'collective.id');
        const label = get(membership, 'collective.name');
        collectivesById[value] = pick(membership.collective, ['id', 'type', 'name', 'paymentMethods'])
        fromCollectiveOptions.push({ [value]: label });
      })
    } else {
      fromCollectiveOptions.push({ 'myself': intl.formatMessage(this.messages['order.profile.myself']) });
    }

    if (this.allowOrganizations) {
      fromCollectiveOptions.push({ 'organization': intl.formatMessage(this.messages['order.organization.create']) });
    } else if (LoggedInUser) {
      fromCollectiveOptions.push({ 'logout': intl.formatMessage(this.messages['order.profile.logout']) });
    }

    this.collectivesById = collectivesById;
    this.fromCollectiveOptions = fromCollectiveOptions;
  }

  logout = () => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('LoggedInUser');
    window.location.replace(window.location.href);
  }

  selectProfile = (profile) => {
    if (profile === 'logout') {
      return this.logout();
    }
    const CollectiveId = isNaN(profile) ? null : profile;
    const collective = CollectiveId && this.collectivesById[CollectiveId];
    let fromCollective = {};
    if (collective) {
      fromCollective = {
        id: CollectiveId,
        type: collective.type,
        name: collective.name
      }
    }
    const newState = {
      ...this.state,
      fromCollective,
      orgDetails: {
        show: Boolean(profile === 'organization')
      },
      creditcard: {
        show: true
      }
    };

    if (collective) {
      this.populatePaymentMethods(CollectiveId);
      if (this.paymentMethodsOptions.length > 0) {
        // The data structure looks like that:
        // [
        // { "8222e069-e4b0-4409-9563-167fa078fdaa" => "John Doe - Visa 4242 - exp 10/2018" },
        // { "3944a1fe-0878-4832-ab33-c493f536152e" => "John Doe - Visa 4343 - exp 11/2019" }
        // ]
        const uuid = Object.keys(this.paymentMethodsOptions[0])[0];
        // NOTE: might be fragile to have { show: undefined } as a result
        newState.creditcard = { uuid: uuid };
      } else {
        newState.creditcard = { show: true, save: true }; // reset to default value
      }
    }

    this.setState(newState);

    if (typeof window !== "undefined") {
      window.state = newState;
    }
  }

  handleChange = (obj, attr, value) => {
    this.resetError();
    const newTier = { ...this.state.order.tier }
    const newOrder = { ...this.state.order };
    const newState = Object.assign({}, this.state, {order: newOrder, tier: newTier});
    if (value === 'null') {
      value = null;
    }
    if (value !== undefined) {
      newState[obj][attr] = value;
    } else if (attr === null) {
      newState[obj] = {};
    } else {
      newState[obj] = Object.assign({}, this.state[obj], attr);
    }

    if (obj === 'creditcard' && attr.uuid === 'other') {
      newState.creditcard.show = true;
    }

    if (attr === 'tier') {
      newState.order.totalAmount = newState.order.tier.amount * (newState.order.tier.quantity || 1);
      if (newState.order.tier.quantity) {
        newState.order.quantity = newState.order.tier.quantity;
      }
      if (newState.order.tier.hasOwnProperty('interval')) {
        newState.order.interval = newState.order.tier.interval;
        if (newState.order.interval) {
          newState.paymentMethod.type = 'creditcard';
        }
      }
    }

    if (attr === 'email') {
      checkUserExistence(value).then(exists => {
        this.setState({ isNewUser: !exists });
      });
    }

    this.setState(newState);
    if (typeof window !== "undefined") {
      window.state = newState;
    }

    if (this.state.paymentMethod.type === 'paypal') {
      this.loadPayPalButton();
    }
  }

  loadPayPalButton = async () => {
    const button = document.getElementById('paypal-checkout');
    /* Convert amount to what PayPal accepts (dollars) */
    const amount = this.getTotalAmount() / 100;
    /* We need some information about the order to create the PayPal
       payment object. */
    const orderRequest = this.prepareOrderRequest();
    const currency =
      (orderRequest.tier && orderRequest.tier.currency) ||
      this.props.collective.currency;
    /* Parameters for the paypal button */
    const renderOptions = {
      env: getEnvVar('PAYPAL_ENVIRONMENT'),
      payment: async (data, actions) => {
        const paymentURL = '/api/services/paypal/create-payment';
        const { id } = await actions.request.post(paymentURL, {
          amount,
          currency,
        });
        return id;
      },
      onAuthorize: async (data) => {
        /* We'll send the order to the backend but we need to inject
           the extra information needed by PayPal somewhere. And the
           chosen place was the data field in the PaymentMethod
           entry. */
        orderRequest.paymentMethod.data = data;
        /* Using the PayPal field as the token for this payment
           method. */
        orderRequest.paymentMethod.token = data.paymentToken;
        /* Corrects the `service.type' identification info */
        orderRequest.paymentMethod.service = 'paypal';
        orderRequest.paymentMethod.type = 'payment';
        return this.submitOrder(orderRequest);
      }
    };

    try {
      paypal.Button.render(renderOptions, '#paypal-checkout');
    } catch (error) {
      console.error(error);
    } finally {
      button.removeAttribute('disabled');
    }
  }

  getTotalAmount = () => {
    const { order } = this.state;
    const quantity = (order.tier.quantity || 1);
    const total = (quantity * order.tier.amount) || order.totalAmount;
    return total;
  }

  prepareOrderRequest = () => {
    const { paymentMethod, order, fromCollective, user, contributionDetails } = this.state;
    const quantity = order.tier.quantity || 1;
    const orderRequest = {
      user,
      collective: { id: this.props.collective.id},
      fromCollective,
      publicMessage: order.publicMessage,
      quantity,
<<<<<<< HEAD
      interval: order.interval || tier.interval,
      totalAmount: (quantity * tier.amount) || order.totalAmount,
<<<<<<< HEAD
=======
      interval: order.interval || order.tier.interval,
      totalAmount: this.getTotalAmount(),
      matchingFund: order.matchingFund,
>>>>>>> 36167e8b... Add PayPal as new payment method option to the OrderForm (#494)
      paymentMethod
=======
      matchingFund: order.matchingFund,
      paymentMethod: sanitizedCard
>>>>>>> 8221aaf... fixes opencollective/opencollective#759
    };
    if (order.tier && order.tier.id) {
      orderRequest.tier = { id: order.tier.id, amount: order.tier.amount };
    }
    return orderRequest;
  }

  /** Call the underlying onSubmit method with an order request  */
  submitOrder = async (orderRequest) => {
    await this.props.onSubmit(orderRequest || this.prepareOrderRequest());
  }

  handleSubmit = async () => {
    if (! await this.validate()) return false;
    this.setState({ loading: true });
    try {
      await this.submitOrder();
    } finally {
      this.setState({ loading: false });
    }
  }

  error = (msg) => {
    const error = `${msg}`;
    this.setState({ result: { error }});
  }

  resetError = () => {
    this.setState({ result: { error: null }});
  }

  validate = async () => {
    const TEST_ENVIRONMENT = (typeof window !== 'undefined' && window.location.search.match(/test=e2e/) && (window.location.hostname === 'staging.opencollective.com' || window.location.hostname === 'localhost'));

    const { intl } = this.props;
    const { order, user, creditcard, prepaidcard } = this.state;
    const newState = {...this.state};
    // validate email
    if (this.state.isNewUser && !isValidEmail(user.email)) {
      this.setState({ result: { error: intl.formatMessage(this.messages['error.email.invalid']) }});
      return false;
    }

    const required = (obj, attrPath, messageId) => {
      if (!get(obj, attrPath)) {
        throw new Error(intl.formatMessage(this.messages[messageId]));
      }
    }

    // validate new org
    if (this.state.orgDetails.show) {
      try {
        required(this.state, 'fromCollective.name', 'order.error.organization.name.required');
        required(this.state, 'fromCollective.website', 'order.error.organization.website.required');
      } catch (e) {
        this.setState({ result: { error: e.message }});
        return false;
      }
    }

    // validate payment method
    if (order.totalAmount > 0) {
      // favors prepaidcard over credit card
      if (prepaidcard.valid) {
        if (prepaidcard.balance < order.totalAmount) {
          this.setState({ result: { error: intl.formatMessage(this.messages['prepaidcard.amounterror'])}});
          return false;
        }
        newState.paymentMethod = { token: prepaidcard.token,  service: 'prepaid', uuid: prepaidcard.uuid };
        this.setState(newState);
        return true;

      } else if (creditcard.uuid && creditcard.uuid.length === 36) {
        newState.paymentMethod = { uuid: creditcard.uuid };
        this.setState(newState);
        return true;
      } else {
        let res;
        if (!creditcard.addEventListener && !TEST_ENVIRONMENT) {
          this.error(intl.formatMessage(this.messages['creditcard.missing']));
          return false;
        }
        try {
          res = await getStripeToken('cc', creditcard);
        } catch (e) {
          console.log(">>> error: ", typeof e, e);
          this.error(e);
          return false;
        }
        const last4 = res.card.last4;
        const paymentMethod = {
          name: last4,
          token: res.token,
          service: 'stripe',
          type: 'creditcard',
          data: {
            fullName: res.card.full_name,
            expMonth: res.card.exp_month,
            expYear: res.card.exp_year,
            brand: res.card.brand,
            country: res.card.country,
            funding: res.card.funding,
            zip: res.card.address_zip
          },
          save: true
        };
        newState.paymentMethod = paymentMethod;
        this.setState(newState);
        return true;
      }
    }
    return true;
  }

  resetOrder = () => {
    this.setState({ order: {} });
  }

  signin = () => {
    signin(this.state.user, `${window.location.pathname}${window.location.search}`).then(() => {
      this.setState({ loginSent: true })
    })
  }

  applyPrepaidCardBalance = async () => {
    const { prepaidcard, creditcard, order } = this.state;

    this.setState({
      prepaidcard: Object.assign(prepaidcard, { applySent: true, loading: true })});
    const { token } = prepaidcard;
    const result = await this.props.client.query({
      query: getPrepaidCardBalanceQuery,
      variables: { token }
    })
    this.setState({ prepaidcard: Object.assign(prepaidcard, { loading: false})})

    if (result.data && result.data.prepaidPaymentMethod) {

      // force a tier of the whole amount with null interval
      const tier = {
        interval: null,
        amount: result.data.prepaidPaymentMethod.balance,
        currency: result.data.prepaidPaymentMethod.currency,
        description: "Thank you 🙏",
        name: "Gift Card"
      }

      this.setState({
        prepaidcard: Object.assign(prepaidcard,
          {...result.data.prepaidPaymentMethod, valid: true }),
        creditcard: Object.assign(creditcard,
          { show: false }),
        order: Object.assign(order, {interval: null, totalAmount: result.data.prepaidPaymentMethod.balance, tier})
      });
    }
  }

  expandGiftCard = () => {
    this.setState({ prepaidcard: Object.assign({}, this.state.prepaidcard, { expanded: true }) });
  }

  renderPaypal() {
    return (
      <FormGroup controlId="paypalFG" id="paypalFG">
        <div>
          <Col sm={2}></Col>
          <Col sm={10}>
            <div id="paypal-checkout"></div>
          </Col>
        </div>
      </FormGroup>
    );
  }

  renderCreditCard() {
    const { intl } = this.props;
    const { prepaidcard, creditcard } = this.state;
    const showNewCreditCardForm = !prepaidcard.show && creditcard.show && (!creditcard.uuid || creditcard.uuid === 'other');
    const inputPrepaidcard = {
      type: 'text',
      name: 'prepaidcard',
      button: (
        <Button
          className='prepaidapply'
          disabled={prepaidcard.loading}
          onClick={this.applyPrepaidCardBalance}
          >
          {intl.formatMessage(this.messages['prepaidcard.apply'])}
        </Button>
      ),
      required: true,
      label: intl.formatMessage(this.messages['prepaidcard.label']),
      defaultValue: prepaidcard['token'],
      onChange: (value) => this.handleChange("prepaidcard", "token", value)
    };

    if (prepaidcard.applySent) {
      if (prepaidcard.loading) {
        inputPrepaidcard.description = intl.formatMessage(this.messages['prepaidcard.loading']);
      } else if (prepaidcard.valid) {
        inputPrepaidcard.description = `${intl.formatMessage(this.messages['prepaidcard.amountremaining'])} ${formatCurrency(prepaidcard.balance, prepaidcard.currency)}`;
      } else {
        inputPrepaidcard.description = intl.formatMessage(this.messages['prepaidcard.invalid'])
      }
    }

    return (
      <Row>
        <Col sm={12}>
          { this.paymentMethodsOptions && this.paymentMethodsOptions.length > 1 &&
            <InputField
              type="select"
              className="horizontal"
              label={intl.formatMessage(this.messages['creditcard.label'])}
              name="creditcardSelector"
              onChange={uuid => this.handleChange("creditcard", { uuid })}
              options={this.paymentMethodsOptions}
              />
          }
          { showNewCreditCardForm &&
            <div>
              <InputField
                label={intl.formatMessage(this.messages['creditcard.label'])}
                type="creditcard"
                name="creditcard"
                className="horizontal"
                onChange={(creditcardObject) => this.handleChange("creditcard", creditcardObject)}
                />
            </div>
          }
          <div>
            { !prepaidcard.expanded &&
              <Row key={`giftcard.checkbox`}>
                <Col sm={2}></Col>
                <Col sm={10}>
                  <a className="gift-card-expander" onClick={this.expandGiftCard}>
                    <FormattedMessage id="paymentMethod.useGiftCard" defaultMessage="Use a Gift Card" />
                  </a>
                </Col>
              </Row>
            }
            { prepaidcard.expanded &&
              <Row key={`prepaidcard.input`}>
                <Col sm={12}>
                  <InputField
                    className="horizontal"
                    {...inputPrepaidcard}
                    />
                </Col>
              </Row>
            }
          </div>
        </Col>
      </Row>
    );
  }

  render() {
    const { intl, collective, LoggedInUser } = this.props;
    const { order, fromCollective } = this.state;
    const currency = (order.tier && order.tier.currency) || collective.currency;

    this.populatePaymentMethodTypes(collective.host.id);

    const requireLogin = !this.state.isNewUser && !LoggedInUser;
    const inputEmail = {
      type: 'email',
      name: 'email',
      required: true,
      label: `${intl.formatMessage(this.messages['email.label'])}*`,
      description: intl.formatMessage(this.messages['email.description']),
      defaultValue: order['email'],
      onChange: (value) => this.handleChange("user", "email", value)
    };
    if (!this.state.isNewUser) {
      inputEmail.button = <Button onClick={this.signin} focus={true}>Login</Button>;
      if (!this.state.loginSent) {
        inputEmail.description = intl.formatMessage(this.messages['email.description.login']);
      } else {
        inputEmail.button = <Button disabled={true}>Login</Button>;
        inputEmail.description = intl.formatMessage(this.messages['email.description.signup']);
      }
    }

    return (
      <div className="OrderForm">
        <style jsx global>{`
          .prepaidcard span {
            max-width: 350px;
          }
          .OrderForm span.input-group, .OrderForm .help-block {
            max-width: 500px;
          }
          .OrderForm textarea[name="publicMessage"] {
            height: 10rem;
          }
        `}
        </style>
        <style jsx>{`
        .OrderForm {
          margin: 0 auto;
        }
        .userDetailsForm {
          overflow: hidden;
        }
        .paymentDetails {
          overflow: hidden;
        }
        .OrderForm :global(.tier) {
          margin: 0 0 1rem 0;
        }
        label {
          max-width: 100%;
          padding-right: 1rem;
        }
        .actions {
          margin-top: 3rem;
        }
        .result {
          margin-top: 3rem;
        }
        .result div {
          width: 100%;
        }
        .error {
          color: red;
          font-weight: bold;
        }
        .value {
          padding-top: 7px;
          display: inline-block;
        }
        .disclaimer {
          margin: 0.5rem;
          font-size: 1.2rem;
        }
        p {
          margin-top: -2.5rem;
          color: #737373;
        }
        .gift-card-expander {
          color: ${colors.blue};
          margin-left: 205px;
        }
        #paypal-checkout { padding-top: 30px; }
        .form-group#paypalFG { margin-bottom: 0px !important; }
        `}
        </style>
        <Form horizontal>

<<<<<<< HEAD
          { !requireLogin &&
            <section className="order">
              { order.tier.type !== 'TICKET' && <SectionTitle section="contributionDetails" /> }
              { order.tier.type === 'TICKET' &&
                <div>
                  <SectionTitle section="ticketDetails" />
                  <Row>
                    <Col sm={12}>
                      <div className="form-group">
                        <label className="col-sm-2 control-label">
                          <FormattedMessage id="tier.order.ticket.info" defaultMessage="Event info" />
                        </label>
                        <Col sm={10}>
                          <FormattedDate value={collective.startsAt} weekday="short" day="numeric" month="long" />, &nbsp;
                          <FormattedTime value={collective.startsAt} timeZone={collective.timezone} />&nbsp; - &nbsp;
                          { get(collective, 'location.name') }
                        </Col>
                      </div>
                    </Col>
                  </Row>
                </div>
              }
              <Row>
                <Col sm={12}>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">
                      { order.tier.type !== 'TICKET' && <FormattedMessage id="tier.order.contribution" defaultMessage="Contribution" /> }
                      { order.tier.type === 'TICKET' && <FormattedMessage id="tier.order.ticket" defaultMessage="Ticket" /> }
                    </label>
                    <Col sm={10}>
                      <TierComponent
                        tier={order.tier}
                        values={{
                          quantity: order.tier.quantity || order.quantity, // TODO: confusing, need to fix
                          interval: order.interval || order.tier.interval,
                          amount: order.totalAmount,
                        }}
                        onChange={(tier) => this.handleChange('order', 'tier', tier)}
                        />
                    </Col>
                  </div>
                </Col>
              </Row>
              { this.props.matchingFund &&
                <Row>
                  <Col sm={12}>
                    <MatchingFundWithData
                      collective={collective}
                      order={order}
                      uuid={this.props.matchingFund}
                      onChange={(matchingFund) => this.handleChange('order', 'matchingFund', matchingFund)}
                      />
                  </Col>
                </Row>
              }
              <Row>
                <Col sm={12}>
                  <InputField
                    label="Message (public)"
                    type="textarea"
                    name="publicMessage"
                    className="horizontal"
                    placeholder={intl.formatMessage(this.messages['order.publicMessage.placeholder'])}
                    defaultValue={order.publicMessage}
                    maxLength={255}
                    onChange={(value) => this.handleChange("order", "publicMessage", value)}
                    />
                </Col>
              </Row>
            </section>
          }
=======
>>>>>>> 9279ea6... define a custom expense policy
          <section className="userDetailsForm">
            <SectionTitle
              section="userDetails"
              subtitle={
                <div>
                  { !LoggedInUser && <FormattedMessage id="tier.order.userdetails.description" defaultMessage="If you wish to remain anonymous, only provide an email address without any other personal details." /> }
                  { LoggedInUser && <FormattedMessage id="tier.order.userdetails.description.loggedin" defaultMessage="If you wish to remain anonymous, logout and use another email address without providing any other personal details." /> }
                </div>
            }
                                    />

            { !LoggedInUser &&
              <Row key={`email.input`}>
                <Col sm={12}>
                  <InputField
                    className="horizontal"
                    {...inputEmail}
                    />
                </Col>
              </Row>
            }
            { !LoggedInUser && this.state.isNewUser && this.fields.map(field => (
              <Row key={`${field.name}.input`}>
                <Col sm={12}>
                  <InputField
                    className="horizontal"
                    {...field}
                    defaultValue={this.state.user[field.name]}
                    onChange={(value) => this.handleChange("user", field.name, value)}
                    />
                </Col>
              </Row>
            ))}

            { !requireLogin && this.fromCollectiveOptions.length > 1 &&
              <InputField
                className="horizontal"
                type="select"
                label={intl.formatMessage(this.messages[order.tier.type === 'TICKET' ? 'order.rsvpAs' : 'order.contributeAs'])}
                name="fromCollectiveSelector"
                onChange={CollectiveId => this.selectProfile(CollectiveId)}
                options={this.fromCollectiveOptions}
                />
            }

            { !LoggedInUser && this.state.isNewUser && (
              <Row key="newsletterOptIn.input">
                <Col sm={12}>
                  <InputField
                    className="horizontal"
                    name="newsletterOptIn"
                    type="checkbox"
                    help="Receive our monthly newsletter with updates about new collectives and features. Stay in the know with the latest sponsor and backer funding leaderboard, open source inspiration, and upcoming events."
                    description={intl.formatMessage(this.messages['newsletterOptIn.description'])}
                    defaultValue={this.state.user['newsletterOptIn']}
                    onChange={(value) => this.handleChange('user', 'newsletterOptIn', value)}
                    />
                </Col>
              </Row>
            )}

          </section>

          { !fromCollective.id && this.state.orgDetails.show &&
          <section className="organizationDetailsForm">
            <SectionTitle section="organizationDetails" />
            <Row key={`organization.name.input`}>
              <Col sm={12}>
                <InputField
                  className="horizontal"
                  type="text"
                  name="organization_name"
                  label={intl.formatMessage(this.messages['order.organization.name'])}
                  onChange={(value) => this.handleChange("fromCollective", "name", value)}
                  />
              </Col>
            </Row>
            <Row key={`organization.website.input`}>
              <Col sm={12}>
                <InputField
                  className="horizontal"
                  type="text"
                  name="organization_website"
                  label={intl.formatMessage(this.messages['order.organization.website'])}
                  onChange={(value) => this.handleChange("fromCollective", "website", value)}
                  />
              </Col>
            </Row>
            <Row key={`organization.twitterHandle.input`}>
              <Col sm={12}>
                <InputField
                  className="horizontal"
                  type="text"
                  name="organization_twitterHandle"
                  pre="@"
                  label={intl.formatMessage(this.messages['order.organization.twitterHandle'])}
                  onChange={(value) => this.handleChange("fromCollective", "twitterHandle", value)}
                  />
              </Col>
            </Row>
          </section>
        }

          { !requireLogin &&
          <div>

            <section className="order">
              { order.tier.type !== 'TICKET' && <SectionTitle section="contributionDetails" /> }
              { order.tier.type === 'TICKET' &&
                <div>
                  <SectionTitle section="ticketDetails" />
                  <Row>
                    <Col sm={12}>
                      <div className="form-group">
                        <label className="col-sm-2 control-label">
                          <FormattedMessage id="tier.order.ticket.info" defaultMessage="Event info" />
                        </label>
                        <Col sm={10}>
                          {!collective.startsAt &&
                            console.warn(`OrderForm: collective.startsAt should not be empty. collective.id: ${collective.id}`)
                          }
                          {collective.startsAt &&
                            <React.Fragment>
                              <FormattedDate value={collective.startsAt} weekday="short" day="numeric" month="long" />, &nbsp;
                              <FormattedTime value={collective.startsAt} timeZone={collective.timezone} />&nbsp; - &nbsp;
                            </React.Fragment>
                          }
                          { get(collective, 'location.name') }
                        </Col>
                      </div>
                    </Col>
                  </Row>
                </div>
              }
              <Row>
                <Col sm={12}>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">
                      { order.tier.type !== 'TICKET' && <FormattedMessage id="tier.order.contribution" defaultMessage="Contribution" /> }
                      { order.tier.type === 'TICKET' && <FormattedMessage id="tier.order.ticket" defaultMessage="Ticket" /> }
                    </label>
                    <Col sm={10}>
                      <TierComponent
                        tier={order.tier}
                        values={{
                          quantity: order.tier.quantity || order.quantity, // TODO: confusing, need to fix
                          interval: order.interval || order.tier.interval,
                          amount: order.totalAmount,
                        }}
                        onChange={(tier) => this.handleChange('order', 'tier', tier)}
                        />
                    </Col>
                  </div>
                </Col>
              </Row>
              { this.props.matchingFund &&
                <Row>
                  <Col sm={12}>
                    <MatchingFundWithData
                      collective={collective}
                      order={order}
                      uuid={this.props.matchingFund}
                      onChange={(matchingFund) => this.handleChange('order', 'matchingFund', matchingFund)}
                      />
                  </Col>
                </Row>
              }
              <Row>
                <Col sm={12}>
                  <InputField
                    label="Message (public)"
                    type="textarea"
                    name="publicMessage"
                    className="horizontal"
                    placeholder={intl.formatMessage(this.messages['order.publicMessage.placeholder'])}
                    defaultValue={order.publicMessage}
                    maxLength={255}
                    onChange={(value) => this.handleChange("order", "publicMessage", value)}
                    />
                </Col>
              </Row>
            </section>

            { order.totalAmount > 0 &&
              <section className="paymentDetails">
                <SectionTitle section="paymentDetails" />

                { this.paymentMethodTypeOptions.length > 1 &&
                  <Row>
                    <Col sm={12}>
                      <InputField
                        className="horizontal"
                        type="select"
                        name="paymentMethodTypeSelector"
                        options={this.paymentMethodTypeOptions}
                        label={intl.formatMessage(this.messages['paymentMethod.type'])}
                        onChange={(value) => this.handleChange("paymentMethod", "type", value)}
                        />
                    </Col>
                  </Row>
                }

                { this.state.paymentMethod.type === 'creditcard' && this.renderCreditCard() }

                { this.state.paymentMethod.type === 'paypal' && this.renderPaypal() }
              </section>
            }

            <Row key={`prepaidcard.input`}>
              <Col sm={2} />
              <Col sm={10}>
                { order.totalAmount > 0 && !collective.host &&
                  <div className="error">
                    <FormattedMessage id="order.error.hostRequired" defaultMessage="This collective doesn't have a host that can receive money on their behalf" />
                  </div>
                }
                { (collective.host || order.totalAmount === 0) &&
                  <div className="actions">
                    { this.state.paymentMethod.type !== 'paypal' &&
                      <div className="submit">
                        <ActionButton className="blue" onClick={this.handleSubmit} disabled={this.state.loading}>
                          {this.state.loading ? <FormattedMessage id='form.processing' defaultMessage='processing' /> : order.tier.button || capitalize(intl.formatMessage(this.messages['order.button']))}
                        </ActionButton>
                      </div> }
                    { order.totalAmount > 0 &&
                      <div className="disclaimer">
                        <FormattedMessage
                          id="collective.host.disclaimer"
                          defaultMessage="By clicking above, you are pledging to give the host ({hostname}) {amount} {interval, select, month {per month} year {per year} other {}} for {collective}."
                          values={
                            {
                              hostname: collective.host.name,
                              amount: formatCurrency(order.totalAmount, currency),
                              interval: order.interval || order.tier.interval,
                              collective: collective.name
                            }
                          }
                          />
                          { (order.interval || order.tier.interval) &&
                            <div>
                              <FormattedMessage id="collective.host.cancelanytime" defaultMessage="You can cancel anytime." />
                            </div>
                          }
                      </div>
                    }
                    <div className="result">
                      { this.state.loading && <div className="loading"><FormattedMessage id="form.processing" defaultMessage="processing" />...</div> }
                      { this.state.result.success &&
                        <div className="success">
                          {this.state.result.success}
                        </div>
                      }
                      { this.state.result.error &&
                        <div className="error">
                          {this.state.result.error}
                        </div>
                      }
                    </div>
                  </div>
                }
              </Col>
            </Row>
          </div>
        }
        </Form>

      </div>
    )
  }
}

export default withIntl(withApollo(OrderForm));
