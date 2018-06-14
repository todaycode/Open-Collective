import React from 'react';
import PropTypes from 'prop-types';
import colors from '../constants/colors';
import TicketController from './TicketController';
import CTAButton from './Button';
import Currency from './Currency';
import { defineMessages, FormattedNumber, FormattedMessage } from 'react-intl';
import withIntl from '../lib/withIntl';
import { ButtonGroup, Button } from 'react-bootstrap';
import InputField from './InputField';
import { getCurrencySymbol, capitalize } from '../lib/utils';
import { get } from 'lodash';

class Tier extends React.Component {

  static propTypes = {
    tier: PropTypes.object.isRequired,
    className: PropTypes.string,
    values: PropTypes.object, // overriding values {quantity, amount, interval}
    onChange: PropTypes.func, // onChange({ id, quantity, amount, interval })
    onClick: PropTypes.func // onClick({ id, quantity, amount, interval })
  }

  constructor(props) {
    super(props);

    this.onChange = this.props.onChange || function() {}; 
    this.handleChange = this.handleChange.bind(this);

    this.currencyStyle = { style: 'currency', currencyDisplay: 'symbol', minimumFractionDigits: 0, maximumFractionDigits: 2};

    this.messages = defineMessages({
      'amount.label': { id: 'tier.amount.label', defaultMessage: 'amount' },
      'interval.label': { id: 'tier.interval.label', defaultMessage: 'interval' },
      'interval.onetime': { id: 'tier.interval.onetime', defaultMessage: 'one time' },
      'interval.month': { id: 'tier.interval.month', defaultMessage: 'month' },
      'interval.year': { id: 'tier.interval.year', defaultMessage: 'year' }
    });

  }

  // since this is a pure component, we don't want to store state
  // But, we still need a way to construct the current values of 
  // quantity, amount and interval
  calcCurrentValues() {

    const { values, tier } = this.props;

    let quantity, amount, interval, presets;

    // Case 1: handle presets. Both interval and amount are changeable
    if (tier.presets) {
      presets = tier.presets.filter(p => !isNaN(p)).map(p => parseInt(p, 10));
      interval = (values && values.interval) || null;
      amount = (values && values.amount) || presets[Math.floor(presets.length / 2)];
      quantity = 1
    } else if (tier.type === 'TICKET') {
      // Case 2: handle quantity. Can't be active at same time as presets
      quantity = (values && values.quantity) || 1;
      amount = tier.amount * quantity;
    } else if (tier.amount || values.amount) {
      // Case 3: nothing is changeable, comes with amount (and interval optional)
      interval = tier.interval || values.interval; 
      amount = tier.amount || values.amount;
      quantity = 1;
    }
    console.log("calcCurrentValues", { interval, amount, quantity, presets } )
    return { interval, amount, quantity, presets }
  }


  handleTicketsChange(quantity) {
    const currentValues = this.calcCurrentValues();

    const response = {
      ...this.props.tier,
      quantity
    };
    if (currentValues.interval) {
      response.interval = currentValues.interval;
    }
    this.onChange(response);
  }


  handleChange(field, value) {
    const { tier } = this.props;

    const currentValues = this.calcCurrentValues();

    const response = Object.assign({}, tier, { 
      amount: currentValues.amount,
      interval: currentValues.interval,
      quantity: currentValues.quantity
    });

    // Make sure that the custom amount entered by the user is never under the minimum preset amount
    if (field === 'amount' && tier.presets && tier.presets[0] >= value) {
      value = tier.presets[0];
    }

    response[field] = value;
    this.onChange(response);
  }

  render() {
    const { intl, values, tier } = this.props;
    const { type, name, description, currency } = this.props.tier;

    const intervals = [ null, 'month', 'year'];
    const currentValues = this.calcCurrentValues();
    const { quantity, amount, interval, presets } = currentValues;

    const anchor = (get(tier, 'name') || "").toLowerCase().replace(/ /g,'-');

    return (
      <div className={`${this.props.className} tier ${this.props.onClick ? 'withCTA' : ''}`} id={anchor}>
        <style jsx global>{`
          .tier .inputAmount .form-group {
            margin: 0;
          }
        `}</style>
        <style jsx>{`
          .tier {
            width: 100%;
            max-width: 400px;
            min-height: 12rem;
            position: relative;
            border: 1px solid ${colors.lightgray};
            color: ${colors.black};
          }
          .header {
            margin: 1rem;
            display: flex;
            justify-content: space-between;
          }
          .title {
            font-size: 1.8rem;
          }
          .description {
            margin: 1rem 1rem 2rem 1rem;
            color: ${colors.darkgray};
            font-size: 1.5rem;
          }
          .actions {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            height: 6rem;
            width: 100%;
          }
          .ctabtn {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            font-weight: bold;
            width: 100%;
            text-transform: uppercase;
          }
          .ctabtn.blue {
            color: white;
            background: ${colors.blue};
          }
          .ctabtn.gray {
            color: white;
            background: ${colors.darkgray};
          }
          .inputRow {
            margin: 1rem 0;
          }
          label {
            text-transform: uppercase;
            color: #aaaeb3;
            font-weight: 300;
            font-family: lato, montserratlight, arial;
            white-space: nowrap;
            font-size: 1rem;
          }
          .tier label {
            width: 100%;
          }
          .presets {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .tier :global(.presetBtnGroup) {
            margin: 0.5rem 0;
          }
          .tier :global(.inputAmount) {
            width: 12rem;
            margin: 0.5rem 0;
          }
          .tier :global(input[name=amount]) {
            max-width: 8rem;
          }
          .tier :global(.btn-group), .tier :global(.inputField), .tier :global(.form-group), .tier :global(.form-control) {
            border-radius: 3px;
            background-color: #ffffff;
            box-shadow: inset 0 -3px 0 0 rgba(0, 0, 0, 0.03);
            height: 40px;
          }
          .tier :global(.btn-group>.btn) {
            height: 40px;
          }
          .tier :global(.btn-primary), :global(.btn-primary:hover), :global(.btn-primary:active), :global(.btn-primary:focus) {
            background-color: #f0f3f5;
            box-shadow: inset 0 3px 0 0 rgba(0, 0, 0, 0.07);
            border: solid 1px #dcdfe1;
            font-family: lato, montserralight, Montserrat;
            font-weight: bold;
            font-size: 1.2rem;
            color: #494b4d;
          }
          .tier:global(.btn-default) {
            font-family: montserralight, Montserrat;
            font-size: 1.2rem;
            color: #494b4d;
            background-color: transparent;
            border: solid 1px #dcdfe1;
          }
        `}</style>
        <div>
          <div className="header">
            <div className="title" >{capitalize(name)}</div>
            { !presets &&
              <div className="title amount" >
                { !amount && !presets && <FormattedMessage id="amount.free" defaultMessage="free" /> }
                { amount > 0 && <Currency value={amount} currency={currency} /> }
                { interval && '/' }
                {interval && interval === 'month' && intl.formatMessage(this.messages[`interval.month`])}
                {interval && interval === 'year' && intl.formatMessage(this.messages[`interval.year`])}
              </div>
            }
          </div>
          <div className="description">
            {description}
            { presets &&
              <div>
                <div className="inputRow">
                  <label><FormattedMessage id="tier.amount.select" defaultMessage="Select amount" /></label>
                  <div className="presets">
                    <ButtonGroup className="presetBtnGroup">
                      { presets.map(preset => !isNaN(preset) && (
                        <Button className="presetBtn" bsStyle={amount === preset ? 'primary' : 'default'} onClick={() => this.handleChange('amount', preset)}>
                          <FormattedNumber
                            value={preset / 100}
                            currency={currency}
                            {...this.currencyStyle}
                            />
                        </Button>
                      ))}
                    </ButtonGroup>
                    <InputField
                      name='amount'
                      className="inputAmount"
                      min={tier.presets && tier.presets[0]}
                      pre={getCurrencySymbol(currency)}
                      type='currency'
                      value={amount}
                      onChange={(amount) => this.handleChange('amount', amount)} />
                    </div>
                </div>
                <div className="inputRow">
                  <label><FormattedMessage id="tier.interval.select" defaultMessage="Select frequency" /></label>
                  <ButtonGroup className="intervalBtnGroup">
                    { intervals.map(i => (
                      <Button className="intervalBtn" bsStyle={interval === i ? 'primary' : 'default'} onClick={() => this.handleChange('interval', i)}>
                        {intl.formatMessage(this.messages[`interval.${i || 'onetime'}`])}
                      </Button>
                    ))}
                  </ButtonGroup>                
                </div>
              </div>
            }
          </div>
          { type === 'TICKET' &&
            <div id="actions" className="actions">
              <TicketController value={quantity} onChange={(value) => this.handleTicketsChange(value)} />
              {this.props.onClick && <CTAButton className="ctabtn blue" label={(<FormattedMessage id='tier.GetTicket' values={{ quantity }} defaultMessage={`{quantity, plural, one {get ticket} other {get tickets}}`} />)} onClick={() => this.props.onClick({id: tier.id, amount, quantity, interval})} />}
            </div>
          }
          { type !== 'TICKET' && this.props.onClick && 
            <div id="actions" className="actions">
              <CTAButton className="ctabtn blue" label={tier.button || (<FormattedMessage id='tier.GetTier' values={{name}} defaultMessage={`become a {name}`} />)} onClick={() => this.props.onClick({id: tier.id, amount, quantity, interval})} />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default withIntl(Tier);