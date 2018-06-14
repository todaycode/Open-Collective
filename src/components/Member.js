import React from 'react';
import PropTypes from 'prop-types';
import colors from '../constants/colors';
import { Router } from '../server/pages';

import { defineMessages, injectIntl, FormattedMessage, FormattedDate } from 'react-intl';
import { pickAvatar } from '../lib/collective.lib';
import { firstSentence, singular, capitalize } from '../lib/utils';
import CollectiveCard from './CollectiveCard';

const star = '/static/images/icons/star.svg';


class Member extends React.Component {

  static propTypes = {
    member: PropTypes.object.isRequired,
    viewMode: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);

    this.messages = defineMessages({
      INTERESTED: { id: 'member.status.interested', defaultMessage: '{name} is interested' },
      YES: { id: 'member.status.yes', defaultMessage: '{name} is going' }
    });
  }

  onClick() {
    Router.pushRoute(`/${this.props.member.member.slug}`);
  }

  render() {
    const { viewMode } = this.props;
    const membership = this.props.member;
    const { member, description } = membership;

    const user = member.user || {};
    const name = ((member.name && member.name.match(/^null/)) ? null : member.name) || member.slug || user.email && user.email.substr(0, user.email.indexOf('@'));

    if (!name) return (<div/>);

    const image = member.image || pickAvatar(name);
    let title = member.name;
    if (member.description) {
      title += ` - ${member.description}`;
    }
    const className = this.props.className;
    const tierName = membership.tier ? singular(membership.tier.name) : membership.role;
    return (
      <div className={`Member ${className} ${member.type} viewMode-${viewMode}`}>
        <style jsx>{`
        .Member {
          width: 100%;
          margin: 1rem;
          max-width: 300px;
          float: left;
          position: relative;
        }

        .Member.small {
          width: 48px;
          margin: 0.5rem 0.25rem;
        }

        .Member.viewMode-ORGANIZATION {
          width: 200px;
          margin: 0.5rem;
        }

        .avatar {
          float: left;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          margin-top: 1rem;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
          border: 2px solid #fff;
          box-shadow: 0 0 0 1px #75cc1f;
        }

        .bubble {
          padding: 1rem;
          overflow: hidden;
        }

        .small .avatar {
          margin: 0;
        }

        .small .bubble {
          display: none;
        }

        .name {
          font-family: 'montserratlight';
          font-size: 1.7rem;
        }

        .description, .since {
          font-family: 'lato';
          font-size: 1.4rem;
        }

        .star {
          width: 14px;
          height: 14px;
          position: absolute;
          top: 45px;
          left: 0;
        }
        `}</style>          
        <div>
          { viewMode === 'USER' &&
            <a onClick={this.onClick} title={title}>
              <div className="avatar" style={{ backgroundImage: `url(${image})`} } />
              <div className="bubble">
                <div className="name">{name}</div>
                <div className="description" style={{color: colors.darkgray}}>{firstSentence(description || member.description, 64)}</div>
                <div className="since" style={{color: colors.darkgray}}>
                  {tierName && capitalize(tierName)} &nbsp;
                  <FormattedMessage id='membership.since' defaultMessage={`since`} />&nbsp;
                  <FormattedDate value={membership.createdAt} month='long' year='numeric' />
                </div>
              </div>
            </a>
          }
          { viewMode === 'ORGANIZATION' &&
            <CollectiveCard collective={member} membership={membership} />
          }
        </div>
      </div>
    )
  }

}

export default injectIntl(Member);