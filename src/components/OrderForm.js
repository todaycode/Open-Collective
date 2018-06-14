import React from 'react';
import PropTypes from 'prop-types';
import TierComponent from '../components/Tier';
import InputField from '../components/InputField';
import ActionButton from '../components/Button';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { defineMessages, FormattedMessage } from 'react-intl';
import { capitalize, formatCurrency, isValidEmail } from '../lib/utils';
import { getStripeToken, isValidCard } from '../lib/stripe';
import { pick } from 'lodash';
import withIntl from '../lib/withIntl';
import { checkUserExistence, signin } from '../lib/api';

class OrderForm extends React.Component {

  static propTypes = {
    order: PropTypes.object.isRequired, // { tier: {}, quantity: Int, interval: String, totalAmount: Int }
    collective: PropTypes.object.isRequired,
    LoggedInUser: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    const { intl, order } = props;

    const tier = { ...order.tier };
    tier.amount = tier.amount || order.totalAmount;
    tier.interval = tier.interval || order.interval;

    this.state = {
      isNewUser: true,
      loginSent: false,
      user: {},
      fromCollective: {},
      creditcard: { save: true },
      order: order || {},
      tier,
      result: {}
    };
    
    this.state.order.totalAmount = this.state.order.totalAmount || tier.amount * (tier.quantity || 1);

    this.paymentMethodsOptions = [];

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.error = this.error.bind(this);
    this.resetError = this.resetError.bind(this);
    this.validate = this.validate.bind(this);
    this.resetOrder = this.resetOrder.bind(this);

    this.messages = defineMessages({
      'order.profile': { id: 'tier.order.profile', defaultMessage: `Profile` },
      'order.success': { id: 'tier.order.success', defaultMessage: '🎉 Your order has been processed with success' },
      'order.error': { id: 'tier.order.error', defaultMessage: `An error occured 😳. The order didn't go through. Please try again in a few.` },
      'order.button': { id: 'tier.order.button', defaultMessage: 'place order' },
      'order.organization.create': { id: 'tier.order.organization.create', defaultMessage: `create an organization` },
      'order.organization.name': { id: 'tier.order.organization.name', defaultMessage: `name` },
      'order.organization.website': { id: 'tier.order.organization.website', defaultMessage: `website` },
      'order.organization.twitterHandle': { id: 'tier.order.organization.twitterHandle', defaultMessage: `Twitter` },
      'error.email.invalid': { id: 'error.email.invalid', defaultMessage: 'Invalid email address' },
      'creditcard.label': { id: 'creditcard.label', defaultMessage: 'Credit Card' },
      'creditcard.save': { id: 'creditcard.save', defaultMessage: 'Save credit card to {type, select, user {my account} other {{type} account}}' },
      'creditcard.missing': { id: 'creditcard.missing', defaultMessage: 'Mmmm... 🤔 looks like you forgot to provide your credit card details.' },
      'creditcard.error': { id: 'creditcard.error', defaultMessage: 'Invalid credit card' },
      'ticket.title': { id: 'tier.order.ticket.title', defaultMessage: 'RSVP' },
      'backer.title': { id: 'tier.order.backer.title', defaultMessage: 'Become a {name}' },
      'sponsor.title': { id: 'tier.order.sponsor.title', defaultMessage: 'Become a {name}' },
      'type.label': { id: 'tier.type.label', defaultMessage: 'type' },
      'firstName.label': { id: 'user.firstName.label', defaultMessage: 'first name' },
      'lastName.label': { id: 'user.lastName.label', defaultMessage: 'last name' },
      'website.label': { id: 'user.website.label', defaultMessage: 'website' },
      'twitterHandle.label': { id: 'user.twitterHandle.label', defaultMessage: 'twitter' },
      'twitterHandle.description': { id: 'user.twitterHandle.description', defaultMessage: 'If any' },
      'email.label': { id: 'user.email.label', defaultMessage: 'email' },
      'email.description': { id: 'user.email.description', defaultMessage: '* required' },
      'email.description.login': { id: 'signin.createAccount.description', defaultMessage: 'Welcome back! Click on \"Login\" (or hit Enter) and we will send you a link to login by email.' },
      'email.description.signup': { id: 'signin.emailSent.description', defaultMessage: 'Login email sent. Please follow the instructions in that email to proceed.'},
      'description.label': { id: 'user.description.label', defaultMessage: 'Short bio' },
      'description.description': { id: 'user.description.description', defaultMessage: 'Present yourself in 60 characters or less, if you can!' },
      'totalAmount.label': { id: 'tier.totalAmount.label', defaultMessage: 'Total amount' },
      'startsAt.label': { id: 'tier.startsAt.label', defaultMessage: 'start date and time' },
      'endsAt.label': { id: 'tier.endsAt.label', defaultMessage: 'end date and time' },
      'order.publicMessage.placeholder': { id: 'order.publicMessage.placeholder', defaultMessage: 'Use this space to add a personal message (public)' }
    });

    this.fields = [
      {
        name: 'firstName'
      },
      {
        name: 'lastName'
      },
      {
        name: 'website'
      },
      {
        name: 'twitterHandle',
        pre: '@',
        validate: (val) => val.match(/^[A-Za-z0-9_]{1,15}$/)
      },
      {
        name: 'description'
      }
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
  }

  componentDidMount() {
    this._isMounted = true;
    if (typeof Stripe !== "undefined") {
      const stripePublishableKey = (typeof window !== "undefined" && (window.location.hostname === 'localhost' || window.location.hostname === 'staging.opencollective.com')) ? 'pk_test_5aBB887rPuzvWzbdRiSzV3QB' : 'pk_live_qZ0OnX69UlIL6pRODicRzsZy';
      // eslint-disable-next-line
      Stripe.setPublishableKey(stripePublishableKey);
    }
    this.componentWillReceiveProps(this.props);
  }

  populatePaymentMethods(CollectiveId) {
    const { LoggedInUser } = this.props;
    let paymentMethods = [], paymentMethodsOptions = [];

    const collective = this.collectivesById[CollectiveId];

    const generateOptionsForCollective = (collective) => {
      return paymentMethods.map(pm => {
        const value = pm.uuid
        const label = `💳  \xA0\xA0${collective.name} - ${pm.data.brand} ${pm.data.funding} ${pm.name} - exp ${pm.data.expMonth}/${pm.data.expYear}`;
        const option = {};
        option[value] = label;
        return option;
      });
    }

    if (collective) {
      paymentMethods = (collective.paymentMethods || []).filter(pm => pm.service === 'stripe');
      paymentMethodsOptions = generateOptionsForCollective(collective);
    }

    if (LoggedInUser && CollectiveId !== LoggedInUser.CollectiveId) {
      paymentMethods = [... paymentMethods, ...LoggedInUser.collective.paymentMethods];
      paymentMethodsOptions = [...paymentMethodsOptions, ... generateOptionsForCollective(this.collectivesById[LoggedInUser.CollectiveId])];
    }

    paymentMethodsOptions.push({'other': 'other'});

    this.paymentMethods = paymentMethods;
    this.paymentMethodsOptions = paymentMethodsOptions;

    return paymentMethodsOptions;
  }

  populateOrganizations(LoggedInUser) {
    const { intl } = this.props;
    const fromCollectiveOptions = [], collectivesById = {};

    fromCollectiveOptions.push({ [LoggedInUser.CollectiveId]: LoggedInUser.collective.name });
    collectivesById[LoggedInUser.CollectiveId] = LoggedInUser.collective;
    LoggedInUser.memberOf.map(membership => {
      if (membership.collective.type === 'COLLECTIVE') return;
      if (['ADMIN','HOST'].indexOf(membership.role) === -1) return;
      const value = membership.collective.id;
      const label = membership.collective.name;
      collectivesById[value] = pick(membership.collective, ['id', 'type', 'name', 'paymentMethods'])
      fromCollectiveOptions.push({ [value]: label });
    })
    collectivesById[0] = null;
    fromCollectiveOptions.push({ 0: intl.formatMessage(this.messages['order.organization.create']) });
    this.collectivesById = collectivesById;
    this.fromCollectiveOptions = fromCollectiveOptions;
  }

  componentWillReceiveProps(props) {
    const { LoggedInUser } = props;
    if (!LoggedInUser) return;
    this.populateOrganizations(LoggedInUser);
    if (!this._isMounted) return;
    this.setState({ LoggedInUser }); // Error: Can only update a mounted or mounting component
    this.selectProfile(LoggedInUser.CollectiveId);
  }

  selectProfile(CollectiveId) {
    const collective = this.collectivesById[CollectiveId];
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
      isNewUser: false,
      fromCollective
    };
    this.populatePaymentMethods(CollectiveId);
    if (this.paymentMethods.length > 0) {
      newState.creditcard = { uuid: this.paymentMethods[0].uuid };
    } else {
      newState.creditcard = { save: true }; // reset to default value
    }

    this.setState(newState);
    if (typeof window !== "undefined") {
      window.state = newState;
    }
  }

  handleChange(obj, attr, value) {
    this.resetError();
    const newState = { ... this.state };
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

    if (obj === 'tier') {
      newState['order']['totalAmount'] = newState['tier']['amount'] * newState['tier']['quantity'];
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
  }

  async handleSubmit() {
    console.log(">>> handleSubmit", this.state)
    if (! await this.validate()) return false;
    this.setState({ loading: true });

    const { sanitizedCard, order, tier, fromCollective, user } = this.state;

    const quantity = tier.quantity || 1;
    const OrderInputType = {
      user,
      fromCollective,
      publicMessage: order.publicMessage,
      quantity,
      interval: tier.interval,
      totalAmount: (quantity * tier.amount) || order.totalAmount,
      paymentMethod: sanitizedCard
    };

    if (tier.id) {
      OrderInputType.tier = { id: tier.id, amount: tier.amount };
    }
    console.log("OrderForm", "onSubmit", OrderInputType);
    await this.props.onSubmit(OrderInputType);
    this.setState({ loading: false });
  }

  error(msg) {
    this.setState({ result: { error: msg }});
  }

  resetError() {
    this.setState({ result: { error: null }});
  }

  async validate() {
    const { intl } = this.props;
    if (this.state.isNewUser && !isValidEmail(this.state.user.email)) {
      this.setState({ result: { error: intl.formatMessage(this.messages['error.email.invalid']) }});
      return false;
    }
    if (this.state.order.totalAmount > 0) {
      const card = this.state.creditcard;
      if (!card) {
        this.setState({ result: { error: intl.formatMessage(this.messages['creditcard.missing']) }})
        return false;
      }
      const newState = {...this.state};
      if (card.uuid && card.uuid.length === 36) {
        newState.sanitizedCard = { uuid: card.uuid };
        this.setState(newState);
        return true;
      } else if (isValidCard(card)) {
        let res;
        try {
          res = await getStripeToken(card);
        } catch (e) {
          this.setState({ result: { error: e }})
          return false;
        }
        const last4 = card.number.replace(/ /g, '').substr(-4);
        const sanitizedCard = {
          name: last4,
          token: res.token,
          data: {
            fullName: card.full_name,
            expMonth: card.exp_month,
            expYear: card.exp_year,
            brand: res.card.brand,
            country: res.card.country,
            funding: res.card.funding,
          },
          save: card.save
        };
        newState.sanitizedCard = sanitizedCard;
        this.setState(newState);
        return true;
      } else {
        this.setState({ result: { error: intl.formatMessage(this.messages['creditcard.error']) }})
        return false;
      }
    } else {
      return true;
    }
  }

  resetOrder() {
    this.setState({ order: {} });
  }

  signin() {
    signin(this.state.user, window.location.href).then(() => {
      this.setState({ loginSent: true })
    })
  }

  render() {
    const { intl, collective, LoggedInUser } = this.props;
    const currency = this.state.tier.currency || collective.currency;
    const showNewCreditCardForm = !this.state.creditcard.uuid || this.state.creditcard.uuid === 'other';

    const inputEmail = {
      type: 'email',
      name: 'email',
      required: true,
      focus: true,
      label: `${intl.formatMessage(this.messages['email.label'])}*`,
      description: intl.formatMessage(this.messages['email.description']),
      defaultValue: this.state.order['email'],
      onChange: (value) => this.handleChange("user", "email", value)
    };
    if (!this.state.isNewUser) {
      inputEmail.button = <Button onClick={() => this.signin()} focus={true}>Login</Button>;
      if (!this.state.loginSent) {
        inputEmail.description = intl.formatMessage(this.messages['email.description.login']);
      } else {
        inputEmail.button = <Button disabled={true}>Login</Button>;
        inputEmail.description = intl.formatMessage(this.messages['email.description.signup']);
      }
    }

    return (
      <div className="OrderForm">
        <style jsx>{`
        h2 {
          margin: 3rem 0 3rem 0;
        }
        .OrderForm {
          max-width: 700px;
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
          margin: 6rem auto;
          text-align: center;
          max-width: 400px
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
        :global(.col-sm-12) {
          width: 100%;
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
        @media (min-width: 768px) {
          .actions {
            margin: 6rem 0 6rem 26%;
          }
        }
        `}</style>
        <Form horizontal>
          <div className="userDetailsForm">
            <h2><FormattedMessage id="tier.order.userDetails" defaultMessage="User details" /></h2>
            <p>
              { !LoggedInUser && <FormattedMessage id="tier.order.userdetails.description" defaultMessage="If you wish to remain anonymous, only provide an email address without any other personal details." /> }
              { LoggedInUser && <FormattedMessage id="tier.order.userdetails.description.loggedin" defaultMessage="If you wish to remain anonymous, logout and use another email address without providing any other personal details." /> }
            </p>
            { LoggedInUser &&
              <InputField
                className="horizontal"
                type="select"
                label={intl.formatMessage(this.messages['order.profile'])}
                name="fromCollectiveSelector"
                onChange={CollectiveId => this.selectProfile(CollectiveId)}
                options={this.fromCollectiveOptions}
                />
            }
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
                    defaultValue={this.state.order[field.name]}
                    onChange={(value) => this.handleChange("user", field.name, value)}
                    />
                </Col>
              </Row>
            ))}
        </div>
        { !this.state.fromCollective.id &&
          <div className="organizationDetailsForm">
            <h2><FormattedMessage id="tier.order.organizationDetails" defaultMessage="Organization details" /></h2>
            <p><FormattedMessage id="tier.order.organizationDetails.description" defaultMessage="If you wish to contribute as an organization, please enter the information below. Otherwise you can leave this empty." /></p>
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
                  pre="http://"
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
          </div>
        }
        { this.state.order.totalAmount > 0 &&
          <div className="paymentDetails">
            <h2><FormattedMessage id="tier.order.paymentDetails" defaultMessage="Payment details" /></h2>
            <Row>
              <Col sm={12}>
                { this.paymentMethodsOptions && this.paymentMethodsOptions.length > 1 &&
                  <InputField
                    type="select"
                    className="horizontal"
                    type="select"
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
                    <InputField
                      description={intl.formatMessage(this.messages['creditcard.save'], { type: this.state.fromCollective.type && this.state.fromCollective.type.toLowerCase() || 'user' })}
                      className="horizontal"
                      name="saveCreditCard"
                      type="checkbox"
                      defaultValue={true}
                      onChange={value => this.handleChange("creditcard", "save", value)}
                      />
                  </div>
                }
              </Col>
            </Row>
          </div>
        }
        
        <div className="order">
          <h2><FormattedMessage id="tier.order.contributionDetails" defaultMessage="Contribution details" /></h2>
          <Row>
            <Col sm={12}>
              <div className="form-group">
                <label className="col-sm-3 control-label">Contribution</label>
                <Col sm={9}>
                  <TierComponent
                    tier={this.props.order.tier}
                    defaultValue={{
                      quantity: this.props.order.quantity,
                      interval: this.props.order.tier.interval,
                      amount: this.props.order.totalAmount / this.props.order.quantity
                    }}
                    onChange={(tier) => this.handleChange("tier", tier)}
                    />
                </Col>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
            <InputField
              label="Message (public)"
              type="textarea"
              name="publicMessage"
              className="horizontal"
              placeholder={intl.formatMessage(this.messages['order.publicMessage.placeholder'])}
              defaultValue={this.state.order.publicMessage}
              onChange={(value) => this.handleChange("order", "publicMessage", value)}
              />
            </Col>
          </Row>
        </div>

        { this.state.order.totalAmount > 0 && !collective.host &&
          <div className="error">
            <FormattedMessage id="order.error.hostRequired" defaultMessage="This collective doesn't have a host that can receive money on their behalf" />
          </div>
        }
        { (collective.host || this.state.order.totalAmount === 0) &&
          <div className="actions">
            <div className="submit">
              <ActionButton className="blue" ref="submit" onClick={this.handleSubmit} disabled={this.state.loading}>
                {this.state.loading ? <FormattedMessage id='loading' defaultMessage='loading' /> : this.state.tier.button || capitalize(intl.formatMessage(this.messages['order.button']))}
              </ActionButton>
            </div>
            { this.state.order.totalAmount > 0 &&
              <div className="disclaimer">
                <FormattedMessage
                  id="collective.host.disclaimer"
                  defaultMessage="By clicking above, you are pledging to give the host ({hostname}) {amount} {interval, select, month {per month} year {per year} other {}} for {collective}."
                  values={
                    {
                      hostname: collective.host.name,
                      amount: formatCurrency(this.state.order.totalAmount, currency),
                      interval: this.state.tier.interval,
                      collective: collective.name
                    }
                  } />
                  { this.state.tier.interval &&
                    <div>
                      <FormattedMessage id="collective.host.cancelanytime" defaultMessage="You can cancel anytime." />
                    </div>
                  }
              </div>
            }
            <div className="result">
              { this.state.loading && <div className="loading">Processing...</div> }
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
          
      </Form>
        
      </div>
    )
  }
}

export default withIntl(OrderForm);