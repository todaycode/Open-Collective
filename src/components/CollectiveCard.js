import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedDate } from 'react-intl';
import Currency from './Currency';
import { pickLogo } from '../lib/collective.lib';
import { get } from 'lodash';
import { Router } from '../server/pages';
import { firstSentence } from '../lib/utils';

class CollectiveCard extends React.Component {

  static propTypes = {
    collective: PropTypes.object.isRequired,
    membership: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    Router.pushRoute(`/${this.props.collective.slug}`);
  }

  render() {
    const { collective, membership } = this.props;

    const logo = collective.image || pickLogo(collective.id);
    const tierName = membership.tier ? membership.tier.name : membership.role;
    const currency = (membership.tier && membership.tier.currency) ? membership.tier.currency : collective.currency;

    return (
      <a className={`CollectiveCard ${collective.type}`} onClick={this.onClick} >
        <style jsx>{`
        .CollectiveCard {
          cursor: pointer;
          vertical-align: top;
          position: relative;
          box-sizing: border-box;
          display: inline-block;
          width: 200px;
          margin: 7px;
          border-radius: 5px;
          background-color: #ffffff;
          box-shadow: 0 1px 3px 0 rgba(45, 77, 97, 0.2);
          overflow: hidden;
          text-decoration: none !important;
        }

        .head {
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 120px;
          border-bottom: 5px solid #46b0ed;
        }

        .background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
        }

        .image {
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          width: 65%;
          height: 55%;
          margin: auto;
        }

        .body {
          padding: 1rem;
        }
      
        .name, .description {
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .name {
          min-height: 20px;
          font-size: 14px;
          margin: 5px;
          font-family: Montserrat;
          font-weight: 300;
          text-align: center;
          color: #303233;
          white-space: nowrap;
        }

        .description {
          font-family: lato;
          font-weight: normal;
          text-align: center;
          color: #787d80;
          font-size: 1.4rem;
          line-height: 1.3;
          margin: 0 5px;
        }
          
        .footer {
          font-size: 1.1rem;
          width: 100%;
          text-align: center;
        }

        .membership, .stats, .totalDonations {
          border-top: 1px solid #f2f2f2;
          padding: 1rem;
          color: #303233;
        }

        .stats {
          display: flex;
          width: 100%;
          justify-content: space-around;
        }

        .totalDonationsAmount {
          font-size: 2rem;
        }

        .role {
          min-height: 13px;
          font-family: Montserrat;
          font-weight: 700;
          letter-spacing: 3px;
          color: #75cc1f;
          text-transform: uppercase;
        }

        .value, .label {
          text-align: center;
          margin: auto;
        }

        .value {
          font-family: Lato;
          font-weight: normal;
          text-align: center;
          color: #303233;
          font-size: 1.4rem;
          margin: 3px 2px 0px;
        }

        .label {
          font-family: Lato;
          font-size: 9px;
          text-align: center;
          font-weight: 300;
          color: #a8afb3;
          text-transform: uppercase;
        }

        .since {
          min-height: 18px;
          font-family: Lato;
          font-size: 12px;
          font-weight: 500;
          line-height: 1.5;
          text-align: center;
          color: #aab0b3;
          text-transform: capitalize;
        }
        `}</style>
        <div className='head'>
          <div className='background' style={get(collective, 'settings.style.hero.cover')}></div>
          <div className='image' style={{backgroundImage: `url(${logo})`}}></div>
        </div>
        <div className='body'>
          <div className='name'>{collective.name}</div>
          <div className='description'>{firstSentence(collective.description, 64)}</div>
        </div>
        <div className='footer'>
          { collective.stats &&
            <div className="stats">
              <div className="backers">
                <div className="value">{collective.stats.backers}</div>
                <div className="label"><FormattedMessage id='collective.stats.backers' defaultMessage={`backers`} /></div>
              </div>
              <div className="yearlyBudget">
                <div className="value">
                  <Currency value={collective.stats.yearlyBudget} currency={currency} />
                </div>
                <div className="label"><FormattedMessage id='collective.stats.yearlyBudget' defaultMessage={`yearly budget`} /></div>
              </div>
            </div>
          }
          <div className="membership">
            <div className='role'>{tierName}</div>
            <div className='since'>
              <FormattedMessage id='membership.since' defaultMessage={`since`} />&nbsp;
              <FormattedDate value={membership.createdAt} month='long' year='numeric' />
            </div>
          </div>
          { membership.role === 'BACKER' && membership.totalDonations &&
            <div className="totalDonations">
              <div className="totalDonationsAmount">
                <Currency value={membership.totalDonations} currency={currency} />
              </div>
              <FormattedMessage id='membership.totalDonations.title' defaultMessage={`amount contributed`} />
            </div>
          }
        </div>
      </a>
      );
  }
}

export default CollectiveCard;