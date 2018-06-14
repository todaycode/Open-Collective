import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, FormattedNumber, FormattedMessage } from 'react-intl';
import { imagePreview, capitalize } from '../lib/utils';
import { get } from 'lodash';
import { addGetTransaction } from '../graphql/queries';

class TransactionDetails extends React.Component {

  static propTypes = {
    collective: PropTypes.object,
    transaction: PropTypes.object,
    mode: PropTypes.string // open or closed
  }

  constructor(props) {
    super(props);
    this.messages = defineMessages({
      'hostFeeInTxnCurrency': { id: 'transaction.hostFeeInTxnCurrency', defaultMessage: 'host fee' },
      'platformFeeInTxnCurrency': { id: 'transaction.platformFeeInTxnCurrency', defaultMessage: 'Open Collective fee' },
      'paymentProcessorFeeInTxnCurrency': { id: 'transaction.paymentProcessorFeeInTxnCurrency', defaultMessage: 'payment processor fee' }
    });
    this.currencyStyle = { style: 'currency', currencyDisplay: 'symbol', minimumFractionDigits: 0, maximumFractionDigits: 2};
  }

  render() {
    const { intl, collective, transaction } = this.props;

    const type = transaction.type.toLowerCase();

    const amountDetails = [intl.formatNumber(transaction.amount / 100, { currency: collective.currency, ...this.currencyStyle})];
    const addFees = (feesArray) => {
      feesArray.forEach(feeName => {
        if (transaction[feeName]) {
          amountDetails.push(`${intl.formatNumber(transaction[feeName] / 100, { currency: transaction.currency, ...this.currencyStyle})} (${intl.formatMessage(this.messages[feeName])})`);
        }
      })
    }

    addFees(['hostFeeInTxnCurrency', 'platformFeeInTxnCurrency', 'paymentProcessorFeeInTxnCurrency']);

    const amountDetailsStr = amountDetails.join(' - ')

    return (
        <div className={`TransactionDetails ${this.props.mode}`}>
        <style jsx>{`
          .TransactionDetails {
            font-size: 1.2rem;
            overflow: hidden;
            transition: max-height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            max-height: 15rem;
          }
          .TransactionDetails.closed {
            max-height: 0;
          }
          .TransactionDetails .frame {
            padding: 4px;
            margin-top: 1rem;
            margin-right: 1rem;
            float: left;
            background-color: #f3f4f5;
          }
          .TransactionDetails img {
            width: 64px;
          }
          .col {
            float: left;
            display: flex;
            flex-direction: column;         
            margin-right: 1rem;
            margin-top: 1rem;
          }
          label {
            text-transform: uppercase;
            color: #aaaeb3;
            font-weight: 300;
            font-family: Lato, Montserrat, Arial;
            white-space: nowrap;
          }
          .netAmountInGroupCurrency {
            font-weight: bold;
          }

          @media(max-width: 600px) {
            .TransactionDetails {
              max-height: 30rem;
            }
          }
        `}</style>

        {type === 'expense' &&
          <div className="frame">
            {transaction.attachment &&
              <a href={transaction.attachment} target="_blank" title="Open receipt in a new window">
                <img src={imagePreview(transaction.attachment)} />
              </a>
            }
            {!transaction.attachment &&
              <img src={'/static/images/receipt.svg'} />
            }
          </div>
        }
        <div className="col">
          <label><FormattedMessage id='transaction.host' defaultMessage='host' /></label>
          {transaction.host.name}
        </div>
        <div className="col">
          <label><FormattedMessage id='transaction.paymentMethod' defaultMessage='payment method' /></label>
          {capitalize(transaction.paymentMethod.name)}
        </div>
        <div className="col">
          <label><FormattedMessage id='transaction.amount' defaultMessage='amount' /></label>
          <div className="amountDetails">
            <span>{amountDetailsStr}</span>
            <span className="netAmountInGroupCurrency">&nbsp;=&nbsp;
              <FormattedNumber
                value={transaction.netAmountInGroupCurrency / 100}
                currency={transaction.currency}
                {...this.currencyStyle}
                />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default addGetTransaction(injectIntl(TransactionDetails));